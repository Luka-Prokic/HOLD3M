import { Text, View } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { Card, CardSuit, Hand } from "@/stores/game/types";
import { getCardRankLetterFromRep } from "@/utils/getCardRank";
import { Fragment, useRef } from "react";
import { HandInfoBottomSheet } from "./HandInfoBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { QueenButton } from "../ui/buttons/QueenButton";

interface RoundPreviewBarProps {
    round: Hand;
    roundNumber: number;
}

export function RoundPreviewBar({ round, roundNumber }: RoundPreviewBarProps) {
    const { theme } = useSettingsStore();
    const handInfoBottomSheetRef = useRef<BottomSheetModal>(null);
    const cards = getCards(round.cards);
    const date = formatDateDMY(new Date(round.createdAt));

    return (
        <Fragment>
            <QueenButton onPress={() => handInfoBottomSheetRef.current?.present()}>
                <View
                    style={{
                        height: 54,
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                    <Text style={{ fontSize: 24, fontWeight: "800", color: theme.darkSurface }}>#{roundNumber}</Text>

                    <Text style={{ fontSize: 18, fontWeight: "600", color: theme.darkSurface }}>{cards}</Text>

                    <Text style={{ fontSize: 12, fontWeight: "600", color: theme.darkSurface }}>{date}</Text>
                </View>
            </QueenButton>
            <HandInfoBottomSheet ref={handInfoBottomSheetRef} hand={round} />
        </Fragment>

    );
}

export const SUIT_ICON: Record<CardSuit, string> = {
    hearts: "♥",
    diamonds: "♦",
    spades: "♠",
    clubs: "♣"
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