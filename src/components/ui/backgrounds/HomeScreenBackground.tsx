import { useThemeStore } from "@/stores/themeStore";
import { LinearGradient } from "expo-linear-gradient";
import { getPerfectGradientMiddleColor } from "@/utils/getPerfectGradientMiddleColor";


export function HomeScreenBackground() {
    const { theme, tintColor } = useThemeStore();
    const middleColor = getPerfectGradientMiddleColor();

    return (
        <LinearGradient
            colors={[tintColor, middleColor, theme.background + "00"]}
            style={{
                flex: 1,
                position: "absolute", top: 0, left: 0, bottom: 0, right: 0,
                justifyContent: "flex-end",
                alignItems: "center"
            }} >
        </LinearGradient>

    );
}