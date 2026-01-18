import { Text, Pressable } from "react-native";
import { useThemeStore } from "@/stores/themeStore";

interface JesterPreviewCardProps {
    onPress: () => void;
}

export function JesterPreviewCard({ onPress }: JesterPreviewCardProps) {
    const { accentColor, tintColor } = useThemeStore();

    return (
        <Pressable style={{ width: 64, height: 64, backgroundColor: tintColor }} onPress={onPress}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: accentColor }}>J</Text>
        </Pressable>
    );
}