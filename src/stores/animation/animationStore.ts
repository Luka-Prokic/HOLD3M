import { create } from "zustand";
import { createHandSlice, type HandSlice } from "./slices/handSlice";

export type AnimationStore = HandSlice;

export const useAnimationStore = create<AnimationStore>()((...a) => ({
  ...createHandSlice(...a),
}));
