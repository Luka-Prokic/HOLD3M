import { useThemeStore } from "@/stores/themeStore";
import { View, Text } from "react-native";
import { useBalletFont } from "@/utils/fonts/useBalletFont";
import { AceButton } from "./AceButton";

interface AccentTintButtonProps {
    title: string;
    tint: string;
    accent: string;
}

export function AccentTintButton({ title, tint, accent }: AccentTintButtonProps) {
    const { theme, accentColor, tintColor, setAccentColor, setTintColor } = useThemeStore();
    const { fontFamily } = useBalletFont();


    const isSelected = accentColor === accent && tintColor === tint;

    function handlePress() {
        setAccentColor(accent);
        setTintColor(tint);
    }

    return (
        <AceButton
            title={title}
            onPress={handlePress}
            buttonStyle={{ paddingHorizontal: 0 }}
        >
            <View style={{
                width: "100%",
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: isSelected ? theme.select + "80" : theme.lightSurface + "40",
                paddingHorizontal: 8,
                borderRadius: 32,
            }}>
                <Text style={{
                    fontFamily,
                    color: theme.lightSurface,
                    fontSize: 36,
                    paddingHorizontal: 8,
                    textShadowColor: theme.lightSurface,
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 0
                }}>
                    {title}
                </Text>
                <View style={{ flexDirection: "row", gap: 8 }}>
                    <View style={{ backgroundColor: tint, height: 48, width: 48, borderRadius: 24 }} />
                    <View style={{ backgroundColor: accent, height: 48, width: 48, borderRadius: 24 }} />
                </View>
            </View>
        </AceButton >
    );
}