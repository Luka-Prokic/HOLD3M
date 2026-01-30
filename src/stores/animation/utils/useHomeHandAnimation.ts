import { useSharedValue, useAnimatedStyle, withTiming, Easing, withDelay } from "react-native-reanimated";
import { useEffect } from "react";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { useAnimationStore } from "../animationStore";
import { haptic } from "@/utils/useHaptics";

export function useHomeHandAnimation(index: number) {
    const handAnimationPosition = useAnimationStore(state => state.handAnimationPosition);
    const isAnimationsEnabled = useSettingsStore(state => state.isAnimationsEnabled);

    const fanProgress = useSharedValue(isAnimationsEnabled ? handAnimationPosition === "home" ? 1 : 0 : 1);
    const enterExitProgress = useSharedValue(isAnimationsEnabled ? handAnimationPosition === "home" ? 1 : 0 : 1);

    const offset = index - 2;
    const distance = Math.abs(offset);
    const fanX = offset * 44;
    let fanY = 0;
    if (distance === 0) fanY = -34;
    else if (distance === 1) fanY = -24;
    const fanRot = offset * 12;



    useEffect(() => {
        if (!isAnimationsEnabled) {
            fanProgress.value = 1;
            enterExitProgress.value = 1;
            return;
        }

        if (handAnimationPosition === "home") {

            fanProgress.value = withDelay(
                200,
                withTiming(1, { duration: 500, easing: Easing.out(Easing.exp) })
            );
            enterExitProgress.value = withDelay(
                200,
                withTiming(1, { duration: 500, easing: Easing.out(Easing.exp) })
            );
            setTimeout(() => {
                haptic("sharp");
            }, 500);
        }
        if (handAnimationPosition === "hand" && (fanProgress.value === 1 && enterExitProgress.value === 1)) {
            fanProgress.value = withTiming(0, { duration: 200, easing: Easing.in(Easing.exp) });

            enterExitProgress.value = withTiming(0, { duration: 200, easing: Easing.in(Easing.exp) });

            setTimeout(() => {
                haptic("bold");
            }, 200);
        }
    }, [handAnimationPosition, isAnimationsEnabled]);

    const style = useAnimatedStyle(() => {
        const translateX = fanX * fanProgress.value;
        const translateY = fanY * fanProgress.value + 50 * (1 - enterExitProgress.value);
        const rotate = fanRot * fanProgress.value;
        const opacity = handAnimationPosition === "home" ? 1 : enterExitProgress.value;

        return {
            position: "absolute",
            transform: [
                { translateX },
                { translateY },
                { rotate: `${rotate}deg` },
            ],
            opacity,
        };
    });

    return style;
}