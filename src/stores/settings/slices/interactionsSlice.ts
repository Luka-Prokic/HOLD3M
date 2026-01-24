import type { StateCreator } from "zustand";
import { HapticsIntensity } from "@/stores/settings/types";

export interface InteractionsSlice {
  hapticsIntensity: HapticsIntensity;
  useAnimations: boolean;
  setHapticsIntensity: (intensity: HapticsIntensity) => void;
}

export const createInteractionsSlice: StateCreator<
  InteractionsSlice,
  [],
  [],
  InteractionsSlice
> = (set, get) => ({
  hapticsIntensity: "max",
  useAnimations: true,
  setHapticsIntensity: (intensity: HapticsIntensity) => set({ hapticsIntensity: intensity }),
  setUseAnimations: (useAnimations: boolean) => set({ useAnimations: useAnimations }),
});