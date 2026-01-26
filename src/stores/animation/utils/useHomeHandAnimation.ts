import { useSharedValue, useAnimatedStyle, withTiming, Easing, withDelay } from "react-native-reanimated";
import { useEffect } from "react";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { useAnimationStore } from "../animationStore";

export function useHomeHandAnimation(index: number) {
    const handAnimationPosition = useAnimationStore(state => state.handAnimationPosition);
    const isAnimationsEnabled = useSettingsStore(state => state.isAnimationsEnabled);

    // fan progress
    const fanProgress = useSharedValue(isAnimationsEnabled ? handAnimationPosition === "home" ? 1 : 0 : 1);
    // entering/exiting progress (for fade + vertical offset)
    const enterExitProgress = useSharedValue(isAnimationsEnabled ? handAnimationPosition === "home" ? 1 : 0 : 1);

    // geometry
    const offset = index - 2;
    const distance = Math.abs(offset);
    const fanX = offset * 44;
    let fanY = 0;
    if (distance === 0) fanY = -34;
    else if (distance === 1) fanY = -24;
    const fanRot = offset * 12;

    // react to home position change
    useEffect(() => {
        if (!isAnimationsEnabled) {
            fanProgress.value = 1;
            enterExitProgress.value = 1;
            return;
        }

        if (handAnimationPosition === "home") {
            // fan out
            fanProgress.value = withDelay(
                200, // delay before starting
                withTiming(1, { duration: 500, easing: Easing.out(Easing.exp) })
            );
            enterExitProgress.value = withDelay(
                200, // same delay as original
                withTiming(1, { duration: 500, easing: Easing.out(Easing.exp) })
            );
        } else {
            // fan in quickly
            fanProgress.value = withTiming(0, { duration: 200, easing: Easing.in(Easing.exp) });
            // exiting: fade in + move down
            enterExitProgress.value = withTiming(0, { duration: 200, easing: Easing.in(Easing.exp) });
        }
    }, [handAnimationPosition, isAnimationsEnabled]);

    const style = useAnimatedStyle(() => {
        const translateX = fanX * fanProgress.value;
        const translateY = fanY * fanProgress.value + 50 * (1 - enterExitProgress.value); // move down when exiting
        const rotate = fanRot * fanProgress.value;
        const opacity = handAnimationPosition === "home" ? 1 : enterExitProgress.value; // fade out

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