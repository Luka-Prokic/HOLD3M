import { Card } from "@/stores/types";
import type { StateCreator } from "zustand";

export interface FlowSlice {
    currentCardIndex: number;
    selectedCards: Card[];
    selectCard: (card: Card) => void;
    deselectCard: (card: Card) => void;
    clearSelection: () => void;
    setCurrentCardIndex: (index: number) => void;
}

export const createFlowSlice: StateCreator<any, [], [], FlowSlice> = (set, get) => ({
    currentCardIndex: 0,
    selectedCards: [],

    selectCard: (card) => {
        const { selectedCards } = get();

        if (!selectedCards.includes(card)) {
            set({ selectedCards: [...selectedCards, card] });
        }
    },

    deselectCard: (card) => {
        const { selectedCards } = get();
        set({ selectedCards: selectedCards.filter((c: Card) => c !== card) });
    },

    clearSelection: () => set({ selectedCards: [] }),

    setCurrentCardIndex: (index) => {

        const newIndex = Math.max(0, Math.min(index, 4));
        set({ currentCardIndex: newIndex })
    },
});