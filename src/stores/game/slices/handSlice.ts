import type { StateCreator } from "zustand";
import type { Card, Hand } from "../../types";
import { nanoid } from "nanoid/non-secure";
import { calculateHandRank } from "../utils/calculateHandRank";
import { CardSlice } from "./cardSlice";
import { CARD_SUITS } from "../constants";
import { genFirstHand } from "../utils/genFirstHand";

export interface HandSlice {
  round: Hand[];
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
  round: [],
  currentHand: genFirstHand(),
  heldCards: [],

  startNewHand: () => {
    const { burnsAvailable, round } = get();
    if (!burnsAvailable) set({ burnsAvailable: 1 });

    const lastHand = round[round.length - 1];
    if (!lastHand) {
      set({ currentHand: [], heldCards: [] });
      return;
    }

    const newHand: Card[] = lastHand.cards.map(card => ({
      ...card,
      id: nanoid(),
      repetition: card.repetition + 1,
      createdAt: Date.now(),
    }));

    const jesters: Card[] = [5 - newHand.length].map(() => ({
      id: `jester_${nanoid()}`,
      text: "",
      repetition: -1,
      suit: CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)],
      createdAt: Date.now(),
    }));

    set({ currentHand: [...newHand, ...jesters], heldCards: [] });
  },

  holdCard: (cardId) => {
    const { currentHand, heldCards } = get();
    const card = currentHand.find((c) => c.id === cardId);

    if (!card || card.repetition < 0) return;

    if (card && !heldCards.some((c) => c.id === cardId)) {
      set({ heldCards: [...heldCards, card] });
    }
  },

  releaseCard: (cardId) => {
    const { heldCards } = get();
    set({ heldCards: heldCards.filter((c) => c.id !== cardId) });
  },

  finalizeHand: () => {
    const { heldCards, round } = get();
    const rank = calculateHandRank(heldCards);

    const newHand: Hand = {
      id: `hand_${nanoid()}`,
      cards: [...heldCards],
      rank,
      createdAt: Date.now(),
    };

    set({ round: [...round, newHand] });

    return newHand;
  },
});
