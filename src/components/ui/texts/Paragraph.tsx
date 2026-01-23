import { View, Text, ViewStyle } from "react-native";
import { useThemeStore } from "@/stores/themeStore";



interface ParagraphProps {
    icon: React.ReactNode;
    title: string;
    text: string;
    style?: ViewStyle | ViewStyle[];
}

export function Paragraph({ icon, title, text, style }: ParagraphProps) {
    const { theme } = useThemeStore();

    return (
        <View style={[{ gap: 8 }, style]}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                {icon}
                <Text style={{ fontSize: 24, fontWeight: "800", color: theme.text }}>{title}</Text>

            </View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: theme.text }}>{text}</Text>
        </View>
    )
}