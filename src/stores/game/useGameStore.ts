import { create } from "zustand";
import { createHandSlice, type HandSlice } from "./slices/handSlice";
import { createCardSlice, type CardSlice } from "./slices/cardSlice";

export type GameStore = HandSlice & CardSlice;

export const useGameStore = create<GameStore>()((...a) => ({
  ...createHandSlice(...a),
  ...createCardSlice(...a),
}));
