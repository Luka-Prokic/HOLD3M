import { useThemeStore } from "@/stores/themeStore";
import { WIDTH } from "@/utils/Dimensions";
import { View, Text } from "react-native";

export function JesterInputCard() {
    const { accentColor, tintColor, cardBackground, cardText } = useThemeStore();
    const cardHeight = (WIDTH - 48) * 1.4;
    const cardWidth = WIDTH - 48;

    return (
        <View style={{ width: cardWidth, height: cardHeight, borderRadius: 16, padding: 8, backgroundColor: cardBackground }}>
            <Text style={{ fontSize: 48, fontWeight: "bold", color: cardText }}>J</Text>
        </View>
    );
}