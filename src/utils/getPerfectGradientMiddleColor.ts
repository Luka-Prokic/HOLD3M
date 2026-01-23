import { useThemeStore } from "@/stores/themeStore";
import { hexToRGBA } from "./hexToRGBA";

const DARK_VERSION_MAP: Record<string, string> = {
    "#FF8A78": "#5A291F",
    "#B7AEFF": "#372F63",
    "#8C867C": "#574D3E",
    "#8CB24A": "#007F59",
};

export function getPerfectGradientMiddleColor() {
    const { themeName, tintColor } = useThemeStore();

    const tintDoesntMatch = DARK_VERSION_MAP[tintColor] === undefined;
    if (tintDoesntMatch) return hexToRGBA(tintColor, 0.5);

    const lightVersion = hexToRGBA(tintColor, 0.5);
    const darkVersion = hexToRGBA(DARK_VERSION_MAP[tintColor], 0.4);


    if (themeName === "light") return lightVersion;
    return darkVersion;
}