import { useThemeStore } from "@/stores/themeStore";
import { Text, ViewStyle, TextStyle, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonThemeType = "theme" | "tint" | "accent" | "custom" | "default";

interface AceButtonProps extends TouchableOpacityProps {
    title?: string;
    buttonColor?: string;
    textColor?: string;
    buttonStyle?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
    themeType?: ButtonThemeType;
    children?: React.ReactNode;
    circle?: boolean;
    width?: number;
    height?: number;
}

export function AceButton({
    title,
    buttonColor = "#DBA8F7",
    textColor = "#000",
    buttonStyle,
    textStyle,
    themeType = "default",
    children,
    circle = false,
    width = 64,
    height = 64,
    ...touchableOpacityProps
}: AceButtonProps) {
    const bColor = getButtonColor(themeType, buttonColor);
    const tColor = getTextColor(themeType, textColor);

    return (
        <TouchableOpacity
            {...touchableOpacityProps}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={{
                height,
                width,
                minWidth: 64,
                backgroundColor: bColor,
                opacity: touchableOpacityProps.disabled ? 0.4 : 1,
                paddingHorizontal: circle ? 0 : 24,
                borderRadius: 32,
                alignItems: "center",
                justifyContent: "center",
                ...buttonStyle,
            }}
        >
            {children ? children : <Text style={{ color: tColor, fontSize: 24, fontWeight: "600", ...textStyle }}>
                {title}
            </Text>
            }
        </TouchableOpacity>
    );
}


function getButtonColor(themeType: ButtonThemeType, customColor?: string) {
    const { theme, accentColor, tintColor } = useThemeStore();
    switch (themeType) {
        case "default":
            return theme.darkSurface;
        case "theme":
            return theme.surface;
        case "tint":
            return tintColor;
        case "accent":
            return accentColor;
        case "custom":
            return customColor;
    }
}

function getTextColor(themeType: ButtonThemeType, customColor?: string) {
    const { theme, accentColor, tintColor } = useThemeStore();

    switch (themeType) {
        case "default":
            return theme.lightSurface;
        case "theme":
            return theme.textInverted;
        case "tint":
            return accentColor;
        case "accent":
            return tintColor;
        case "custom":
            return customColor;
    }
}