import { Text, Pressable } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { Card } from "@/stores/types";
import { getCardRank, getCardRankLetterFromRep } from "@/utils/getCardRank";
import { WIDTH } from "@/utils/Dimensions";
import { useGameStore } from "@/stores/game/useGameStore";

interface PreviewCardProps {
    card: Card;
    onPress: () => void;
}

export function PreviewCard({ card, onPress }: PreviewCardProps) {
    const { cardBackground, cardText, theme } = useThemeStore();
    const { holdCard, heldCards, releaseCard } = useGameStore();

    const isHeld = heldCards.some((c) => c.id === card.id);

    const cardWidth = WIDTH / 6;
    const cardHeight = cardWidth * 1.4;

    const rankLetter = getCardRankLetterFromRep(card.repetition);

    function handleLongPress() {
        if (isHeld) {
            releaseCard(card.id);
        } else {
            holdCard(card.id);
        }
    }

    return (
        <Pressable style={{ width: cardWidth, height: cardHeight, backgroundColor: isHeld ? theme.select : cardBackground, borderRadius: 8, padding: 4 }} onPress={onPress} onLongPress={handleLongPress}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: cardText }}>{rankLetter}</Text>
        </Pressable>
    );
}