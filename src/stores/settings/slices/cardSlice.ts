import type { StateCreator } from "zustand";
import type { CardColors, CardText, CardDeck } from "../types";


export interface CardSlice {
  decks: string[];
  cardColors: CardColors;
  cardText: CardText;
  cardDeck: string;
  setCardColorsField: (field: keyof CardColors, value: CardColors[keyof CardColors]) => void;
  setCardTextField: (field: keyof CardText, value: CardText[keyof CardText]) => void;
  setCardDeck: (deck: string) => void;
}

export const createCardSlice: StateCreator<
  CardSlice,
  [],
  [],
  CardSlice
> = (set, get) => ({
  decks: ["default", "classic"],

  cardColors: {
    text: "#000000",
    background: "#F1EFEA",
  },
  cardText: {
    size: 18,
    weight: "400",
    family: "sans-serif",
  },
  cardDeck: "classic",

  setCardColorsField: (field, value) => {
    set((state) => ({
      cardColors: { ...state.cardColors, [field]: value },
    }));
  },
  setCardTextField: (field, value) => {
    set((state) => ({
      cardText: { ...state.cardText, [field]: value },
    }));
  },

  setCardDeck: (deck) => {
    const { decks } = get();

    const existingDeck = decks.find((d) => d === deck);

    if (!existingDeck) return;

    set({
      cardDeck: existingDeck,
    });
  },
});
