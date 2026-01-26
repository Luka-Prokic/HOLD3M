import { router } from "expo-router";
import { View } from "react-native";
import { AceButton } from "../ui/buttons/AceButton";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { useAnimationStore } from "@/stores/animation/animationStore";

export function HomeFooter() {
    const { themeName } = useSettingsStore();
    const { setHandAnimationPosition } = useAnimationStore();

    function handleHoldem() {
        router.push("/hand");
        setHandAnimationPosition("hand");
    }

    const holdemStyle = themeName === "dark" ? "tint" : "accent";

    return (
        <View style={{ flexDirection: "row", width: "100%", paddingBottom: 16, paddingHorizontal: 24, zIndex: 1 }}>
            <AceButton title="Holdem" onPress={handleHoldem} themeType={holdemStyle} buttonStyle={{ flexGrow: 1 }} />
        </View>
    );
}