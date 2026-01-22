import { ViewStyle, Pressable, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";

interface SegmentedButtonProps<T extends string> {
  options: T[];
  value: T;
  onChange: (val: T) => void;
  width?: number;
  height?: number;
  style?: ViewStyle;
}

export function SegmentedButton<T extends string>({
  options,
  value,
  onChange,
  width = 300,
  height = 48,
  style,
}: SegmentedButtonProps<T>) {
  const { theme } = useThemeStore();

  const buttonWidth = width / options.length;
  const knobWidth = buttonWidth - 4;
  const selectedIndex = options.indexOf(value);
  const offset =
    selectedIndex === 0
      ? 2
      : selectedIndex === options.length - 1
        ? width - buttonWidth + 2
        : selectedIndex * buttonWidth + 2;
  const knobX = useSharedValue(offset);

  // Animate knob whenever value changes
  useEffect(() => {
    knobX.value = withSpring(offset, {
      mass: 1,
      stiffness: 360,
      damping: 16,
    });
  }, [value]);

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: knobX.value }],
  }));

  function handlePress(option: T) {
    if (value === option) return;
    onChange(option);
  }
  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: height / 2,
          backgroundColor: theme.background + "40",
          flexDirection: "row",
          overflow: "hidden",
          ...style,
        },
      ]}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            height: height - 4,
            width: knobWidth,
            borderRadius: height / 2,
            top: 2,
            left: 0,
            backgroundColor: theme.background,
          },
          knobStyle,
        ]}
      />
      {options.map((option) => (
        <Pressable
          key={option}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 4,
          }}
          onPress={() => {
            handlePress(option);
          }}
          disabled={value === option}
        >
          <Text
            style={{
              color: value === option ? theme.text : theme.text + "60",
              fontWeight: "bold",
            }}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {option.toUpperCase()}
          </Text>
        </Pressable>
      ))}
    </Animated.View>
  );
}
