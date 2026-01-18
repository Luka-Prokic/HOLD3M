import { useThemeStore } from "@/store/themeStore";
import { Pressable, Text, ViewStyle, TextStyle, PressableProps } from "react-native";
import { useState } from "react";

export type ToggleThemeType = "theme" | "tint" | "custom";

interface AceToggleProps extends PressableProps {
    title: string;
    buttonColor?: string;
    textColor?: string;
    toggledButtonColor?: string;
    toggledTextColor?: string;
    buttonStyle?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
    themeType?: ToggleThemeType;
    toggled?: boolean;
    onPress?: () => void;
}

export function AceToggle({
    title,
    buttonColor = "#DBA8F7",
    textColor = "#000",
    toggledButtonColor = "#DBA8F7",
    toggledTextColor = "#000",
    buttonStyle,
    textStyle,
    disabled = false,
    themeType = "theme",
    toggled = false,
    onPress,
    ...pressableProps
}: AceToggleProps) {
    const [isToggled, setIsToggled] = useState(toggled);

    const bColor = getToggleColor(themeType, buttonColor, toggledButtonColor, isToggled);
    const tColor = getTextColor(themeType, textColor, toggledTextColor, isToggled);

    function handlePress() {
        setIsToggled(!isToggled);
        onPress?.();
    }

    return (
        <Pressable
            {...pressableProps}
            onPress={handlePress}
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
            <Text style={{ color: tColor, fontSize: 24, fontWeight: "600", ...textStyle }}>
                {title}
            </Text>
        </Pressable>
    );
}


function getToggleColor(themeType: ToggleThemeType, customColor?: string, toggledCustomColor?: string, isToggled?: boolean) {
    const { theme, accentColor } = useThemeStore();
    if (isToggled) {
        switch (themeType) {
            case "theme":
                return theme.surfaceSecondary;
            case "tint":
                return accentColor;
            case "custom":
                return toggledCustomColor;
        }
    }
    switch (themeType) {
        case "theme":
            return theme.surface;
        case "tint":
            return theme.surfaceSecondary;
        case "custom":
            return customColor;
    }
}

function getTextColor(themeType: ToggleThemeType, customColor?: string, toggledCustomColor?: string, isToggled?: boolean) {
    const { theme, tintColor } = useThemeStore();


    if (isToggled) {
        switch (themeType) {
            case "theme":
                return theme.text;
            case "tint":
                return tintColor;
            case "custom":
                return toggledCustomColor;
        }
    }

    switch (themeType) {
        case "theme":
            return theme.textInverted;
        case "tint":
            return theme.text;
        case "custom":
            return customColor;
    }
}