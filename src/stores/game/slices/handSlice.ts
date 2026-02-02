import type { StateCreator } from "zustand";
import type { Card, Hand } from "../types";
import { nanoid } from "nanoid/non-secure";
import { calculateHandRank } from "../utils/calculateHandRank";
import { CardSlice } from "./cardSlice";
import { genFirstHand } from "../utils/genFirstHand";
import { getRandomCardSuit } from "../utils/getRandomCardSuit";

export interface HandSlice {
  rounds: Hand[];
  currentHand: Card[];
  heldCards: Card[];
  endOfRoundTime: string;
  startNewHand: () => void;
  holdCard: (cardId: string) => void;
  releaseCard: (cardId: string) => void;
  finalizeHand: () => Hand;
  setEndOfRoundTime: (timeStamp: string) => void;
}

const VALID_TIME_REGEX = /^(0\d|1\d|2[0-3]):00|24:00$/;

export const createHandSlice: StateCreator<
  HandSlice & CardSlice,
  [],
  [],
  HandSlice
> = (set, get) => ({
  rounds: [],
  currentHand: genFirstHand(),
  heldCards: [],
  endOfRoundTime: "00:00",


  setEndOfRoundTime: (timeStamp) => {
    if (!VALID_TIME_REGEX.test(timeStamp)) return;

    set({ endOfRoundTime: timeStamp });
  },

  startNewHand: () => {
    const { burnsAvailable, rounds } = get();
    if (!burnsAvailable) set({ burnsAvailable: 1 });

    const lastHand = rounds[rounds.length - 1];

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

    const newJesterCount = 5 - newHand.length;

    const newJesters: Card[] = Array.from({ length: newJesterCount }).map(() => ({
      id: `jester_${nanoid()}`,
      originalId: `jester`,
      text: "",
      repetition: -1,
      suit: getRandomCardSuit(),
      createdAt: Date.now(),
    }));

    set({ currentHand: [...newHand, ...newJesters], heldCards: [] });
  },

  holdCard: (cardId) => {
    const { currentHand, heldCards } = get();
    const card = currentHand.find((c) => c.id === cardId);

    if (!card || card.repetition < 0) return;

    if (!heldCards.some((c) => c.id === cardId)) {
      set({ heldCards: [...heldCards, card] });
    }
  },

  releaseCard: (cardId) => {
    const { heldCards } = get();
    set({ heldCards: heldCards.filter((c) => c.id !== cardId) });
  },

  finalizeHand: () => {
    const { heldCards, rounds } = get();
    const rank = calculateHandRank(heldCards);

    const newHand: Hand = {
      id: `hand_${nanoid()}`,
      cards: [...heldCards],
      rank,
      createdAt: Date.now(),
    };

    set({ rounds: [...rounds, newHand] });

    return newHand;
  },
});