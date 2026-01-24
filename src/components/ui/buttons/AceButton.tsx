import { useSettingsStore } from "@/stores/settings/settingsStore";
import { Text, ViewStyle, TextStyle, Pressable, PressableProps } from "react-native";

type ButtonThemeType = "theme" | "tint" | "accent" | "custom" | "default";

interface AceButtonProps extends PressableProps {
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
    ...pressableProps
}: AceButtonProps) {
    const bColor = getButtonColor(themeType, buttonColor);
    const tColor = getTextColor(themeType, textColor);

    return (
        <Pressable
            {...pressableProps}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={{
                height,
                width,
                minWidth: 64,
                backgroundColor: bColor,
                opacity: pressableProps.disabled ? 0.4 : 1,
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
        </Pressable>
    );
}

function getButtonColor(themeType: ButtonThemeType, customColor?: string) {
    const { theme, accentColor, tintColor } = useSettingsStore.getState();

    const colorMap: Record<ButtonThemeType, string | undefined> = {
        default: theme.darkSurface,
        theme: theme.surface,
        tint: tintColor,
        accent: accentColor,
        custom: customColor,
    };

    return colorMap[themeType];
}

function getTextColor(themeType: ButtonThemeType, customColor?: string) {
    const { theme, accentColor, tintColor } = useSettingsStore.getState();

    const colorMap: Record<ButtonThemeType, string | undefined> = {
        default: theme.lightSurface,
        theme: theme.textInverted,
        tint: accentColor,
        accent: tintColor,
        custom: customColor,
    };

    return colorMap[themeType];
}