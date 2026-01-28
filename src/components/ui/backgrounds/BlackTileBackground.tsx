import { useSettingsStore } from "@/stores/settings/settingsStore";
import Animated, { FadeIn } from "react-native-reanimated";
import { PremadeDiamondBackground } from "./PremadeDiamondBackground";


export function BlackTileBackground() {
    const { theme, isAnimationsEnabled } = useSettingsStore();

    return (
        <Animated.View
            entering={isAnimationsEnabled ? FadeIn.duration(400).delay(400) : undefined}
            style={{
                flex: 1,
                position: "absolute", top: 0, left: 0, bottom: 0, right: 0,
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: theme.darkSurface,
            }}>
            <PremadeDiamondBackground color={theme.lightSurface + "10"} />
        </Animated.View>
    );
}