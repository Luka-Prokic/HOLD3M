import { Text, Pressable } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { WIDTH } from "@/utils/Dimensions";

interface JesterPreviewCardProps {
    onPress: () => void;
}

export function JesterPreviewCard({ onPress }: JesterPreviewCardProps) {
    const { cardBackground, cardText } = useThemeStore();

    const cardWidth = WIDTH / 6;
    const cardHeight = cardWidth * 1.4;

    return (
        <Pressable style={{ width: cardWidth, height: cardHeight, backgroundColor: cardBackground, borderRadius: 8, padding: 4 }} onPress={onPress}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: cardText }}>J</Text>
        </Pressable>
    );
}