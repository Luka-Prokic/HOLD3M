import { useEffect, useMemo, useRef } from "react";
import { FlatList } from "react-native";
import {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedReaction,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { haptic } from "@/utils/useHaptics";
import { useSettingsStore } from "@/stores/settings/settingsStore";

export interface UseCenterCardSliderParams<T> {
  data: ReadonlyArray<T> | ArrayLike<T> | null | undefined;
  firstCard?: React.ReactElement;
  lastCard?: React.ReactElement;
  cardWidth: number;
  sliderWidth: number;
  selectedIndex: number;
  onSelect?: (index: number) => void;
  delayedSelect?: boolean;
  selectDelay?: number;
}

export function useCenterCardSlider<T>({
  data,
  firstCard,
  lastCard,
  cardWidth,
  sliderWidth,
  selectedIndex,
  onSelect,
  delayedSelect = false,
  selectDelay = 100,
}: UseCenterCardSliderParams<T>) {
  const { isAnimationsEnabled } = useSettingsStore();
  const listRef = useRef<FlatList>(null);
  const scrollStoppedTimeout = useRef<number | null>(null);
  const dragEndTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isUserDragging = useRef(false);

  const scrollX = useSharedValue(0);
  const currentIndex = useSharedValue(selectedIndex);
  const isReady = useSharedValue(false);
  const isProgrammaticScroll = useSharedValue(false);

  const fullData = useMemo<Array<"first" | "last" | T | string>>(() => {
    return [
      ...(firstCard ? ["first"] : []),
      ...(data ? Array.from(data) : []),
      ...(lastCard ? ["last"] : []),
    ];
  }, [data, firstCard, lastCard]);

  const horizontalPadding = (sliderWidth - cardWidth) / 2;
  const visualIndex = firstCard ? 0 : selectedIndex < 0 ? 0 : selectedIndex;

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;

      if (!delayedSelect || !onSelect) return;

      if (scrollStoppedTimeout.current) clearTimeout(scrollStoppedTimeout.current);

      scrollStoppedTimeout.current = setTimeout(() => {
        const newIndex = Math.round(scrollX.value / cardWidth);
        scheduleOnRN(onSelect, firstCard ? newIndex - 1 : newIndex);
      }, selectDelay);
    },
  });

  useAnimatedReaction(
    () => Math.round(scrollX.value / cardWidth),
    (next, prev) => {
      if (!isReady.value || next === prev) return;
      currentIndex.value = next;

      if (isProgrammaticScroll.value) return;

      if (!onSelect) return;

      scheduleOnRN(haptic, "sharp");
      if (!delayedSelect) {
        scheduleOnRN(onSelect, firstCard ? next - 1 : next);
      }
    }
  );

  useEffect(() => {
    currentIndex.value = visualIndex;
    listRef.current?.scrollToIndex({
      index: visualIndex,
      animated: false,
    });
    requestAnimationFrame(() => {
      isReady.value = true;
    });
  }, []);

  useEffect(() => {
    if (!isReady.value) return;
    if (currentIndex.value === visualIndex) return;
    if (isUserDragging.current) return;

    currentIndex.value = visualIndex;
    isProgrammaticScroll.value = true;
    listRef.current?.scrollToIndex({
      index: visualIndex,
      animated: isAnimationsEnabled,
    });
    if (!isAnimationsEnabled) {
      setTimeout(() => {
        isProgrammaticScroll.value = false;
      }, 50);
    }
  }, [visualIndex, isAnimationsEnabled]);

  const onScrollBeginDrag = () => {
    if (dragEndTimeout.current) clearTimeout(dragEndTimeout.current);
    dragEndTimeout.current = null;
    isUserDragging.current = true;
  };

  const onScrollEndDrag = () => {
    if (dragEndTimeout.current) clearTimeout(dragEndTimeout.current);
    dragEndTimeout.current = setTimeout(() => {
      isUserDragging.current = false;
      dragEndTimeout.current = null;
    }, 600);
  };

  const onMomentumScrollEnd = () => {
    if (dragEndTimeout.current) clearTimeout(dragEndTimeout.current);
    dragEndTimeout.current = null;
    isUserDragging.current = false;
    isProgrammaticScroll.value = false;
  };

  useEffect(() => {
    return () => {
      if (scrollStoppedTimeout.current) clearTimeout(scrollStoppedTimeout.current);
      if (dragEndTimeout.current) clearTimeout(dragEndTimeout.current);
    };
  }, []);

  const defaultKeyExtractor = (item: unknown, index: number) =>
    (item as { id?: string })?.id ? `${(item as { id: string }).id}-${index}` : `${index}`;

  const getItemLayout = (_: unknown, index: number) => ({
    length: cardWidth,
    offset: cardWidth * index,
    index,
  });

  return {
    listRef,
    scrollX,
    fullData,
    horizontalPadding,
    visualIndex,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onMomentumScrollEnd,
    defaultKeyExtractor,
    getItemLayout,
  };
}
