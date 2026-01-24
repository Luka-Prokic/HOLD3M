import { useSettingsStore } from "@/stores/settings/settingsStore";
import { LinearGradient } from "expo-linear-gradient";
import { getPerfectGradientMiddleColor } from "@/utils/getPerfectGradientMiddleColor";
import { PremadeDiamondBackground } from "./PremadeDiamondBackground";


export function HomeScreenBackground() {
    const { theme, tintColor } = useSettingsStore();
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
            <PremadeDiamondBackground />
        </LinearGradient>

    );
}