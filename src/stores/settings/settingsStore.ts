import { create } from "zustand";
import { createInteractionsSlice, type InteractionsSlice } from "./slices/interactionsSlice";
import { createThemeSlice, type ThemeSlice } from "./slices/themeSlice";
import { createPrivacySlice, type PrivacySlice } from "./slices/privacySlice";
import { createDataSlice, type DataSlice } from "./slices/dataSlice";
import { createCardSlice, type CardSlice } from "./slices/cardSlice";

export type SettingsStore = InteractionsSlice & ThemeSlice & PrivacySlice & DataSlice & CardSlice;

export const useSettingsStore = create<SettingsStore>()((...a) => ({
    ...createInteractionsSlice(...a),
    ...createThemeSlice(...a),
    ...createPrivacySlice(...a),
    ...createDataSlice(...a),
    ...createCardSlice(...a),
}));
