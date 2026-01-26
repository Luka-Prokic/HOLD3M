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

export function useCurrentHandAnimation(index: number) {
  const handAnimationPosition = useAnimationStore(state => state.handAnimationPosition);
  const isAnimationsEnabled = useSettingsStore(state => state.isAnimationsEnabled);

  // main fan progress
  const progress = useSharedValue(isAnimationsEnabled ? 0 : 1);
  // enter/exit progress for moving/fading while exiting
  const exitProgress = useSharedValue(isAnimationsEnabled ? 0 : 1);

  // geometry
  const offset = index - 2;
  const distance = Math.abs(offset);
  const fanX = offset * 54;
  let fanY = 0;
  if (distance === 0) fanY = -36;
  else if (distance === 1) fanY = -24;
  const fanRot = offset * 12;

  useEffect(() => {
    if (!isAnimationsEnabled) {
      progress.value = 1;
      exitProgress.value = 1;
      return;
    }

    const staggerDelay = index * 20;


    if (handAnimationPosition === "hand") {

      // fan in quickly
      progress.value = withDelay(
        400 + staggerDelay,
        withTiming(1, { duration: 200, easing: Easing.out(Easing.exp) })
      );
      // entering: fade in + move up (with delay like original)
      exitProgress.value = withDelay(
        400 + staggerDelay,
        withTiming(1, { duration: 200, easing: Easing.out(Easing.exp) })
      );


      setTimeout(() => {
        hapticMax("sharp");
      }, 400 + staggerDelay);

    } else {
      // fan out in reverse: animate 1 -> 0 while moving down / fading
      progress.value = withTiming(0, { duration: 300, easing: Easing.in(Easing.exp) });
      exitProgress.value = withTiming(0, { duration: 300, easing: Easing.in(Easing.exp) });


      setTimeout(() => {
        haptic("bold");
      }, staggerDelay);
    }
  }, [handAnimationPosition, isAnimationsEnabled]);

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    transform: [
      { translateX: fanX * progress.value },
      { translateY: fanY * progress.value * exitProgress.value }, // combine fan and exit move
      { rotate: `${fanRot * progress.value}deg` },
    ],
  }));

  return style;
}