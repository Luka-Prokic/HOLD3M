import type { Card, Hand } from "@/stores/game/types";
import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { WIDTH } from "@/utils/Dimensions";
import { getCardRankLetterFromRep } from "@/utils/getCardRank";
import { Ionicons } from "@expo/vector-icons";
import { useGameStore } from "@/stores/game/gameStore";
import { View } from "react-native";

interface MiniHandProps {
    hand: Hand;
    style?: ViewStyle | ViewStyle[];
    selectedCardIndex?: number;
    setSelectedCardIndex?: (index: number) => void;
}

export function MiniHand({ hand, style, selectedCardIndex, setSelectedCardIndex }: MiniHandProps) {
    const cardWidth = (WIDTH - 118) / 5;
    const cardHeight = cardWidth * 1.4;


    return (
        <View
            style={[{
                flexDirection: "row",
                width: WIDTH,
                height: cardHeight,
                alignItems: "center",
                paddingHorizontal: 24,
                marginTop: 16,
                gap: 16
            },
                style
            ]}>
            {hand.cards.map((card: Card, index: number) =>
                <CardItem key={index} card={card} index={index} selectedCardIndex={selectedCardIndex} setSelectedCardIndex={setSelectedCardIndex} />
            )}
        </View>)
}

interface CardItemProps {
    card: Card;
    index: number;
    selectedCardIndex?: number;
    setSelectedCardIndex?: (index: number) => void;
}

function CardItem({ card, index, selectedCardIndex, setSelectedCardIndex }: CardItemProps) {
    const { cardColors } = useSettingsStore();
    const { heldCards } = useGameStore();
    const rankLabel = getCardRankLetterFromRep(card.repetition)


    const cardWidth = (WIDTH - 118) / 5;
    const cardHeight = cardWidth * 1.4;

    const isHeld = heldCards.some((heldCard) => heldCard.id === card.id);
    const isCurrent = selectedCardIndex === index;


    const colorOne = isHeld ? cardColors.text : cardColors.background;
    const colorTwo = isHeld ? cardColors.background : cardColors.text;

    return (
        <TouchableOpacity
            onPress={() => setSelectedCardIndex?.(index)}
            style={{
                width: cardWidth,
                height: cardHeight,
                backgroundColor: colorOne,
                justifyContent: "center",
                alignItems: "center",
                opacity: isCurrent ? 1 : 0.4,
                borderWidth: 2,
                borderTopWidth: 0,
                borderLeftWidth: 0.2,
                borderRightWidth: 0.2,
                borderColor: colorTwo,
                borderRadius: 12,
                shadowColor: colorOne,
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: isCurrent ? 0.8 : 0.4,
                shadowRadius: 1,
                elevation: 2,
            }} >
            {rankLabel === "X" ?
                <Ionicons name="star" size={24} color={colorTwo} />
                :
                <Text style={{ fontSize: 24, fontWeight: "bold", color: colorTwo }}>{rankLabel}</Text>
            }
        </TouchableOpacity>)
}