import { useThemeStore } from "@/stores/themeStore";
import { Card } from "@/stores/types";
import { WIDTH } from "@/utils/Dimensions";
import { getCardRank } from "@/utils/getCardRank";
import { View, Text } from "react-native";


interface InputCardProps {
    card: Card;
}

export function InputCard({ card }: InputCardProps) {
    const { accentColor, tintColor } = useThemeStore();
    const rank = getCardRank(card.repetition);

    const cardHeight = (WIDTH - 48) * 1.4;
    const cardWidth = WIDTH - 48;

    return (
        <View style={{ width: cardWidth, height: cardHeight, borderRadius: 16, padding: 8, backgroundColor: tintColor }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: accentColor }}>{rank}</Text>
        </View>
    );
}