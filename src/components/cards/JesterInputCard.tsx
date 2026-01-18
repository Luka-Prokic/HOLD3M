import { useThemeStore } from "@/stores/themeStore";
import { View, Text } from "react-native";

export function JesterInputCard() {
    const { accentColor, tintColor } = useThemeStore();

    return (
        <View style={{ width: 64, height: 64, backgroundColor: tintColor }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: accentColor }}>J</Text>
        </View>
    );
}