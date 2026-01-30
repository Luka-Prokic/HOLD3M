import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { useAnimationStore } from "../animationStore";
import { haptic, hapticMax } from "@/utils/useHaptics";
import { useGameStore } from "@/stores/game/gameStore";

export function useCurrentHandAnimation(index: number) {
  const handAnimationPosition = useAnimationStore(state => state.handAnimationPosition);
  const isAnimationsEnabled = useSettingsStore(state => state.isAnimationsEnabled);
  const currentHand = useGameStore(state => state.currentHand);
  const heldCards = useGameStore(state => state.heldCards);

  const progress = useSharedValue(isAnimationsEnabled ? 0 : 1);

  const burnProgress = useSharedValue(0);

  const offset = index - 2;
  const distance = Math.abs(offset);
  const fanX = offset * 54;
  let fanY = 0;
  if (distance === 0) fanY = -36;
  else if (distance === 1) fanY = -24;
  const fanRot = offset * 12;


  useEffect(() => {
    const isHeld = heldCards.some(card => card.id === currentHand[index].id);
    const isJester = currentHand[index].repetition === -1;

    const notBurnable = isJester || isHeld;

    if (!isAnimationsEnabled) {
      progress.value = 1;
      burnProgress.value = handAnimationPosition === "burn" ? notBurnable ? 1 : 0 : 0;
      return;
    }

    const staggerDelay = index * 20;

    switch (handAnimationPosition) {
      case "hand": // FOCUSED ON HAND
        if (progress.value === 0 || burnProgress.value === 1) {
          progress.value = withDelay(
            400 + staggerDelay,
            withTiming(1, { duration: 200, easing: Easing.out(Easing.exp) })
          );
          burnProgress.value = withDelay(
            400 + staggerDelay,
            withTiming(0, { duration: 400 + staggerDelay, easing: Easing.out(Easing.exp) })
          );

          setTimeout(() => {
            hapticMax("sharp");
          }, 400 + staggerDelay);
        }
        break;

      case "burn": // READY TO BURN
        if (notBurnable) {

          burnProgress.value = withDelay(
            200 + staggerDelay,
            withTiming(1, { duration: 400 + staggerDelay, easing: Easing.out(Easing.exp) })
          );

        }
        else if (burnProgress.value === 1) {
          burnProgress.value = withDelay(
            200 + staggerDelay,
            withTiming(0, { duration: 400 + staggerDelay, easing: Easing.out(Easing.exp) })
          );

          setTimeout(() => {
            haptic("bold");
          }, 200 + staggerDelay);
        }
        break;

      case "card": // FOCUSED ON CARD
        if (progress.value === 1) {
          progress.value = withTiming(0, { duration: 300, easing: Easing.in(Easing.exp) });
          burnProgress.value = withTiming(0, { duration: 300, easing: Easing.in(Easing.exp) });


          setTimeout(() => {
            haptic("bold");
          }, staggerDelay);
        }
        break;
    }
  }, [handAnimationPosition, isAnimationsEnabled, heldCards, currentHand, index]);

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    opacity: 1 - burnProgress.value * 0.4,
    transform: [
      { translateX: fanX * progress.value },
      { translateY: fanY * progress.value - (1 - burnProgress.value * 54) },
      { rotate: `${fanRot * progress.value}deg` },
    ],
  }));

  return style;
}