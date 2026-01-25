import { Text, Pressable } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { Card } from "@/stores/game/types";
import { getCardRankLetterFromRep } from "@/utils/getCardRank";
import { WIDTH } from "@/utils/Dimensions";
import { useGameStore } from "@/stores/game/gameStore";
import { mixColors } from "@/utils/hexToRGBA";

interface PreviewCardProps {
    card: Card;
    onPress: () => void;
}

export function PreviewCard({ card, onPress }: PreviewCardProps) {
    const { cardColors, theme } = useSettingsStore();
    const { holdCard, heldCards, releaseCard } = useGameStore();

    const isHeld = heldCards.some((c) => c.id === card.id);

    const cardWidth = WIDTH / 6;
    const cardHeight = cardWidth * 1.4;

    const rankLetter = getCardRankLetterFromRep(card.repetition);

    const backgroundColor = mixColors(cardColors.background, theme.select, isHeld ? 0.4 : 0);

    function handleLongPress() {
        if (isHeld) {
            releaseCard(card.id);
        } else {
            holdCard(card.id);
        }
    }

    return (
        <Pressable
            style={{
                width: cardWidth,
                height: cardHeight,
                backgroundColor,
                borderRadius: 8,
                padding: 4
            }}
            onPress={onPress}
            onLongPress={handleLongPress}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: cardColors.text }}>{rankLetter}</Text>
        </Pressable>
    );
}