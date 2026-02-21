import {
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useGameStore } from "@/stores/game/gameStore";
import { useAnimationStore } from "@/stores/animation/animationStore";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { WIDTH } from "@/utils/Dimensions";

interface Props {
  height?: number
}

export function useCurrentShadowAnimation({ height = WIDTH / 3 * 1.4 }: Props) {
  const { currentHand, heldCards } = useGameStore();
  const { handAnimationPosition } = useAnimationStore();
  const { isAnimationsEnabled } = useSettingsStore();

  const cardSpacing = 34;
  const baseWidth = 60;

  const span = useDerivedValue(() => {
    if (!currentHand.length) return 0;

    let first = -1;
    let last = -1;

    currentHand.forEach((card, i) => {
      const isHeld = heldCards.some(c => c.id === card.id);
      const isJester = card.repetition === -1;
      const notBurnable = isHeld || isJester;

      const visible =
        handAnimationPosition === "card"
          ? 0
          : handAnimationPosition === "burn"
            ? notBurnable ? 0 : 1
            : 1;

      if (visible) {
        if (first === -1) first = i;
        last = i;
      }
    });

    if (first === -1) return 0;

    return last - first + 1;
  });

  const centerIndex = useDerivedValue(() => {
    let total = 0;
    let weighted = 0;

    currentHand.forEach((card, i) => {
      const isHeld = heldCards.some(c => c.id === card.id);
      const isJester = card.repetition === -1;
      const notBurnable = isHeld || isJester;

      const visible =
        handAnimationPosition === "card"
          ? 0
          : handAnimationPosition === "burn"
            ? notBurnable ? 1 : 0
            : 1;

      if (visible) {
        total += 1;
        weighted += i;
      }
    });

    if (total === 0) return 0;

    return weighted / total;
  });

  const animatedStyle = useAnimatedStyle(() => {
    if (span.value === 0) {
      return { opacity: 0 };
    }

    const width = baseWidth + span.value * cardSpacing * 1.4;
    const center = (currentHand.length - 1) / 2;
    const translateX = (centerIndex.value - center) * cardSpacing;

    return {
      opacity: withTiming(0.35, {
        duration: isAnimationsEnabled ? 300 : 0,
        easing: Easing.out(Easing.exp),
      }),
      width: withTiming(width, {
        duration: isAnimationsEnabled ? 300 : 0,
      }),
      transform: [
        { translateX },
        { translateY: height },
      ],
    };
  });

  return animatedStyle;
}