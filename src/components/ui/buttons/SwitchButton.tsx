import { Text, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { AceButton } from "./AceButton";
import { useThemeStore } from "@/stores/themeStore";
import { hexToRGBA } from "@/utils/hexToRGBA";
import { LinearGradient } from "expo-linear-gradient";

interface SwitchButtonProps {
  option1: string;
  option2?: string;
  value: string;
  onChange?: (val: string) => void;
  width?: number;
  height?: number;
  style?: ViewStyle;
  disabled?: boolean;
}

export function SwitchButton({
  option1,
  option2,
  value,
  onChange,
  width = 192,
  height = 48,
  style,
  disabled = false,
}: SwitchButtonProps) {
  const { theme, accentColor } = useThemeStore();

  const singleMode = !option2 || disabled;

  // ───────────────── SINGLE OPTION MODE ─────────────────
  if (singleMode) {
    return (
      <View
        style={{
          width,
          height,
          borderRadius: height / 2,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.darkSurface,
          ...style,
        }}
      >
        <Text
          style={{
            color: theme.lightSurface,
            fontWeight: "600",
            fontSize: 24,
          }}
        >
          {option1}
        </Text>
      </View>
    );
  }

  // ───────────────── TWO OPTION MODE ─────────────────
  const knobWidth = width * 0.5;
  const padding = 3;

  const translateX = useSharedValue(
    value === option1 ? 0 : width - knobWidth - padding * 2
  );

  useDerivedValue(() => {
    translateX.value = withSpring(
      value === option1
        ? 0
        : width - knobWidth - padding * 2,
      {
        mass: 0.9,
        stiffness: 420,
        damping: 22,
      }
    );
  }, [value]);

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  function toggle() {
    const next = value === option1 ? option2! : option1;
    onChange?.(next);
  }

  return (
    <AceButton
      onPress={toggle}
      style={{
        borderRadius: height / 2,
        position: "relative",
        justifyContent: "center",
        paddingHorizontal: 0,
        padding,
        ...style,
      }}
      buttonStyle={{
        paddingHorizontal: 0,
      }}
      height={height}
      width={width}
      themeType="custom"
      buttonColor={theme.darkSurface}
    >
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
          colors={[theme.lightSurface, theme.lightSurface + "80", hexToRGBA(theme.lightSurface, 0.8)]}
          locations={[0, 0.8, 1]}
          style={{
            height: height,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }} />
      </Animated.View>

      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        {[option1, option2].map((option: string, index: number) => (
          <Text
            key={index}
            style={{
              flex: 1,
              textAlign: "center",
              lineHeight: height,
              textAlignVertical: "center",
              fontSize: 18,
              fontWeight: "600",
              color:
                value === option
                  ? theme.darkSurface
                  : theme.lightSurface,
            }}
          >
            {option}
          </Text>
        ))}
      </View>
    </AceButton>
  );
}