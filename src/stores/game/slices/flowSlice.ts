import type { StateCreator } from "zustand";

export interface FlowSlice {
    currentCardIndex: number;
    clearSelection: () => void;
    setCurrentCardIndex: (index: number) => void;
}

export const createFlowSlice: StateCreator<any, [], [], FlowSlice> = (set, get) => ({
    currentCardIndex: -1,

    clearSelection: () => set({ currentCardIndex: -1 }),

    setCurrentCardIndex: (index) => {

        const newIndex = Math.max(0, Math.min(index, 4));
        set({ currentCardIndex: newIndex })
    },
});