import Colors from "@/constants/Colors";
import { create } from "zustand";

export type Theme = "light" | "dark";

interface ThemeStore {
  themeName: Theme;
  theme: (typeof Colors)[Theme];

  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  themeName: "light",
  theme: Colors["light"],

  toggleTheme: () =>
    set((state) => ({
      themeName: state.themeName === "light" ? "dark" : "light",
      theme: state.themeName === "light" ? Colors["dark"] : Colors["light"],
    })),
}));
