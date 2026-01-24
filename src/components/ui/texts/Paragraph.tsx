import { View, Text, ViewStyle } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { Ionicons } from "@expo/vector-icons";

export interface ParagraphProps {
    icon?: keyof typeof Ionicons.glyphMap;
    title?: string;
    description?: string;
    style?: ViewStyle | ViewStyle[];
}

export function Paragraph({ icon, title, description, style }: ParagraphProps) {
    const { theme } = useSettingsStore();

    return (
        <View style={[{ gap: 8 }, style]}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                {icon && <Ionicons name={icon} size={32} color={theme.text} />}
                {title && <Text style={{ fontSize: 20, fontWeight: "800", color: theme.text }}>{title}</Text>}
            </View>
            {description && <Text style={{ fontSize: 18, fontWeight: "600", color: theme.text }}>{description}</Text>}
        </View>
    )
}