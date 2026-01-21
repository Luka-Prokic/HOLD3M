import { View } from "react-native";
import { AceButton } from "../ui/buttons/AceButton";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/stores/themeStore";


export function BoardHeader() {
    const { theme } = useThemeStore();

    return (
        <View style={{ flexDirection: "row", width: "100%", paddingTop: 16, paddingHorizontal: 24, gap: 24, zIndex: 1 }}>
            <AceButton title="Back" onPress={() => router.dismissTo("/")} style={{ marginTop: 8 }} circle>
                <Ionicons name="chevron-back" size={32} color={theme.lightSurface} />
            </AceButton>
        </View>
    );
}