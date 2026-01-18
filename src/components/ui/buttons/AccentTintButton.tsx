import { useThemeStore } from "@/stores/themeStore";
import { Pressable, View, Text } from "react-native";
import { useBalletFont } from "@/utils/fonts/useBalletFont";

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
        <Pressable
            onPress={handlePress}
            style={{
                flexDirection: "row",
                paddingHorizontal: 16,
                height: 64,
                borderRadius: 32,
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: isSelected ? theme.select : tintColor,
                marginHorizontal: 16,
            }}>
            <Text style={{
                fontFamily,
                color: isSelected ? theme.darkSurface : accentColor,
                fontSize: 36,
                paddingHorizontal: 8,
                textShadowColor: theme.darkSurface,
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 0
            }}>
                {title}
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
                <View style={{ backgroundColor: tint, height: 48, width: 48, borderRadius: 24 }} />
                <View style={{ backgroundColor: accent, height: 48, width: 48, borderRadius: 24 }} />
            </View>
        </Pressable >
    );
}