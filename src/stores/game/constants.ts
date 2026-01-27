import { CardSuit, HandRankType } from "./types";

export const CARD_SUITS: CardSuit[] = ["hearts", "diamonds", "clubs", "spades"];

export const HAND_RANKS: HandRankType[] = ["high_card", "pair", "two_pair", "three_kind", "straight", "flush", "full_house", "four_kind", "straight_flush", "royal_flush"];

export const CARD_RANKS: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];   // 2-3-4-5-6-7-8-9-10-J-Q-K-A

export type HandRankCheatsheet = {
    rank: string;
    example: string[];
}

export const HAND_RANKS_CHEATSHEET: HandRankCheatsheet[] = [
    {
        rank: "Royal Flush",
        example: ["10♥", "J♥", "Q♥", "K♥", "A♥"],
    },
    {
        rank: "Straight Flush",
        example: ["5♠", "6♠", "7♠", "8♠", "9♠"],
    },
    {
        rank: "Four of Kind",
        example: ["K♣", "K♦", "K♥", "K♠"],
    },
    {
        rank: "Full House",
        example: ["9♠", "9♦", "Q♣", "Q♦", "Q♥"],
    },
    {
        rank: "Flush",
        example: ["2♥", "5♥", "8♥", "J♥", "A♥"],
    },
    {
        rank: "Straight",
        example: ["5♥", "6♦", "7♠", "8♠", "9♦"],
    },
    {
        rank: "Three of Kind",
        example: ["7♣", "7♦", "7♠", "2♦", "Q♥"],
    },
    {
        rank: "Two Pair",
        example: ["8♠", "8♥", "A♣", "A♦"],
    },
    {
        rank: "Pair",
        example: ["K♠", "K♦"],
    },
    {
        rank: "High Card",
        example: ["A♠"],
    },
];