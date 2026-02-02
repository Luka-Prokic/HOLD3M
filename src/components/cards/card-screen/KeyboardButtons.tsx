import { AceButton } from "@/components/ui/buttons/AceButton";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { WIDTH } from "@/utils/Dimensions";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAvoidingView, Platform } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export function KeyboardButtons() {
    const { theme, themeName, isAnimationsEnabled } = useSettingsStore();

    const themeType = themeName === "light" ? "accent" : "tint";

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,

                width: WIDTH,
                zIndex: 1,
            }}
        >
            <Animated.View
                entering={isAnimationsEnabled ? FadeIn.duration(300).delay(200) : FadeIn.duration(10).delay(200)}
                style={{
                    paddingBottom: 16,
                    flexDirection: "row",
                    gap: 16,
                    paddingHorizontal: 16,
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <AceButton
                    title="Add Habit"
                    onPress={() => { }}
                    themeType={themeType}
                    buttonStyle={{ flexGrow: 1 }}
                />

                <AceButton circle onPress={() => { }}>
                    <Ionicons name="heart" size={24} color={theme.lightSurface} />
                </AceButton>
            </Animated.View>
        </KeyboardAvoidingView>
    );
}