import { create } from "zustand";
import { createInteractionsSlice, type InteractionsSlice } from "./slices/interactionsSlice";
import { createThemeSlice, type ThemeSlice } from "./slices/themeSlice";
import { createPrivacySlice, type PrivacySlice } from "./slices/privacySlice";

export type SettingsStore = InteractionsSlice & ThemeSlice & PrivacySlice;

export const useSettingsStore = create<SettingsStore>()((...a) => ({
    ...createInteractionsSlice(...a),
    ...createThemeSlice(...a),
    ...createPrivacySlice(...a),
}));
