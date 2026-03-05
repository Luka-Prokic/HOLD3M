import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { useShakyLongPress } from "./ShakyLongPress.logic";

interface ShakyLongPressProps {
    children: React.ReactNode;
    onRelease: () => void;        // called on successful long press
    onHoldFail?: () => void;      // NEW — called when hold fails
    onPress?: () => void;         // called on quick tap
    holdThreshold?: number;
    successThreshold?: number;
    disableHold?: boolean;
}

export function ShakyLongPress({
    children,
    onRelease,
    onHoldFail,
    onPress,
    holdThreshold = 500,
    successThreshold = 1000,
    disableHold = false,
}: ShakyLongPressProps) {
    const { animatedStyle, handlePressIn, handlePressOut } =
        useShakyLongPress({
            onRelease,
            onHoldFail,
            onPress,
            holdThreshold,
            successThreshold,
        });

    if (disableHold) {
        return (
            <Pressable onPress={onPress}>
                <Animated.View style={animatedStyle}>
                    {children}
                </Animated.View>
            </Pressable>
        );
    }

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={animatedStyle}>
                {children}
            </Animated.View>
        </Pressable>
    );
}

