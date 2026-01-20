import { Pressable } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { router } from "expo-router";
import { WIDTH } from "@/utils/Dimensions";
import { Ionicons } from "@expo/vector-icons";
import { useGameStore } from "@/stores/game/useGameStore";

export function CardFooter() {
    const { accentColor } = useThemeStore();
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