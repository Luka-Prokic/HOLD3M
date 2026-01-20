import { Card } from "@/stores/types";
import { useGameStore } from "@/stores/game/useGameStore"
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/stores/themeStore";


export function MiniFocusedHand() {
    const { currentHand } = useGameStore();

    // Always render 5 cards, fill with jesters if needed
    const cardsToShow = [...currentHand];
    while (cardsToShow.length < 5) {
        cardsToShow.push({ id: "jester", repetition: 0, suit: "hearts" } as Card); // undefined will render jester
    }

    return (<View style={{ flexDirection: "row", width: "100%", height: 80, alignItems: "center", justifyContent: "space-between", paddingHorizontal: 8 }}>
        {cardsToShow.map((card, index) =>
            <CardItem key={index} card={card} index={index} />
        )}
    </View>)
}

function CardItem({ card, index }: { card: Card, index: number }) {
    const { theme } = useThemeStore();
    const { heldCards, currentCardIndex } = useGameStore();



    const isHeld = heldCards.some((heldCard) => heldCard.id === card.id);
    const isCurrent = currentCardIndex === index;
    const isJester = card.id === "jester";

    if (isJester) return <Ionicons name="star-outline" size={24} color={theme.text} style={{ transform: [{ scale: isCurrent ? 1.5 : 1 }] }} />

    return <Ionicons name={isHeld ? "ellipse" : "ellipse-outline"} size={24} color={theme.text} style={{ transform: [{ scale: isCurrent ? 1.5 : 1 }] }} />
}