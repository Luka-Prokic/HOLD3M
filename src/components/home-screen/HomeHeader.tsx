import { router } from "expo-router";
import { View } from "react-native";
import { AceButton } from "../ui/buttons/AceButton";
import { useThemeStore } from "@/stores/themeStore";
import { Ionicons } from "@expo/vector-icons";

export function HomeHeader() {
    const { theme } = useThemeStore();

    return (
        <View style={{ flexDirection: "row", width: "100%", paddingTop: 16, paddingHorizontal: 24, gap: 24, zIndex: 1 }}>
            <AceButton title="Board" onPress={() => router.push("/board")} buttonStyle={{ flexGrow: 1 }} />
            <AceButton title="Settings" onPress={() => router.push("/settings")}>
                <Ionicons name="cog" size={32} color={theme.lightSurface} />
            </AceButton>
        </View>
    );
}