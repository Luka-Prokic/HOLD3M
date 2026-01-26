import { Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { AceButton } from "@/components/ui/buttons/AceButton";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { hexToRGBA } from "@/utils/hexToRGBA";
import { LinearGradient } from "expo-linear-gradient";
import { WIDTH } from "@/utils/Dimensions";
import { Ionicons } from "@expo/vector-icons";
import { GlassCard } from "@/components/ui/buttons/GlassCard";
import { haptic } from "@/utils/useHaptics";

export function ThemeSwtichOption() {
    const { theme, accentColor, themeName, setTheme, isAnimationsEnabled } = useSettingsStore();

    const width = (WIDTH - 32) / 2;
    const knobWidth = width * 0.5;
    const padding = 3;

    const translateX = useSharedValue(
        themeName === "light" ? 0 : width - knobWidth - padding * 2
    );

    useDerivedValue(() => {
        const target = themeName === "light" ? 0 : width - knobWidth - padding * 2;

        if (isAnimationsEnabled) {
            translateX.value = withSpring(target, {
                mass: 0.9,
                stiffness: 420,
                damping: 22,
            });
        } else {
            translateX.value = target; // instantly jump, no animation
        }
    }, [themeName, isAnimationsEnabled]);

    const knobStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    function toggle() {
        const next = themeName === "light" ? "dark" : "light";
        setTheme(next);
    }

    function handlePressIn() {
        haptic("bold");
    }

    return (
        <GlassCard style={{ flexDirection: "row", width: WIDTH - 32, alignItems: "center", justifyContent: "space-between", padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: "600", color: theme.text }}>App Theme</Text>

            <AceButton
                onPress={toggle}
                onPressIn={handlePressIn}
                style={{
                    borderRadius: 27,
                    position: "relative",
                    justifyContent: "center",
                    paddingHorizontal: 0,
                    padding,
                }}
                buttonStyle={{
                    paddingHorizontal: 0,
                }}
                height={54}
                width={width}
                themeType="custom"
                buttonColor={theme.darkSurface}
            >
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            width: knobWidth,
                            height: 54 - padding * 2,
                            top: padding,
                            left: padding,
                            borderRadius: 27,
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
                            height: 54,
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
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {["light", "dark"].map((option: string, index: number) => (<ThemeOption key={index} option={option} active={option === themeName} activeColor={theme.darkSurface} inactiveColor={theme.lightSurface} />))}
                </View>
            </AceButton>
        </GlassCard>
    );
}

interface ThemeOptionProps {
    option: string;
    active: boolean;
    activeColor: string;
    inactiveColor: string;
}

export function ThemeOption({
    option,
    active,
    activeColor,
    inactiveColor,
}: ThemeOptionProps) {
    const color = active ? activeColor : inactiveColor;

    switch (option) {
        case "light":
            return active ? (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Ionicons name="sunny-outline" size={28} color={color} />
                </View>
            ) : (
                <Text style={{ fontSize: 18, fontWeight: "600", color, textAlign: "center", flex: 1 }}>
                    DARK
                </Text>
            );

        case "dark":
            return active ? (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Ionicons name="moon-outline" size={28} color={color} />
                </View>
            ) : (
                <Text style={{ fontSize: 18, fontWeight: "600", color, textAlign: "center", flex: 1 }}>
                    LIGHT
                </Text>
            );

        default:
            return null;
    }
}