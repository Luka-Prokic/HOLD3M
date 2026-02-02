import type { StateCreator } from "zustand";
import type { HandSlice } from "./handSlice";
import type { Card } from "@/stores/game/types";
import { nanoid } from "nanoid/non-secure";
import { getRandomCardSuit } from "../utils/getRandomCardSuit";

export interface CardSlice {
  burnsAvailable: number;
  addCard: (card: Card) => void;
  writeOnJester: (card: Card, text: string) => void;
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


  /*
  * Turn Jester into real card and add it to the current hand.
  * @param card - The Jester card into a real card.
  */
  addCard: (card: Card) => {
    const { currentHand } = get();

    const id = `card_${nanoid()}`;

    const newCard: Card = {
      id,
      originalId: id,
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

  /*
  * Write on a Jester card.
  * @param card - The Jester card to write on.
  * @param text - The text to write on the card.
  */
  writeOnJester: (card: Card, text: string) => {
    const { currentHand } = get();
    const newCurrentHand = currentHand.map(c => c.id === card.id ? { ...c, text } : c);
    set({
      currentHand: newCurrentHand,
    });
  },

  /*
  * Burn unheld cards from the current hand.
  * @param cards - The cards to burn.
  */
  burnCards: () => {
    const { burnsAvailable, currentHand, heldCards } = get();
    if (burnsAvailable <= 0) return;

    const heldIds = new Set(heldCards.map(c => c.id));

    const keptCards = currentHand.filter(card =>
      heldIds.has(card.id)
    );

    const jesterCards = currentHand.filter(card => card.repetition === -1);

    const burnedCount = currentHand.length - keptCards.length - jesterCards.length;

    const jesters: Card[] = Array.from({ length: burnedCount }).map(() => ({
      id: `jester_${nanoid()}`,
      originalId: "jester",
      text: "",
      repetition: -1,
      suit: getRandomCardSuit(),
      createdAt: Date.now(),
    }));

    set({
      currentHand: [...keptCards, ...jesterCards, ...jesters],
      burnsAvailable: burnsAvailable - 1,
    });
  },

  /*
  * Reset the number of burns available to 1.
  */

  resetBurns: () => {
    set({ burnsAvailable: 1 });
  },
});
