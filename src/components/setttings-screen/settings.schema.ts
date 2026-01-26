import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface SettingsSchema {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    description?: string;
    onPress: () => void;
}

export const SETTINGS_SCHEMA: SettingsSchema[] = [
    {
        icon: "dice-outline",
        title: "Game Rules",
        onPress: () => {
            router.push("/settings/game-rules");
        },
    },
    {
        icon: "save-outline",
        title: "Data & Privacy",
        description: "All your data stays offline, but you can export or reset it anytime.",
        onPress: () => {
            router.push("/settings/data-and-privacy");
        },
    },
    {
        icon: "accessibility-outline",
        title: "Interactions",
        onPress: () => {
            router.push("/settings/interactions");
        },
    },
    {
        icon: "color-palette-outline",
        title: "Card Style",
        onPress: () => {
            router.push("/settings/card-style/color");
        },
    },
    {
        icon: "color-filter-outline",
        title: "App Appearance",
        onPress: () => {
            router.push("/settings/app-appearance");
        },
    },
];