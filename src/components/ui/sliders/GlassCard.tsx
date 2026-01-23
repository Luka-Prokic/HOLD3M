import { LinearGradient } from "expo-linear-gradient";
import { ViewStyle } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { hexToRGBA } from "@/utils/hexToRGBA";
import { BlurView } from "expo-blur";

interface GlassCardProps {
    children: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
    horizontal?: boolean;
}
export function GlassCard({ children, style, horizontal = false }: GlassCardProps) {
    const { theme, themeName, tintColor, accentColor } = useThemeStore();

    const glassTintColor = themeName === "light" ? accentColor : tintColor;

    return (
        <BlurView
            intensity={8}
            style={[{
                width: "100%",
                aspectRatio: horizontal ? 7 / 5 : 5 / 7,
                borderRadius: 27,
                padding: 16,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: hexToRGBA(glassTintColor as string, 0.2),
                borderWidth: 0.2,
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderColor: theme.lightSurface,
                overflow: "hidden",
            }, style]}>
            {children}
            <LinearGradient
                colors={[theme.lightSurface, theme.lightSurface + "80", hexToRGBA(theme.lightSurface as string, 0.8)]}
                locations={[0, 0.8, 1]}
                style={{
                    flex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.2,
                }}
            />
        </BlurView>
    )
}