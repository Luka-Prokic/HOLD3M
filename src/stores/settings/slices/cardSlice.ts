import type { StateCreator } from "zustand";
import type { CardColors, CardText, CardDeck } from "../types";


const defaultDeck: CardDeck = {
  name: "default",
  icon: "default",
  colors: ["#000000", "#F1EFEA"],
};

export interface CardSlice {
  decks: CardDeck[];
  cardColors: CardColors;
  cardText: CardText;
  cardDeck: CardDeck;
  setCardColorsField: (field: keyof CardColors, value: CardColors[keyof CardColors]) => void;
  setCardTextField: (field: keyof CardText, value: CardText[keyof CardText]) => void;
  setCardDeck: (deck: CardDeck) => void;
}

export const createCardSlice: StateCreator<
  CardSlice,
  [],
  [],
  CardSlice
> = (set, get) => ({
  decks: [
    {
      ...defaultDeck,
    },
  ],
  cardColors: {
    text: "#000000",
    background: "#F1EFEA",
  },
  cardText: {
    size: 18,
    weight: "400",
    family: "sans-serif",
  },
  cardDeck: {
    ...defaultDeck,
  },

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

    const existingDeck = decks.find((d) => d.name === deck.name);

    if (!existingDeck) return;

    set({
      cardDeck: existingDeck,
    });
  },
});
