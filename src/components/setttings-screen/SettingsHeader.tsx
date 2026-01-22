import { View, Text } from "react-native";
import { AceButton } from "../ui/buttons/AceButton";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/stores/themeStore";
import { EndDayButton } from "../ui/mock/EndDayButton";

interface SettingsHeaderProps {
    title?: string;
    showBack?: boolean;
    showHome?: boolean;
    dayResetBeta?: boolean;
}

export function SettingsHeader({ title = "Settings", showBack = false, showHome = true, dayResetBeta = true }: SettingsHeaderProps) {
    const { theme } = useThemeStore();

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingTop: 16, paddingHorizontal: 24, gap: 24, zIndex: 1 }}>
            <View style={{ width: 64, height: 64 }}>
                {showBack && (
                    <AceButton title="Back" onPress={() => router.back()} style={{ marginTop: 8 }} circle>
                        <Ionicons name="chevron-back" size={32} color={theme.lightSurface} />
                    </AceButton>
                )}
                {!showBack && dayResetBeta && (
                    <EndDayButton />
                )}
            </View>

            <Text style={{ fontSize: 32, fontWeight: "bold", color: theme.text }}>{title}</Text>
            <View style={{ width: 64, height: 64 }}>
                {showHome && (
                    <AceButton title="Home" onPress={() => router.dismissTo("/")} style={{ marginTop: 8 }} circle>
                        <Ionicons name="home" size={32} color={theme.lightSurface} />
                    </AceButton>
                )}
            </View>
        </View>
    );
}