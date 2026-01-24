import { Pressable } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { router } from "expo-router";
import { WIDTH } from "@/utils/Dimensions";
import { Ionicons } from "@expo/vector-icons";
import { useGameStore } from "@/stores/game/gameStore";

export function CardFooter() {
    const { accentColor } = useSettingsStore();
    const { clearSelection } = useGameStore();

    function handlePress() {
        router.back();
        clearSelection();
    }
    return (

        <Pressable style={{ width: WIDTH, alignItems: "center" }} onPress={handlePress} >
            <Ionicons name="chevron-down" size={96} color={accentColor} />
        </Pressable>
    );
}