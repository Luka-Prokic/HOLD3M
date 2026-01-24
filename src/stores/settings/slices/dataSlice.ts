import type { StateCreator } from "zustand";

export interface DataSlice {
  resetAllData: () => void;
}

export const createDataSlice: StateCreator<
  DataSlice,
  [],
  [],
  DataSlice
> = (set, get) => ({
  resetAllData: () => { },
});
