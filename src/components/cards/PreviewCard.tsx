import { Text, Pressable } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { Card } from "@/stores/types";
import { getCardRank } from "@/utils/getCardRank";

interface PreviewCardProps {
    card: Card;
    onPress: () => void;
}

export function PreviewCard({ card, onPress }: PreviewCardProps) {
    const { accentColor, tintColor } = useThemeStore();
    const rank = getCardRank(card.repetition);

    return (
        <Pressable style={{ width: 64, height: 64, backgroundColor: tintColor }} onPress={onPress}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: accentColor }}>{rank}</Text>
        </Pressable>
    );
}