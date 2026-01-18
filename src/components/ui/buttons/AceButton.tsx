import { useThemeStore } from "@/stores/themeStore";
import { Pressable, Text, ViewStyle, TextStyle, PressableProps } from "react-native";

export type ButtonThemeType = "theme" | "tint" | "accent" | "custom";

interface AceButtonProps extends PressableProps {
    title: string;
    buttonColor?: string;
    textColor?: string;
    buttonStyle?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
    themeType?: ButtonThemeType;
    children?: React.ReactNode;
}

export function AceButton({
    title,
    buttonColor = "#DBA8F7",
    textColor = "#000",
    buttonStyle,
    textStyle,
    disabled = false,
    themeType = "theme",
    children,
    ...pressableProps
}: AceButtonProps) {
    const bColor = getButtonColor(themeType, buttonColor);
    const tColor = getTextColor(themeType, textColor);

    return (
        <Pressable
            {...pressableProps}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={{
                height: 64,
                minWidth: 64,
                backgroundColor: bColor,
                opacity: disabled ? 0.4 : 1,
                paddingHorizontal: 16,
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
        </Pressable>
    );
}


function getButtonColor(themeType: ButtonThemeType, customColor?: string) {
    const { theme, accentColor, tintColor } = useThemeStore();
    switch (themeType) {
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