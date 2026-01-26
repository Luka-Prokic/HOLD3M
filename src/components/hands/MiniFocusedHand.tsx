import { Card } from "@/stores/game/types";
import { useGameStore } from "@/stores/game/gameStore"
import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { WIDTH } from "@/utils/Dimensions";
import { getCardRankLetterFromRep } from "@/utils/getCardRank";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";


export function MiniFocusedHand({ style }: { style?: ViewStyle | ViewStyle[] }) {
    const { currentHand } = useGameStore();
    const { isAnimationsEnabled } = useSettingsStore();

    const cardWidth = (WIDTH - 118) / 5;
    const cardHeight = cardWidth * 1.4;


    return (
        <Animated.View
            entering={isAnimationsEnabled ? FadeIn.duration(300).delay(800) : undefined}
            style={[{
                flexDirection: "row",
                width: WIDTH,
                height: cardHeight,
                alignItems: "center",
                paddingHorizontal: 24,
                gap: 16
            },
                style
            ]}>
            {currentHand.map((card: Card, index: number) =>
                <CardItem key={index} card={card} index={index} />
            )}
        </Animated.View>)
}

function CardItem({ card, index }: { card: Card, index: number }) {
    const { accentColor, tintColor } = useSettingsStore();
    const { heldCards, currentCardIndex, setCurrentCardIndex } = useGameStore();
    const rankLabel = getCardRankLetterFromRep(card.repetition)


    const cardWidth = (WIDTH - 118) / 5;
    const cardHeight = cardWidth * 1.4;

    const isHeld = heldCards.some((heldCard) => heldCard.id === card.id);
    const isCurrent = currentCardIndex === index;


    const colorOne = isHeld ? accentColor : tintColor;
    const colorTwo = isHeld ? tintColor : accentColor;

    return (
        <TouchableOpacity
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