import { useThemeStore } from "@/stores/themeStore";
import { LinearGradient } from "expo-linear-gradient";
import { useBalletFont } from "@/utils/fonts/useBalletFont";
import { BlurView } from "expo-blur";
import Animated, { FadeIn } from "react-native-reanimated";
import { hexToRGBA } from "@/utils/hexToRGBA";

export function CardScreenBackground() {
    const { theme, tintColor } = useThemeStore();
    const { fontFamily } = useBalletFont();
    return (
        <BlurView intensity={32} style={{
            flex: 1, position: "absolute", top: 0, left: 0, bottom: 0, right: 0, justifyContent: "flex-end",
            alignItems: "center"
        }}>
            <Animated.Text entering={FadeIn.duration(600).delay(400)} style={{
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
                colors={[theme.background + "00", hexToRGBA(tintColor, 0.6)]}
                style={{
                    flex: 1,
                    position: "absolute", top: 0, left: 0, bottom: 0, right: 0,
                }} />

        </BlurView>

    );
}