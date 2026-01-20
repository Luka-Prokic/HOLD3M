import { View, Text } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { useGameStore } from "@/stores/game/useGameStore";



export function CurrentRound() {
    const { theme, themeName, accentColor, tintColor } = useThemeStore();
    const { round } = useGameStore();

    const hashColor = themeName === "light" ? tintColor : accentColor;
    const roundColor = themeName === "light" ? accentColor : tintColor;

    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 96, fontWeight: "800", color: theme.textInverted }}>Round</Text>
            <Text style={{ fontSize: 128, fontWeight: "800", color: hashColor }}>#<Text style={{ color: roundColor }}>{round.length + 1}</Text></Text>
        </View>
    );
}