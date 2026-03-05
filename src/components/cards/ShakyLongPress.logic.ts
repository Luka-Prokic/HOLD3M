import { useEffect, useRef } from "react";
import * as Haptics from "expo-haptics";
import {
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { useSettingsStore } from "@/stores/settings/settingsStore";

interface UseShakyLongPressParams {
    onRelease: () => void;
    onHoldFail?: () => void;
    onPress?: () => void;
    holdThreshold?: number;
    successThreshold?: number;
}

export function useShakyLongPress({
    onRelease,
    onHoldFail,
    onPress,
    holdThreshold = 500,
    successThreshold = 1000,
}: UseShakyLongPressParams) {
    const { isAnimationsEnabled } = useSettingsStore();

    const shake = useSharedValue(0);
    const isHolding = useRef(false);
    const state = useRef<"idle" | "holding" | "success">("idle");
    const pressStartTime = useRef(0);

    const shakeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const successTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimers = () => {
        if (shakeTimeout.current) {
            clearTimeout(shakeTimeout.current);
            shakeTimeout.current = null;
        }
        if (successTimeout.current) {
            clearTimeout(successTimeout.current);
            successTimeout.current = null;
        }
    };

    const startHapticLoop = () => {
        if (!isHolding.current) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).then(() => {
            setTimeout(() => scheduleOnRN(startHapticLoop), 50);
        });
    };

    const startShake = () => {
        isHolding.current = true;
        scheduleOnRN(startHapticLoop);
        state.current = "holding";
        if (!isAnimationsEnabled) return;
        shake.value = withRepeat(withTiming(4, { duration: 50 }), -1, true);
    };

    const stopShake = () => {
        cancelAnimation(shake);
        shake.value = withTiming(0, { duration: 80 });
        isHolding.current = false;
    };

    const smallErrorShake = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        if (!isAnimationsEnabled) return;
        shake.value = withRepeat(withTiming(6, { duration: 25 }), 8, true);
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: shake.value }],
    }));

    const handlePressIn = () => {
        pressStartTime.current = Date.now();
        state.current = "idle";

        shakeTimeout.current = setTimeout(() => {
            if (state.current === "idle") {
                startShake();

                const elapsed = Date.now() - pressStartTime.current;
                const remaining = successThreshold - elapsed;

                successTimeout.current = setTimeout(() => {
                    if (state.current === "holding") {
                        state.current = "success";
                        stopShake();
                        onRelease();
                    }
                }, remaining);
            }
        }, holdThreshold);
    };

    const handlePressOut = () => {
        clearTimers();

        if (state.current === "success") {
            return;
        }

        if (state.current === "holding") {
            stopShake();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setTimeout(() => smallErrorShake(), 200);
            onHoldFail?.();
        } else {
            onPress?.();
        }
    };

    useEffect(() => {
        return () => {
            clearTimers();
            stopShake();
        };
    }, []);

    return {
        animatedStyle,
        handlePressIn,
        handlePressOut,
    };
}