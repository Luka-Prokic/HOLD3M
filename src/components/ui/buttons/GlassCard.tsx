import { LinearGradient } from "expo-linear-gradient";
import { ViewStyle } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { hexToRGBA } from "@/utils/hexToRGBA";
import { BlurView } from "expo-blur";

interface GlassCardProps {
    children: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
    width?: number;
    height?: number;
}
export function GlassCard({ children, style, width, height }: GlassCardProps) {
    const { theme, themeName, tintColor, accentColor } = useThemeStore();

    const glassTintColor = themeName === "light" ? accentColor : tintColor;

    return (
        <BlurView
            intensity={8}
            style={[{
                width: width || "100%",
                height: height || "auto",
                flex: 1,
                padding: 16,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: hexToRGBA(glassTintColor as string, 0.1),
                borderWidth: 1,
                borderTopColor: theme.lightSurface,
                borderBottomColor: theme.lightSurface,
                borderLeftColor: theme.lightSurface + "20",
                borderRightColor: theme.lightSurface + "20",
                borderRadius: 27,
                overflow: "hidden",
                borderCurve: "continuous",
                zIndex: 1,
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
                    opacity: 0.1,
                    zIndex: -1,
                }}
            />
        </BlurView>
    )
}