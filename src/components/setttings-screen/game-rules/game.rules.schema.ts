import { Ionicons } from "@expo/vector-icons";

export interface GameRule {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    description: string;
}

export const GAME_RULES_SCHEMA: GameRule[] = [
    {
        icon: "sparkles-outline",
        title: "Daily Hand - Round",
        description: "Each day, you start with a hand of 5 habits (cards). Your goal is to “hold” these habits to level them up.",
    },
    {
        icon: "sad-outline",
        title: "Holding Habits",
        description: "Complete habits to move them up in rank (2 → Ace). Keep habits consistent to build stronger hands.",

    },
    {
        icon: "flame-outline",
        title: "Burning Cards",
        description: "Burn habits to replace them with new ones and explore new combinations.",
    },
    {
        icon: "ribbon-outline",
        title: "Hands & Ranks",
        description: "Each combination of your held habits forms a poker-style hand, from High Card to Royal Flush.",
    },
    {
        icon: "bulb-outline",
        title: "Luck & Strategy",
        description: "Occasionally, suits align for rare hands. You can freely choose which habits to hold or burn.",
    },
    {
        icon: "hourglass-outline",
        title: "End of Round",
        description: "Your daily hand resets at the time you select on the wheel.",
    },
];