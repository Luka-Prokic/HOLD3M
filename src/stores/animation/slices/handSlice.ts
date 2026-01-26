import type { StateCreator } from "zustand";
import type { HandAnimationPosition } from "../types";

export interface HandSlice {
  handAnimationPosition: HandAnimationPosition;
  setHandAnimationPosition: (position: HandAnimationPosition) => void;
}

export const createHandSlice: StateCreator<
  HandSlice,
  [],
  [],
  HandSlice
> = (set, get) => ({
  handAnimationPosition: "home",
  setHandAnimationPosition: (position) => set({ handAnimationPosition: position }),
});