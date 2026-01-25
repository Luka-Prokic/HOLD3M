import { useEffect, useMemo, useRef, ReactElement, ReactNode } from "react";
import {
  FlatList,
  FlatListProps,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedReaction,
  BounceIn,
} from "react-native-reanimated";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { WIDTH } from "../../../utils/Dimensions";
import { ScrollableDots } from "@/components/ui/sliders/ScrollableDots";
import { SlideCard } from "@/components/ui/sliders/SlideCard";
import { scheduleOnRN } from "react-native-worklets";
import { hapticMax } from "@/utils/useHaptics";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type AnimationType = "card" | "wheel" | "album" | "flat" | "none";

interface CenterCardSliderProps<T>
  extends Omit<FlatListProps<T>, "renderItem" | "onScroll"> {
  card: ({ item, index }: { item: T; index: number }) => ReactNode;
  cardWidth?: number;
  cardHeight?: number;
  sliderWidth?: number;
  sliderHeight?: number;
  hideDots?: boolean;
  styleSlider?: ViewStyle | ViewStyle[];
  styleDots?: ViewStyle | ViewStyle[];
  distanceBubbleStyle?: TextStyle | TextStyle[];
  emptyCard?: ReactElement;
  firstCard?: ReactElement;
  lastCard?: ReactElement;
  firstDot?: ReactNode;
  lastDot?: ReactNode;
  maxDotsShown?: number;
  showDotsTop?: boolean;
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  showDistanceBubble?: boolean;
  distanceTolerance?: number;
  animationType?: AnimationType;
  disableScroll?: boolean;
  delayedSelect?: boolean;
  selectDelay?: number;
}

export function CenterCardSlider<T>({
  data,
  card,
  keyExtractor,
  cardWidth = 100,
  cardHeight = 100,
  sliderWidth = WIDTH - 32,
  hideDots = false,
  sliderHeight,
  styleSlider,
  styleDots,
  distanceBubbleStyle,
  emptyCard,
  firstCard,
  lastCard,
  firstDot,
  lastDot,
  maxDotsShown = 5,
  showDotsTop = false,
  selectedIndex = 0,
  onSelect,
  showDistanceBubble = false,
  distanceTolerance = 0,
  animationType = "card",
  disableScroll = false,
  delayedSelect = false,
  selectDelay = 100,
  ...flatListProps
}: CenterCardSliderProps<T>) {
  const { theme } = useSettingsStore();
  const listRef = useRef<FlatList>(null);
  const scrollStoppedTimeout = useRef<number | null>(null);

  const scrollX = useSharedValue(0);
  const currentIndex = useSharedValue(selectedIndex);
  const isReady = useSharedValue(false);

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

      if (!onSelect) return;

      scheduleOnRN(hapticMax, "sharp");
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

    currentIndex.value = visualIndex;
    listRef.current?.scrollToIndex({
      index: visualIndex,
      animated: true,
    });
  }, [visualIndex]);

  useEffect(() => {
    return () => {
      if (scrollStoppedTimeout.current) clearTimeout(scrollStoppedTimeout.current);
    };
  }, []);

  const defaultKeyExtractor = (item: any, index: number) =>
    item?.id ? `${item.id}-${index}` : `${index}`;

  return (
    <View style={{ position: "relative" }}>
      {showDotsTop && fullData.length > 1 && (
        <ScrollableDots
          dataLength={data?.length ?? 0}
          currentIndex={selectedIndex}
          style={{ width: sliderWidth, ...(styleDots as any) }}
          firstDot={firstDot}
          lastDot={lastDot}
          maxDotsShown={maxDotsShown}
        />
      )}

      <AnimatedFlatList
        ref={listRef}
        {...(flatListProps as any)}
        data={fullData as T[]}
        horizontal
        scrollEnabled={!disableScroll}
        snapToInterval={cardWidth}
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        keyExtractor={(keyExtractor || defaultKeyExtractor) as any}
        getItemLayout={(_, index) => ({
          length: cardWidth,
          offset: cardWidth * index,
          index,
        })}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
        }}
        style={{
          width: sliderWidth,
          height: sliderHeight || cardHeight,
          flexGrow: 0,
          ...(styleSlider as any),
        }}
        renderItem={({ item, index }) => {
          if (item === "first" && firstCard) {
            return (
              <SlideCard
                scrollX={scrollX}
                index={index}
                content={firstCard}
                width={cardWidth}
                height={cardHeight}
                animationType={animationType}
              />
            );
          }

          if (item === "last" && lastCard) {
            return (
              <SlideCard
                scrollX={scrollX}
                index={index}
                content={lastCard}
                width={cardWidth}
                height={cardHeight}
                animationType={animationType}
              />
            );
          }

          const logicalIndex = firstCard ? index - 1 : index;

          return (
            <SlideCard
              scrollX={scrollX}
              index={index}
              content={card({
                item: item as T,
                index: logicalIndex,
              })}
              width={cardWidth}
              height={cardHeight}
              animationType={animationType}
            />
          );
        }}
        ListEmptyComponent={emptyCard}
      />

      {!hideDots && !showDotsTop && fullData.length > 1 && (
        <ScrollableDots
          dataLength={data?.length ?? 0}
          currentIndex={selectedIndex}
          style={{ width: sliderWidth, ...(styleDots as any) }}
          firstDot={firstDot}
          lastDot={lastDot}
          maxDotsShown={maxDotsShown}
        />
      )}

      {showDistanceBubble && (
        <DistanceBubble
          currentIndex={selectedIndex}
          selectedIndex={selectedIndex}
          theme={theme}
          style={distanceBubbleStyle}
          tolerance={distanceTolerance}
        />
      )}
    </View>
  );
}

function DistanceBubble({
  currentIndex,
  selectedIndex,
  theme,
  style,
  tolerance = 0,
}: {
  currentIndex: number;
  selectedIndex: number;
  theme: any;
  style?: TextStyle | TextStyle[];
  tolerance?: number;
}) {
  const distance = Math.abs(currentIndex - selectedIndex);
  if (distance <= tolerance) return null;

  return (
    <Animated.Text
      entering={BounceIn}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: theme.text,
        color: theme.background,
        textAlign: "center",
        lineHeight: 22,
        fontSize: 13,
        fontWeight: "600",
        ...(style as any),
      }}
    >
      {distance}
    </Animated.Text>
  );
}