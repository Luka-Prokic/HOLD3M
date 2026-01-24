import { View, Text } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { useGameStore } from "@/stores/game/gameStore";



export function CurrentRound() {
    const { theme, themeName, accentColor, tintColor } = useSettingsStore();
    const { rounds } = useGameStore();

    const hashColor = themeName === "light" ? tintColor : accentColor;
    const roundColor = themeName === "light" ? accentColor : tintColor;

    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 96, fontWeight: "800", color: theme.textInverted }}>Round</Text>
            <Text style={{ fontSize: 128, fontWeight: "800", color: hashColor }}>#<Text style={{ color: roundColor }}>{rounds.length + 1}</Text></Text>
        </View>
    );
}