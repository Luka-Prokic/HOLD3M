import { useSettingsStore } from "@/stores/settings/settingsStore";
import { Card } from "@/stores/game/types";
import { WIDTH } from "@/utils/Dimensions";
import { getCardRankLetterFromRep } from "@/utils/getCardRank";
import { Text, Pressable } from "react-native";
import { useGameStore } from "@/stores/game/gameStore";
import { isLightColor, mixColors, tintColorInvert } from "@/utils/hexToRGBA";


interface FocusCardProps {
    card: Card;
}

export function FocusCard({ card }: FocusCardProps) {
    const { cardColors, cardText, theme } = useSettingsStore();
    const { heldCards, releaseCard, holdCard } = useGameStore();
    const rankLetter = getCardRankLetterFromRep(card.repetition);

    const isHeld = heldCards.some((heldCard) => heldCard.id === card.id);

    const cardHeight = (WIDTH - 48) * 1.4;
    const cardWidth = WIDTH - 48;

    const isItLightColor = isLightColor(cardColors.background);
    const backgroundColor = mixColors(cardColors.background, theme.select, isHeld ? (isItLightColor ? 0.8 : 0.2) : 0);
    const borderColor = tintColorInvert(cardColors.background, 0.2);

    function handleLongPress() {
        if (isHeld) {
            releaseCard(card.id);
        } else {
            holdCard(card.id);
        }
    }

    return (
        <Pressable
            onLongPress={handleLongPress}
            style={{
                width: cardWidth,
                height: cardHeight,
                borderRadius: 32,
                padding: 8,
                backgroundColor,
                borderWidth: 4,
                borderTopWidth: 0,
                borderLeftWidth: 1,
                borderRightWidth: 3,
                borderColor: borderColor,
                shadowColor: theme.shadow,
                shadowOffset: { width: 0, height: 32 },
                shadowOpacity: 1,
                shadowRadius: 8,
                elevation: 8,
                zIndex: 1,
            }} >
            <Text style={{ fontSize: 48, fontWeight: "800", color: cardColors.text }}>{rankLetter}</Text>
            <Text style={{ fontSize: cardText.size, fontWeight: cardText.weight, fontFamily: cardText.family, color: cardColors.text }}>{card.text}</Text>
        </Pressable>
    );
}