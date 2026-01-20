import { useThemeStore } from "@/stores/themeStore";
import { hexToRGBA } from "./hexToRGBA";

const DARK_VERSION_MAP: Record<string, string> = {
    "#FF8A78": "#5A291F",
    "#B7AEFF": "#372F63",
    "#8C867C": "#574D3E",
};

export function getPerfectGradientMiddleColor() {
    const { themeName, tintColor } = useThemeStore();

    const lightVersion = hexToRGBA(tintColor, 0.5);
    const darkVersion = hexToRGBA(DARK_VERSION_MAP[tintColor], 0.4);


    if (themeName === "light") return lightVersion;
    return darkVersion;


}