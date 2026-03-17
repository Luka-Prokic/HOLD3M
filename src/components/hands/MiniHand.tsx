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

    const isHeld = heldCards.some((heldCard) => heldCard.id === card.id);
    const isCurrent = selectedCardIndex === index;


    const colorOne = isHeld ? cardColors.text : cardColors.background;
    const colorTwo = isHeld ? cardColors.background : cardColors.text;

    return (
        <TouchableOpacity
            onPress={() => setSelectedCardIndex?.(index)}
            style={{
                width: cardWidth,
                height: cardWidth,
                justifyContent: "center",
                alignItems: "center",
                opacity: isCurrent ? 1 : 0.6,
            }} >
            <>
                <Ionicons name="star" size={44} color={colorOne} style={{ position: "absolute" }} />
                <Ionicons name="star" size={24} color={colorTwo} style={{ position: "absolute" }} />
            </>
            :
            <>
                <Text style={{ fontSize: 44, fontWeight: "900", color: colorOne, position: "absolute", transform: [{ scale: 1.1 }] }}>{rankLabel}</Text>
                <Text style={{ fontSize: 44, fontWeight: "700", color: colorTwo, position: "absolute" }}>{rankLabel}</Text>
            </>
        </TouchableOpacity>)
}