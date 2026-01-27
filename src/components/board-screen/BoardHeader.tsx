import { View, Text } from "react-native";
import { AceButton } from "../ui/buttons/AceButton";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "@/stores/settings/settingsStore";


export function BoardHeader() {
    const { theme } = useSettingsStore();

    return (
        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", paddingTop: 16, paddingHorizontal: 24, gap: 24, zIndex: 1 }}>
            <AceButton title="Back" onPress={() => router.dismissTo("/")} style={{ marginTop: 8 }} circle>
                <Ionicons name="chevron-back" size={32} color={theme.lightSurface} />
            </AceButton>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: theme.text }}>Board</Text>
            <AceButton title="Back" onPress={() => router.push("/ranks")} style={{ marginTop: 8 }} circle>
                <Ionicons name="ribbon" size={32} color={theme.lightSurface} />
            </AceButton>
        </View>
    );
}