import type { StateCreator } from "zustand";
import type { HapticsIntensity } from "@/stores/settings/types";

export interface InteractionsSlice {
  hapticsIntensity: HapticsIntensity;
  isAnimationsEnabled: boolean;
  setHapticsIntensity: (intensity: HapticsIntensity) => void;
  setIsAnimationsEnabled: (isAnimationsEnabled: boolean) => void;
}

export const createInteractionsSlice: StateCreator<
  InteractionsSlice,
  [],
  [],
  InteractionsSlice
> = (set, get) => ({
  hapticsIntensity: "max",
  isAnimationsEnabled: true,
  setHapticsIntensity: (intensity: HapticsIntensity) => set({ hapticsIntensity: intensity }),
  setIsAnimationsEnabled: (isAnimationsEnabled: boolean) => set({ isAnimationsEnabled: isAnimationsEnabled }),
});