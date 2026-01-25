import type { StateCreator } from "zustand";
import type { CardColors, CardText, CardDeck } from "../types";

export interface CardSlice {
  cardColors: CardColors;
  cardText: CardText;
  cardDeck: CardDeck;
  setCardColorsField: (field: keyof CardColors, value: CardColors[keyof CardColors]) => void;
  setCardTextField: (field: keyof CardText, value: CardText[keyof CardText]) => void;
  setCardDeckField: (field: keyof CardDeck, value: CardDeck[keyof CardDeck]) => void;
}

export const createCardSlice: StateCreator<
  CardSlice,
  [],
  [],
  CardSlice
> = (set, get) => ({
  cardColors: {
    text: "#000000",
    background: "#F1EFEA",
  },
  cardText: {
    size: 12,
    weight: "400",
    family: "sans-serif",
  },
  cardDeck: {
    deck: "default",
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
  setCardDeckField: (field, value) => {
    set((state) => ({
      cardDeck: { ...state.cardDeck, [field]: value },
    }));
  },
});
