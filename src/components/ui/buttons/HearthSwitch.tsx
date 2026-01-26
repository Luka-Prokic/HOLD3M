import { Text, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { AceButton } from "./AceButton";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "@/utils/hexToRGBA";
import { getGradientColor } from "./QueenButton";
import { haptic } from "@/utils/useHaptics";

interface BooleanSwitchProps {
  value: boolean;
  onChange?: (val: boolean) => void;
  width?: number;
  height?: number;
  style?: ViewStyle;
}

export function HearthSwitch({
  value,
  onChange,
  width = 128,
  height = 54,
  style,
}: BooleanSwitchProps) {
  const { theme, accentColor, isAnimationsEnabled } = useSettingsStore();

  const gColor = getGradientColor("default", theme.lightSurface);

  const padding = 3;
  const knobWidth = width * 0.5;

  const translateX = useSharedValue(
    value ? width - knobWidth - padding * 2 : 0
  );

  useDerivedValue(() => {
    const target = value ? width - knobWidth - padding * 2 : 0;

    if (isAnimationsEnabled) {
      translateX.value = withSpring(target, {
        mass: 1,
        stiffness: 420,
        damping: 16,
      });
    } else {
      translateX.value = target; // instant change, no animation
    }
  }, [value, isAnimationsEnabled]);

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  function toggle() {
    onChange?.(!value);
  }

  function handlePressIn() {
    haptic("bold");
  }

  return (
    <AceButton
      onPress={toggle}
      onPressIn={handlePressIn}
      height={height}
      width={width}
      themeType="custom"
      buttonColor={theme.darkSurface}
      style={{
        borderRadius: height / 2,
        padding,
        position: "relative",
        ...style,
      }}
      buttonStyle={{ paddingHorizontal: 0 }}
    >

      {/* Labels */}
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        {/* ON (left) */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: theme.lightSurface,
            lineHeight: height,
            textAlign: "center",
            flex: 1,
          }}
        >
          ON
        </Text>

        {/* OFF (right) */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: theme.lightSurface,
            lineHeight: height,
            textAlign: "center",
            flex: 1,
          }}
        >
          OFF
        </Text>
      </View>

      {/* Knob */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: knobWidth,
            height: height - padding * 2,
            top: padding,
            left: padding,
            borderRadius: height / 2,
            backgroundColor: accentColor,
            borderWidth: 0.2,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: theme.lightSurface,
            overflow: "hidden",
          },
          knobStyle,
        ]}
      >
        <LinearGradient
          colors={[
            gColor,
            gColor + "80",
            hexToRGBA(gColor as string, 0.8),
          ]}
          locations={[0, 0.8, 1]}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </AceButton>
  );
}