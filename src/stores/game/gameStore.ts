import { create } from "zustand";
import { createHandSlice, type HandSlice } from "./slices/handSlice";
import { createCardSlice, type CardSlice } from "./slices/cardSlice";
import { createFlowSlice, type FlowSlice } from "./slices/flowSlice";

export type GameStore = HandSlice & CardSlice & FlowSlice;

export const useGameStore = create<GameStore>()((...a) => ({
  ...createHandSlice(...a),
  ...createCardSlice(...a),
  ...createFlowSlice(...a),
}));
