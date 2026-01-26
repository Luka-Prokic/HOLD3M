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

export function useCurrentHandAnimation(
  index: number,
) {
  const isAnimationsEnabled = useSettingsStore.getState().isAnimationsEnabled;
  const handAnimationPosition = useAnimationStore.getState().handAnimationPosition;

  // progress for animation
  const progress = useSharedValue(isAnimationsEnabled ? 0 : 1); // instantly fanned out if animations disabled

  // geometry
  const offset = index - 2;
  const distance = Math.abs(offset);

  const fanX = offset * 54;

  let fanY = 0;
  if (distance === 0) fanY = -36;
  else if (distance === 1) fanY = -24;

  const fanRot = offset * 12;

  // react to pose change
  useEffect(() => {
    if (handAnimationPosition === "hand" && isAnimationsEnabled) {
      // 500ms delay, then animate 0 → 1 in 300ms
      progress.value = withDelay(
        500,
        withTiming(1, { duration: 300, easing: Easing.out(Easing.exp) })
      );
    } else if (handAnimationPosition !== "hand") {
      // reset instantly when going back to "stack"
      progress.value = 0;
    } else {
      // animations disabled → immediately fanned out
      progress.value = 1;
    }
  }, [handAnimationPosition, isAnimationsEnabled]);

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    transform: [
      { translateX: fanX * progress.value },
      { translateY: fanY * progress.value },
      { rotate: `${fanRot * progress.value}deg` },
    ],
  }));

  return style;
}