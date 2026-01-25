import { haptic, HapticType } from "@/utils/useHaptics";
import { GestureResponderEvent, Pressable, PressableProps, ViewStyle } from "react-native";


interface HapticButtonProps extends PressableProps {

    hapticType?: HapticType;
}

export function HapticButton({
    hapticType = "sharp",
    ...pressableProps
}: HapticButtonProps) {

    function handlePressIn(e: GestureResponderEvent) {
        pressableProps.onPressIn?.(e);
        haptic(hapticType);
    }

    return (
        <Pressable
            {...pressableProps}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={[{
                opacity: pressableProps.disabled ? 0.4 : 1,
            }, pressableProps.style as ViewStyle]}
            onPressIn={handlePressIn}
        />
    );
}