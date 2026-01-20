import { Card } from "@/stores/types";
import { useGameStore } from "@/stores/game/useGameStore"
import { Text, View } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { WIDTH } from "@/utils/Dimensions";


export function MiniFocusedHand() {
    const { currentHand } = useGameStore();

    const cardWidth = (WIDTH - 144) / 5;
    const cardHeight = cardWidth * 1.4;

    // Always render 5 cards, fill with jesters if needed
    const cardsToShow = [...currentHand];
    while (cardsToShow.length < 5) {
        cardsToShow.push({ id: "jester", repetition: 0, suit: "hearts" } as Card); // undefined will render jester
    }

    return (<View style={{
        flexDirection: "row",
        width: WIDTH,
        height: cardHeight,
        alignItems: "center",
        paddingHorizontal: 24,
        gap: 24
    }}>
        {cardsToShow.map((card, index) =>
            <CardItem key={index} card={card} index={index} />
        )}
    </View>)
}

function CardItem({ card, index }: { card: Card, index: number }) {
    const { theme } = useThemeStore();
    const { heldCards, currentCardIndex } = useGameStore();


    const cardWidth = (WIDTH - 144) / 5;
    const cardHeight = cardWidth * 1.4;

    const isHeld = heldCards.some((heldCard) => heldCard.id === card.id);
    const isCurrent = currentCardIndex === index;

    return <View style={{ width: cardWidth, height: cardHeight, backgroundColor: theme.background }} >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: theme.text }}>{card.id}</Text>
    </View>
}