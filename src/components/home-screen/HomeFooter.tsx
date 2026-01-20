import { router } from "expo-router";
import { View } from "react-native";
import { AceButton } from "../ui/buttons/AceButton";
import { useThemeStore } from "@/stores/themeStore";

export function HomeFooter() {
    const { themeName } = useThemeStore();

    function handleHoldem() {
        router.push("/hand");
    }

    const holdemStyle = themeName === "dark" ? "tint" : "accent";

    return (
        <View style={{ flexDirection: "row", width: "100%", paddingBottom: 16, paddingHorizontal: 24, gap: 24, zIndex: 1 }}>
            <AceButton title="Holdem" onPress={handleHoldem} themeType={holdemStyle} buttonStyle={{ flexGrow: 1 }} />
        </View>
    );
}