import { forwardRef, useImperativeHandle } from "react";
import { Text } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withSequence,
} from "react-native-reanimated";

interface CardTagProps {
    tag?: string;
    color: string;
    delayMs?: number;
    fadeInMs?: number;
    visibleForMs?: number;
    children?: React.ReactNode;
}

export interface CardTagRef {
    trigger: () => void;
}

export const CardTag = forwardRef<CardTagRef, CardTagProps>(
    ({ tag, color, delayMs = 0, fadeInMs = 180, visibleForMs = 120, children }, ref) => {
        const opacity = useSharedValue(0);
        const translateY = useSharedValue(8);
        const scale = useSharedValue(0.96);

        const animatedStyle = useAnimatedStyle(() => ({
            opacity: opacity.value,
            transform: [
                { translateY: translateY.value },
                { scale: scale.value },
            ],
        }));

        const trigger = () => {
            opacity.value = 0;
            translateY.value = 8;
            scale.value = 0.96;

            opacity.value = withDelay(
                fadeInMs,
                withSequence(
                    withTiming(1, { duration: 180 }),
                    withDelay(visibleForMs, withTiming(0, { duration: 120 }))
                )
            );

            translateY.value = withDelay(
                fadeInMs,
                withTiming(0, { duration: 180 })
            );

            scale.value = withDelay(
                fadeInMs,
                withTiming(1, { duration: 180 })
            );
        };

        useImperativeHandle(ref, () => ({ trigger }));

        return (
            <Animated.View
                pointerEvents="none"
                style={[
                    {
                        position: "absolute",
                        alignSelf: "center",
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 999,
                        backgroundColor: color,
                        zIndex: 999,
                    },
                    animatedStyle,
                ]}
            >
                {children ?? (
                    <Text
                        style={{
                            color: "white",
                            fontWeight: "600",
                            fontSize: 14,
                        }}
                    >
                        {tag}
                    </Text>
                )}
            </Animated.View>
        );
    }
);