import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { Card, CardSuit, Hand } from "@/stores/types";
import { getCardRankLetterFromRep } from "@/utils/getCardRank";

interface RoundPreviewBarProps {
    round: Hand;
    roundNumber: number;
    onPress: () => void;
}

export function RoundPreviewBar({ round, roundNumber, onPress }: RoundPreviewBarProps) {
    const { theme } = useThemeStore();
    const cards = getCards(round.cards);
    const date = formatDateDMY(new Date(round.createdAt));

    return (
        <Pressable onPress={onPress}>
            <LinearGradient
                colors={[theme.lightSurface + "80", theme.lightSurface, theme.lightSurface + "80"]}
                locations={[0, 0.8, 1]}
                style={{
                    height: 54,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 16,
                    borderRadius: 16,
                    borderWidth: 0.2,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: "white",
                }}>
                <Text style={{ fontSize: 32, fontWeight: "800", color: theme.darkSurface }}>#{roundNumber}</Text>

                <Text style={{ fontSize: 18, fontWeight: "600", color: theme.darkSurface }}>{cards}</Text>

                {/* <Text style={{ fontSize: 12, fontWeight: "600", color: theme.darkSurface }}>{date}</Text>s */}
            </LinearGradient>
        </Pressable>
    );
}

export const SUIT_ICON: Record<CardSuit, string> = {
    hearts: "❤️",
    spades: "♠️",
    diamonds: "♦️",
    clubs: "♣️",
};

function getCards(cards: Card[]) {
    return cards.map((card) => {
        const cardValue = getCardValue(card);
        const cardSuit = card.suit;
        return `${cardValue}${SUIT_ICON[cardSuit]}`;
    }).join(" ");
}

function getCardValue(card: Card) {
    const cardValue = getCardRankLetterFromRep(card.repetition);
    return cardValue;
}

export function formatDateDMY(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}