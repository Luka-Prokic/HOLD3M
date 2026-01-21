import { useThemeStore } from "@/stores/themeStore";
import { LinearGradient } from "expo-linear-gradient";
import { useBalletFont } from "@/utils/fonts/useBalletFont";
import { getPerfectGradientMiddleColor } from "@/utils/getPerfectGradientMiddleColor";
import Animated, { FadeIn } from "react-native-reanimated";
import { PremadeDiamondBackground } from "./PremadeDiamondBackground";

export function HandScreenBackground() {
    const { theme, tintColor, accentColor } = useThemeStore();
    const { fontFamily } = useBalletFont();
    const middleColor = getPerfectGradientMiddleColor();


    return (
        <Animated.View
            entering={FadeIn.duration(400).delay(400)}
            style={{
                flex: 1,
                position: "absolute", top: 0, left: 0, bottom: 0, right: 0,
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: theme.background,
            }}>
            <LinearGradient
                colors={[middleColor + "00", tintColor]}
                style={{
                    flex: 1,
                    position: "absolute", top: 0, left: 0, bottom: 0, right: 0,
                    justifyContent: "flex-end",
                    alignItems: "center"
                }} >
                <PremadeDiamondBackground />
                <Animated.Text entering={FadeIn.duration(400).delay(400)} style={{
                    fontFamily,
                    fontSize: 96,
                    color: accentColor,
                    textShadowColor: accentColor,
                    textShadowOffset: { width: 1, height: 0 },
                    textShadowRadius: 0,
                    paddingHorizontal: 32,
                }} >
                    Holdem
                </Animated.Text>
            </LinearGradient>
        </Animated.View>
    );
}