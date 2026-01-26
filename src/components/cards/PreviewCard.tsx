import { Text, Pressable } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { Card } from "@/stores/game/types";
import { getCardRankLetterFromRep } from "@/utils/getCardRank";
import { WIDTH } from "@/utils/Dimensions";
import { useGameStore } from "@/stores/game/gameStore";
import { isLightColor, mixColors, tintColorInvert } from "@/utils/hexToRGBA";

interface PreviewCardProps {
    card: Card;
    onPress?: () => void;
    width?: number;
    privewOnly?: boolean;
}

export function PreviewCard({ card, onPress, width = WIDTH / 3, privewOnly = false }: PreviewCardProps) {
    const { cardColors, theme } = useSettingsStore();
    const { holdCard, heldCards, releaseCard } = useGameStore();

    const isHeld = heldCards.some((c) => c.id === card.id);

    const cardWidth = width;
    const cardHeight = cardWidth * 1.4;

    const rankLetter = getCardRankLetterFromRep(card.repetition);

    const isItLightColor = isLightColor(cardColors.background);
    const backgroundColor = mixColors(cardColors.background, theme.select, isHeld ? (isItLightColor ? 0.8 : 0.2) : 0);
    const borderColor = tintColorInvert(cardColors.background, 0.2);

    function handlePress() {
        if (privewOnly) return;
        onPress?.();
    }

    function handleLongPress() {
        if (privewOnly) return;
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
                borderRadius: 16,
                padding: 4,
                borderWidth: 4,
                borderTopWidth: 0,
                borderLeftWidth: 1,
                borderRightWidth: 3,
                borderColor: borderColor,
            }}
            onPress={handlePress}
            onLongPress={handleLongPress}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: cardColors.text }}>{rankLetter}</Text>
        </Pressable>
    );
}