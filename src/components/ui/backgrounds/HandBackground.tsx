import { useThemeStore } from "@/stores/themeStore";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import { useBalletFont } from "@/utils/fonts/useBalletFont";

export function HandBackground() {
    const { theme, tintColor, accentColor } = useThemeStore();
    const { fontFamily } = useBalletFont();
    return (
        <LinearGradient
            colors={[theme.background, tintColor]}
            style={{
                flex: 1,
                position: "absolute", top: 0, left: 0, bottom: 0, right: 0,
                justifyContent: "flex-end",
                alignItems: "center"
            }} >
            <Text style={{
                fontFamily,
                fontSize: 96,
                color: accentColor,
                textShadowColor: theme.darkSurface,
                textShadowOffset: { width: 1, height: 0 },
                textShadowRadius: 0,
                paddingHorizontal: 32,
            }} >
                Holdem
            </Text>
        </LinearGradient>

    );
}