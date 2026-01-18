import { CardSuit, HandRankType } from "../types";

export const CARD_SUITS: CardSuit[] = ["hearts", "diamonds", "clubs", "spades"];

export const HAND_RANKS: HandRankType[] = ["high_card", "pair", "two_pair", "three_kind", "straight", "flush", "full_house", "four_kind", "straight_flush", "royal_flush"];

export const CARD_RANKS: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];   // 2-3-4-5-6-7-8-9-10-J-Q-K-A