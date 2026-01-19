import type { StateCreator } from "zustand";
import type { HandSlice } from "./handSlice";
import type { Card } from "@/stores/types";
import { CARD_SUITS } from "../constants";
import { nanoid } from "nanoid/non-secure";

export interface CardSlice {
  burnsAvailable: number;
  addCard: (text: string) => void;
  editCard: (cardId: string, text: string) => void;
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

  addCard: (text: string) => {
    const newCard: Card = {
      id: nanoid(),
      text,
      repetition: 0,
      suit: CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)],
      createdAt: Date.now(),
    };

    set({
      currentHand: [...get().currentHand, newCard],
    });
  },

  editCard: (cardId, text) => {
    const { currentHand } = get();
    set({
      currentHand: currentHand.map((card) =>
        card.id === cardId ? { ...card, text } : card
      ),
    });
  },

  burnCards: () => {
    const { burnsAvailable, currentHand, heldCards } = get();

    if (burnsAvailable <= 0) {
      return;
    }


    const cardsNotToBurn = currentHand.filter((card) => heldCards.includes(card));

    set({
      currentHand: cardsNotToBurn,
      burnsAvailable: burnsAvailable - 1,
    });
  },

  resetBurns: () => {
    set({ burnsAvailable: 1 });
  },
});
