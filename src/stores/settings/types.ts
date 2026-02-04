
export type Theme = "light" | "dark";

export type HapticsIntensity = "off" | "gentle" | "max";

export type CardTextSize = 12 | 18 | 24 | 32;

export type CardTextWeight = "200" | "400" | "600" | "800";

export type CardTextFamily = "sans-serif" | "serif" | "monospace";

export interface CardColors {
    text: string;
    background: string;
};

export interface CardText {
    size: CardTextSize;
    weight: CardTextWeight;
    family: CardTextFamily;
};

export interface CardDeck {
    name: string;
    icon: string;
    colors: string[];
}