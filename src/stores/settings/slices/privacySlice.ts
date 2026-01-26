import type { StateCreator } from "zustand";

export interface PrivacySlice {
  isNotificationsEnabled: boolean;
  isIncognitoModeEnabled: boolean;
  setIsNotificationsEnabled: (isNotificationsEnabled: boolean) => void;
  setIsIncognitoModeEnabled: (isIncognitoModeEnabled: boolean) => void;
}

export const createPrivacySlice: StateCreator<
  PrivacySlice,
  [],
  [],
  PrivacySlice
> = (set, get) => ({
  isNotificationsEnabled: true,
  isIncognitoModeEnabled: false,
  setIsNotificationsEnabled: (isNotificationsEnabled: boolean) => {
    set({ isNotificationsEnabled: isNotificationsEnabled });
    if (!isNotificationsEnabled) {
      set({ isIncognitoModeEnabled: false });
    }
  },
  setIsIncognitoModeEnabled: (isIncognitoModeEnabled: boolean) => set({ isIncognitoModeEnabled: isIncognitoModeEnabled }),
});
