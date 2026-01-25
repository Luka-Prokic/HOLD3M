import { useSettingsStore } from "@/stores/settings/settingsStore";
import { Card } from "@/stores/game/types";
import { WIDTH } from "@/utils/Dimensions";
import { getCardRankLetterFromRep } from "@/utils/getCardRank";
import { Text, Pressable } from "react-native";
import { useGameStore } from "@/stores/game/gameStore";


interface FocusCardProps {
    card: Card;
}

export function FocusCard({ card }: FocusCardProps) {
    const { cardColors, cardText, theme } = useSettingsStore();
    const { heldCards } = useGameStore();
    const rankLetter = getCardRankLetterFromRep(card.repetition);

    const isHeld = heldCards.some((heldCard) => heldCard.id === card.id);

    const cardHeight = (WIDTH - 48) * 1.4;
    const cardWidth = WIDTH - 48;

    return (
        <Pressable
            style={{
                width: cardWidth,
                height: cardHeight,
                borderRadius: 16,
                padding: 8,
                backgroundColor: isHeld ? theme.select : cardColors.background,
                borderWidth: 4,
                borderTopWidth: 0,
                borderLeftWidth: 1,
                borderRightWidth: 3,
                borderColor: theme.shadow,
                shadowColor: theme.shadow,
                shadowOffset: { width: 0, height: 32 },
                shadowOpacity: 1,
                shadowRadius: 8,
                elevation: 8,
                zIndex: 1,
            }} >
            <Text style={{ fontSize: 48, fontWeight: "bold", color: cardColors.text }}>{rankLetter}</Text>
            <Text style={{ fontSize: cardText.size, fontWeight: cardText.weight, fontFamily: cardText.family, color: cardColors.text }}>{card.text}</Text>
        </Pressable>
    );
}