import { Text, Pressable } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { Card } from "@/stores/types";
import { getCardRank } from "@/utils/getCardRank";
import { WIDTH } from "@/utils/Dimensions";

interface PreviewCardProps {
    card: Card;
    onPress: () => void;
}

export function PreviewCard({ card, onPress }: PreviewCardProps) {
    const { cardBackground, cardText } = useThemeStore();

    const cardWidth = WIDTH / 6;
    const cardHeight = cardWidth * 1.4;

    const rank = getCardRank(card.repetition);

    return (
        <Pressable style={{ width: cardWidth, height: cardHeight, backgroundColor: cardBackground, borderRadius: 8, padding: 4 }} onPress={onPress}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: cardText }}>{rank}</Text>
        </Pressable>
    );
}