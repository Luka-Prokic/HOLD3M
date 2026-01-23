import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { View, Text } from "react-native";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { SettingsScreenBackground } from "@/components/ui/backgrounds/SettingsScreenBackground";
import { ColorComboPicker } from "@/components/setttings-screen/app-appearance/ColorComboPicker";
import { GlassCard } from "@/components/ui/sliders/GlassCard";
import { Paragraph } from "@/components/ui/texts/Paragraph";
import { Ionicons } from "@expo/vector-icons";
import { ThemeSwtichButton } from "@/components/setttings-screen/app-appearance/ThemeSwtichButton";
import { useThemeStore } from "@/stores/themeStore";

export default function Page() {
    const { theme } = useThemeStore();

    return (
        <Fragment>
            <SettingsScreenBackground />
            <ScreenContent
                edges={["top"]}
                scrollable
                HeaderComponent={<SettingsHeader title="Appearance" showBack />}
            >
                <View style={{ width: "100%", padding: 16, gap: 32 }}>
                    <GlassCard style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between", padding: 16 }}>
                        <Text style={{ fontSize: 24, fontWeight: "600", color: theme.text }}>App Theme</Text>
                        <ThemeSwtichButton />
                    </GlassCard>

                    <Paragraph
                        icon={<Ionicons name="color-fill-outline" size={32} color={theme.text} />}
                        title="App Color Combo"
                        text="Pick the main colors used across the app."
                    />

                    <ColorComboPicker />

                </View>

            </ScreenContent>
        </Fragment >
    );
}
