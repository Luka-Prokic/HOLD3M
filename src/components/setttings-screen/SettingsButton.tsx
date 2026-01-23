import { View, Text } from "react-native";
import { QueenButton } from "../ui/buttons/QueenButton";
import { useThemeStore } from "@/stores/themeStore";
import { Ionicons } from "@expo/vector-icons";


interface SettingsButtonProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    description?: string;
    onPress: () => void;
}

export function SettingsButton({ icon, title, description, onPress }: SettingsButtonProps) {
    const { theme } = useThemeStore();
    return (
        <QueenButton onPress={onPress}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, gap: 16 }}>
                <Ionicons name={icon} size={32} color={theme.darkSurface} />
                <View style={{ gap: 4, flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 24, fontWeight: "600", color: theme.darkSurface, textAlign: "center" }}>{title}</Text>
                    {description && <Text style={{ fontSize: 12, fontWeight: "600", color: theme.textGrey, textAlign: "center" }}>{description}</Text>}
                </View>
                <Ionicons name="chevron-forward" size={32} color={theme.darkSurface} />
            </View>
        </QueenButton>
    );
}