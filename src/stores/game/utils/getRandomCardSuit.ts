import { CARD_SUITS } from "../constants";



export function getRandomCardSuit() {
    return CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)];
}