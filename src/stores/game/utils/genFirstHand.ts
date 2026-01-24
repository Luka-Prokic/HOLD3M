import { nanoid } from "nanoid/non-secure";
import { CARD_SUITS } from "../constants";
import type { Card } from "@/stores/game/types";

export function genFirstHand(): Card[] {
    return Array.from({ length: 5 }).map(() => ({
        id: `jester_${nanoid()}`,
        text: "",
        repetition: -1,
        suit: CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)],
        createdAt: Date.now(),
    }));
}