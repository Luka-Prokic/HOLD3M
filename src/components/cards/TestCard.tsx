import { Pressable } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    cancelAnimation,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useRef } from "react";
import { scheduleOnRN } from "react-native-worklets";
import { useSettingsStore } from "@/stores/settings/settingsStore";

interface ShakyLongPressProps {
    children: React.ReactNode;
    onRelease: () => void;       // called once on successful long press
    onPress?: () => void;         // called on quick tap
    holdThreshold?: number;       // min time to start shake
    successThreshold?: number;    // time after which long press is auto-success
    disableHold?: boolean;
}

export function ShakyLongPress({
    children,
    onRelease,
    onPress,
    holdThreshold = 500,
    successThreshold = 1000,
    disableHold = false,
}: ShakyLongPressProps) {
    const { isAnimationsEnabled } = useSettingsStore();

    const shake = useSharedValue(0);
    const isHolding = useRef(false);
    const state = useRef<'idle' | 'holding' | 'success'>('idle');
    const pressStartTime = useRef(0);

    const shakeTimeout = useRef<number | null>(null);
    const successTimeout = useRef<number | null>(null);

    const startHapticLoop = () => {
        if (!isHolding.current) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).then(() => {
            setTimeout(() => scheduleOnRN(startHapticLoop), 50);
        });
    };

    const startShake = () => {
        isHolding.current = true;
        scheduleOnRN(startHapticLoop);
        state.current = 'holding';
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
        state.current = 'idle';

        // Schedule shake
        shakeTimeout.current = setTimeout(() => {
            // Only start shake if still holding
            if (state.current === 'idle') {
                startShake();

                const elapsed = Date.now() - pressStartTime.current;
                const remaining = successThreshold - elapsed;

                // Schedule success if still holding
                successTimeout.current = setTimeout(() => {
                    if (state.current === 'holding') {
                        state.current = 'success';
                        stopShake();
                        onRelease();
                    }
                }, remaining);
            }
        }, holdThreshold);
    };

    const handlePressOut = () => {
        // Cancel any pending timers
        if (shakeTimeout.current) {
            clearTimeout(shakeTimeout.current);
            shakeTimeout.current = null;
        }
        if (successTimeout.current) {
            clearTimeout(successTimeout.current);
            successTimeout.current = null;
        }

        if (state.current === 'success') {
            // Already triggered success → do nothing
            return;
        }

        if (state.current === 'holding') {
            // Early release → error
            stopShake();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setTimeout(() => smallErrorShake(), 200);
        } else {
            // Released before shake → normal tap
            onPress?.();
        }
    };

    if (disableHold) {
        return (
            <Pressable onPress={onPress}>
                <Animated.View style={animatedStyle}>{children}</Animated.View>
            </Pressable>
        );
    }

    return (
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View style={animatedStyle}>{children}</Animated.View>
        </Pressable>
    );
}