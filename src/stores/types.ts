export type HandRankType =
    | "high_card"
    | "pair"
    | "two_pair"
    | "three_kind"
    | "straight"
    | "flush"
    | "full_house"
    | "four_kind"
    | "straight_flush"
    | "royal_flush";

export type CardSuit = "hearts" | "diamonds" | "clubs" | "spades";

export interface HandRank {
    type: HandRankType;
    values: number[];
}

export interface Hand {
    id: string;
    cards: Card[];
    rank: HandRank;
    createdAt: number;
}


export interface Card {
    id: string;
    text: string;
    repetition: number;
    suit: CardSuit;
    createdAt: number;
}
