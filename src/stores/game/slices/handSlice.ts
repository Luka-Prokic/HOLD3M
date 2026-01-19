import type { StateCreator } from "zustand";
import type { Card, Hand } from "../../types";
import { nanoid } from "nanoid/non-secure";
import { calculateHandRank } from "../utils/calculateHandRank";
import { CardSlice } from "./cardSlice";

export interface HandSlice {
  deck: Hand[];
  currentHand: Card[];
  heldCards: Card[];
  startNewHand: () => void;
  holdCard: (cardId: string) => void;
  releaseCard: (cardId: string) => void;
  finalizeHand: () => Hand;
}

export const createHandSlice: StateCreator<
  HandSlice & CardSlice,
  [],
  [],
  HandSlice
> = (set, get) => ({
  deck: [],
  currentHand: [],
  heldCards: [],

  startNewHand: () => {
    const { burnsAvailable, deck } = get();
    if (!burnsAvailable) set({ burnsAvailable: 1 });

    set({ currentHand: deck[deck.length - 1].cards, heldCards: [] });
  },

  holdCard: (cardId) => {
    const { currentHand, heldCards } = get();
    const card = currentHand.find((c) => c.id === cardId);

    if (card && !heldCards.some((c) => c.id === cardId)) {
      set({ heldCards: [...heldCards, card] });
    }
  },

  releaseCard: (cardId) => {
    const { heldCards } = get();
    set({ heldCards: heldCards.filter((c) => c.id !== cardId) });
  },

  finalizeHand: () => {
    const { heldCards, deck } = get();
    const rank = calculateHandRank(heldCards);

    const newHand: Hand = {
      id: `hand_${nanoid()}`,
      cards: [...heldCards],
      rank,
      createdAt: Date.now(),
    };

    set({ deck: [...deck, newHand] });

    return newHand;
  },
});
