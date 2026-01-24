import { Ionicons } from "@expo/vector-icons";

export interface Interaction {
    icon?: keyof typeof Ionicons.glyphMap;
    title: string;
    description: string;
}

export const INTERACTIONS_SCHEMA: Interaction[] = [
    {
        icon: "radio-outline",
        title: "Haptics Intensity",
        description: "Adjust how strong the vibration feedback feels when interacting with the app.",
    },
    {
        title: "Animations",
        description: "Reduce motion effects for a calmer, more focused experience.",

    },
];