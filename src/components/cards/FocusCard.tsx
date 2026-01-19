import { useThemeStore } from "@/stores/themeStore";
import { Card } from "@/stores/types";
import { WIDTH } from "@/utils/Dimensions";
import { getCardRank } from "@/utils/getCardRank";
import { Text, Pressable } from "react-native";


interface FocusCardProps {
    card: Card;
}

export function FocusCard({ card }: FocusCardProps) {
    const { cardBackground, cardText } = useThemeStore();
    const rank = getCardRank(card.repetition);

    const cardHeight = (WIDTH - 48) * 1.4;
    const cardWidth = WIDTH - 48;

    return (
        <Pressable style={{ width: cardWidth, height: cardHeight, borderRadius: 16, padding: 8, backgroundColor: cardBackground }} >
            <Text style={{ fontSize: 48, fontWeight: "bold", color: cardText }}>{rank}</Text>
            <Text style={{ fontSize: 24, color: cardText }}>{card.text}</Text>
        </Pressable>
    );
}