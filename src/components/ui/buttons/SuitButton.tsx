import { ViewStyle, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { hexToRGBA } from "@/utils/hexToRGBA";
import { getGradientColor } from "./QueenButton";
import { LinearGradient } from "expo-linear-gradient";
import { haptic } from "@/utils/useHaptics";

interface SuitButtonProps<T extends string> {
  options: T[];
  value: T;
  onChange: (val: T) => void;
  width?: number;
  height?: number;
  style?: ViewStyle;
}

export function SuitButton<T extends string>({
  options,
  value,
  onChange,
  width = 300,
  height = 54,
  style,
}: SuitButtonProps<T>) {
  const { theme, accentColor } = useSettingsStore();

  const gColor = getGradientColor("default", theme.lightSurface);

  const padding = 3;

  const buttonWidth = width / options.length;
  const knobWidth = buttonWidth - padding * 2;
  const selectedIndex = options.indexOf(value);
  const offset =
    selectedIndex === 0
      ? 0
      : selectedIndex === options.length - 1
        ? width - buttonWidth
        : selectedIndex * buttonWidth;
  const knobX = useSharedValue(offset);

  // Animate knob whenever value changes
  useEffect(() => {
    knobX.value = withSpring(offset, {
      mass: 1,
      stiffness: 420,
      damping: 24,
    });
  }, [value]);

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: knobX.value }],
  }));

  function handlePress(option: T) {
    if (value === option) return;
    onChange(option);
  }

  function handlePressIn() {
    haptic("bold");
  }

  return (
    <View style={{ width, gap: 4 }}>
      <Animated.View
        style={[
          {
            width,
            height,
            borderRadius: height / 2,
            backgroundColor: theme.darkSurface,
            flexDirection: "row",
            ...style,
          },
        ]}
      >
        {options.map((option) => (
          <Pressable
            key={option}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              handlePress(option);
            }}
            onPressIn={handlePressIn}
            disabled={value === option}

          >
            <View style={{ height: 30, width: 4, backgroundColor: theme.lightSurface, borderRadius: 2 }} />
          </Pressable>
        ))}

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
        ><LinearGradient
            colors={[gColor, gColor + "80", hexToRGBA(gColor as string, 0.8)]}
            locations={[0, 0.8, 1]}
            style={{
              minHeight: height,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }} />
        </Animated.View>
      </Animated.View>
      <View style={{ flexDirection: "row", width }}>
        {options.map((option) => (
          <Text key={option} style={{ fontSize: 18, fontWeight: "800", color: theme.text, flex: 1, textAlign: "center" }}>{option}</Text>
        ))}
      </View>
    </View>
  );
}
