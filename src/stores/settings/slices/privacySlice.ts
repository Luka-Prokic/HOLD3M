import type { StateCreator } from "zustand";

export interface PrivacySlice {
  useNotifications: boolean;
  useIncognitoMode: boolean;
  setUseNotifications: (useNotifications: boolean) => void;
  setUseIncognitoMode: (useIncognitoMode: boolean) => void;
}

export const createPrivacySlice: StateCreator<
  PrivacySlice,
  [],
  [],
  PrivacySlice
> = (set, get) => ({
  useNotifications: true,
  useIncognitoMode: false,
  setUseNotifications: (useNotifications: boolean) => set({ useNotifications: useNotifications }),
  setUseIncognitoMode: (useIncognitoMode: boolean) => set({ useIncognitoMode: useIncognitoMode }),
});
