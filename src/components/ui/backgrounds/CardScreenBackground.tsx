import { useSettingsStore } from "@/stores/settings/settingsStore";
import { LinearGradient } from "expo-linear-gradient";
import { useBalletFont } from "@/utils/fonts/useBalletFont";
import Animated, { FadeIn } from "react-native-reanimated";
import { getPerfectGradientMiddleColor } from "@/utils/getPerfectGradientMiddleColor";

export function CardScreenBackground() {
    const { theme, tintColor, isAnimationsEnabled } = useSettingsStore();
    const { fontFamily } = useBalletFont();
    const middleColor = getPerfectGradientMiddleColor();

    return (
        <Animated.View
            entering={isAnimationsEnabled ? FadeIn.duration(400).delay(400) : FadeIn.duration(0)}
            style={{
                flex: 1,
                position: "absolute", top: 0, left: 0, bottom: 0, right: 0,
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: theme.background,
            }}>
            <Animated.Text
                entering={isAnimationsEnabled ? FadeIn.duration(400).delay(400) : FadeIn.duration(0)}
                style={{
                    fontFamily,
                    fontSize: 96,
                    color: theme.text,
                    textShadowColor: theme.text,
                    textShadowOffset: { width: 1, height: 0 },
                    textShadowRadius: 0,
                    paddingHorizontal: 32,
                }} >
                Holdem
            </Animated.Text>
            <LinearGradient
                colors={[theme.background + "00", middleColor, tintColor]}
                style={{
                    flex: 1,
                    position: "absolute", top: 0, left: 0, bottom: 0, right: 0,
                }} />
        </Animated.View>
    );
}