import { useThemeStore } from "@/stores/themeStore";
import { hexToRGBA } from "@/utils/hexToRGBA";
import { LinearGradient } from "expo-linear-gradient";
import { Text, ViewStyle, TextStyle, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonThemeType = "theme" | "tint" | "accent" | "custom" | "default";

export interface QueenButtonProps extends TouchableOpacityProps {
    title?: string;
    buttonColor?: string;
    textColor?: string;
    gradientColor?: string;
    buttonStyle?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
    themeType?: ButtonThemeType;
    children?: React.ReactNode;
    circle?: boolean;
    height?: number;
    width?: number;
}

export function QueenButton({
    title,
    buttonColor = "#DBA8F7",
    textColor = "#000",
    gradientColor = "#DBA8F7",
    buttonStyle,
    textStyle,
    themeType = "default",
    children,
    circle = false,
    height = 54,
    width,
    ...touchableOpacityProps
}: QueenButtonProps) {
    const bColor = getButtonColor(themeType, buttonColor);
    const gColor = getGradientColor(themeType, gradientColor);
    const tColor = getTextColor(themeType, textColor);

    return (
        <TouchableOpacity
            {...touchableOpacityProps}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={[{
                backgroundColor: bColor,
                borderRadius: 27,
                borderWidth: 0.2,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: gColor,
                overflow: "hidden",
                width: width,
            },
                buttonStyle
            ]}>
            <LinearGradient
                colors={[gColor, gColor + "80", hexToRGBA(gColor as string, 0.8)]}
                locations={[0, 0.8, 1]}
                style={{
                    minHeight: height,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 16,
                }}>
                {children ? children : <Text style={[{ color: tColor, fontSize: 24, fontWeight: "600" }, textStyle]}>
                    {title}
                </Text>}
            </LinearGradient>
        </TouchableOpacity>
    );
}

function getButtonColor(themeType: ButtonThemeType, customColor?: string) {
    const { theme, accentColor, tintColor } = useThemeStore();

    const map: Record<ButtonThemeType, string | undefined> = {
        default: accentColor,
        theme: theme.surface,
        tint: accentColor,
        accent: tintColor,
        custom: customColor,
    };

    return map[themeType];
}

function getTextColor(themeType: ButtonThemeType, customColor?: string) {
    const { theme, accentColor, tintColor } = useThemeStore();

    const map: Record<ButtonThemeType, string | undefined> = {
        default: theme.darkSurface,
        theme: theme.textInverted,
        tint: accentColor,
        accent: tintColor,
        custom: customColor,
    };

    return map[themeType];
}

export function getGradientColor(
    themeType: ButtonThemeType,
    customColor: string
) {
    const { theme, accentColor, tintColor, themeName } = useThemeStore();

    const defaultGradient =
        themeName === "light"
            ? theme.textInverted
            : theme.lightSurface;

    const map: Record<ButtonThemeType, string> = {
        default: defaultGradient,
        theme: theme.textInverted,
        tint: tintColor,
        accent: accentColor,
        custom: customColor,
    };

    return map[themeType];
}