import { Pressable } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { router } from "expo-router";
import { WIDTH } from "@/utils/Dimensions";
import { Ionicons } from "@expo/vector-icons";

export function CardFooter() {
    const { accentColor, tintColor, themeName } = useThemeStore();

    const chevronColor = themeName === "light" ? accentColor : tintColor;

    function handlePress() {
        router.back();
    }
    return (

        <Pressable style={{ width: WIDTH, alignItems: "center" }} onPress={handlePress} >
            <Ionicons name="chevron-down" size={96} color={chevronColor} />
        </Pressable>
    );
}