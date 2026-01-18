import { useThemeStore } from "@/stores/themeStore";
import { Card } from "@/stores/types";
import { getCardRank } from "@/utils/getCardRank";
import { View, Text } from "react-native";


interface InputCardProps {
    card: Card;
}

export function InputCard({ card }: InputCardProps) {
    const { accentColor, tintColor } = useThemeStore();
    const rank = getCardRank(card.repetition);

    return (
        <View style={{ width: 64, height: 64, backgroundColor: tintColor }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: accentColor }}>{rank}</Text>
        </View>
    );
}