import type { StateCreator } from "zustand";
import type { HandSlice } from "./handSlice";
import type { Card } from "@/stores/game/types";
import { nanoid } from "nanoid/non-secure";
import { getRandomCardSuit } from "../utils/getRandomCardSuit";

export interface CardSlice {
  burnsAvailable: number;
  addCard: (card: Card) => void;
  burnCards: () => void;
  resetBurns: () => void;
}

export const createCardSlice: StateCreator<
  HandSlice & CardSlice,
  [],
  [],
  CardSlice
> = (set, get) => ({
  burnsAvailable: 1,

  addCard: (card: Card) => {
    const { currentHand } = get();

    const newCard: Card = {
      id: `card_${nanoid()}`,
      text: card.text,
      repetition: 0,
      suit: card.suit,
      createdAt: Date.now(),
    };

    const newCurrentHand = currentHand.map(c => c.id === card.id ? newCard : c);

    set({
      currentHand: newCurrentHand,
    });
  },

  burnCards: () => {
    const { burnsAvailable, currentHand, heldCards } = get();
    if (burnsAvailable <= 0) return;

    const heldIds = new Set(heldCards.map(c => c.id));

    const keptCards = currentHand.filter(card =>
      heldIds.has(card.id)
    );

    const burnedCount = currentHand.length - keptCards.length;

    const jesters: Card[] = Array.from({ length: burnedCount }).map(() => ({
      id: `jester_${nanoid()}`,
      text: "",
      repetition: -1,
      suit: getRandomCardSuit(),
      createdAt: Date.now(),
    }));

    set({
      currentHand: [...keptCards, ...jesters],
      burnsAvailable: burnsAvailable - 1,
    });
  },

  resetBurns: () => {
    set({ burnsAvailable: 1 });
  },
});
