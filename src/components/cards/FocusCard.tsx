import { useThemeStore } from "@/stores/themeStore";
import { Card } from "@/stores/types";
import { WIDTH } from "@/utils/Dimensions";
import { getCardRank, getCardRankLetterFromRep } from "@/utils/getCardRank";
import { Text, Pressable } from "react-native";


interface FocusCardProps {
    card: Card;
}

export function FocusCard({ card }: FocusCardProps) {
    const { cardBackground, cardText, theme } = useThemeStore();
    const rankLetter = getCardRankLetterFromRep(card.repetition);

    const cardHeight = (WIDTH - 48) * 1.4;
    const cardWidth = WIDTH - 48;

    return (
        <Pressable
            style={{
                width: cardWidth,
                height: cardHeight,
                borderRadius: 16,
                padding: 8,
                backgroundColor: cardBackground,
                shadowColor: theme.shadow,
                shadowOffset: { width: 0, height: 32 },
                shadowOpacity: 1,
                shadowRadius: 8,
                elevation: 8,
                zIndex: 1,
            }} >
            <Text style={{ fontSize: 48, fontWeight: "bold", color: cardText }}>{rankLetter}</Text>
            <Text style={{ fontSize: 24, color: cardText }}>{card.text}</Text>
        </Pressable>
    );
}