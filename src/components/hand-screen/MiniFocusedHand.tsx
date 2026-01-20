import { Card } from "@/stores/types";
import { useGameStore } from "@/stores/game/useGameStore"
import { Pressable, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { WIDTH } from "@/utils/Dimensions";
import { getCardRankLetterFromRep } from "@/utils/getCardRank";


export function MiniFocusedHand({ style }: { style?: ViewStyle | ViewStyle[] }) {
    const { currentHand } = useGameStore();

    const cardWidth = (WIDTH - 118) / 5;
    const cardHeight = cardWidth * 1.4;


    return (<View style={[{
        flexDirection: "row",
        width: WIDTH,
        height: cardHeight,
        alignItems: "center",
        paddingHorizontal: 24,
        gap: 16
    },
        style
    ]}>
        {currentHand.map((card, index) =>
            <CardItem key={index} card={card} index={index} />
        )}
    </View>)
}

function CardItem({ card, index }: { card: Card, index: number }) {
    const { accentColor, tintColor } = useThemeStore();
    const { heldCards, currentCardIndex, setCurrentCardIndex } = useGameStore();
    const rankLabel = getCardRankLetterFromRep(card.repetition)


    const cardWidth = (WIDTH - 118) / 5;
    const cardHeight = cardWidth * 1.4;

    const isHeld = heldCards.some((heldCard) => heldCard.id === card.id);
    const isCurrent = currentCardIndex === index;


    const colorOne = isHeld ? accentColor : tintColor;
    const colorTwo = isHeld ? tintColor : accentColor;

    return <TouchableOpacity
        onPress={() => setCurrentCardIndex(index)}
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
            borderRadius: 8,
        }} >
        <Text
            style={{
                fontSize: 24,
                fontWeight: "bold",
                color: colorTwo
            }}>
            {rankLabel}
        </Text>
    </TouchableOpacity>
}