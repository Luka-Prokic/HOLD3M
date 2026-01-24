import { Card, Hand } from "@/stores/game/types";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { WIDTH } from "@/utils/Dimensions";
import { getCardRankLetterFromRep } from "@/utils/getCardRank";
import { Ionicons } from "@expo/vector-icons";

interface MiniHandProps {
    hand: Hand;
    style?: ViewStyle | ViewStyle[];
    onCardPress?: (hand: Hand) => void;
}

export function MiniHand({ hand, onCardPress, style }: MiniHandProps) {
    const { theme } = useSettingsStore();

    const cardWidth = (WIDTH - 118) / 5;
    const cardHeight = cardWidth * 1.4;

    function handlePress() {
        onCardPress?.(hand);
    }


    return (<TouchableOpacity onPress={handlePress} style={[{
        flexDirection: "row",
        width: WIDTH,
        height: cardHeight,
        alignItems: "center",
        paddingHorizontal: 24,
        gap: 16
    },
        style
    ]}>
        {hand.cards.map((card: Card, index: number) =>
            <CardItem key={index} card={card} />
        )}
        <Text style={{ fontSize: 12, fontWeight: "bold", color: theme.text }}>{hand.rank.type.toUpperCase()}</Text>
    </TouchableOpacity>)
}

function CardItem({ card }: { card: Card }) {
    const { accentColor, tintColor } = useSettingsStore();
    const rankLabel = getCardRankLetterFromRep(card.repetition)


    const cardWidth = (WIDTH - 118) / 5;
    const cardHeight = cardWidth * 1.4;


    return <View
        style={{
            width: cardWidth,
            height: cardHeight,
            backgroundColor: accentColor,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderTopWidth: 0,
            borderLeftWidth: 0.2,
            borderRightWidth: 0.2,
            borderColor: tintColor,
            borderRadius: 8,
            shadowColor: accentColor,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 1,
            elevation: 2,
        }} >
        {rankLabel === "X" ?
            <Ionicons name="star" size={24} color={tintColor} />
            :
            <Text style={{ fontSize: 24, fontWeight: "bold", color: tintColor }}>{rankLabel}</Text>
        }
    </View>
}