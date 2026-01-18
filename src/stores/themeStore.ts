import Colors from "@/constants/Colors";
import { create } from "zustand";

export type Theme = "light" | "dark";

interface ThemeStore {
  themeName: Theme;
  theme: (typeof Colors)[Theme];
  accentColor: string;
  tintColor: string;
  cardBackground: string;
  cardText: string;

  setTheme: (theme: Theme) => void;
  setAccentColor: (color: string) => void;
  setTintColor: (color: string) => void;
  setCardBackground: (color: string) => void;
  setCardText: (color: string) => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  themeName: "light",
  theme: Colors["light"],
  accentColor: "#7A3E2A",
  tintColor: "#FF8A78",
  cardBackground: "#F1EFEA",
  cardText: "#000000",

  setTheme: (theme: Theme) => set({ themeName: theme, theme: Colors[theme] }),
  setAccentColor: (color: string) => set({ accentColor: color }),
  setTintColor: (color: string) => set({ tintColor: color }),
  setCardBackground: (color: string) => set({ cardBackground: color }),
  setCardText: (color: string) => set({ cardText: color }),
}));
