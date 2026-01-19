import { Card } from "@/stores/types";
import { useGameStore } from "@/stores/game/useGameStore"
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/stores/themeStore";

interface MiniHandProps {
    heldCards: Card[];
}

export function MiniHand({ heldCards }: MiniHandProps) {

    // Always render 5 cards, fill with jesters if needed
    const cardsToShow = [...heldCards];
    while (cardsToShow.length < 5) {
        cardsToShow.push({ id: "jester", repetition: 0, suit: "hearts" } as Card); // undefined will render jester
    }

    return (<View style={{ flexDirection: "row", width: "100%", height: 80, alignItems: "center", justifyContent: "space-between", paddingHorizontal: 8 }}>
        {cardsToShow.map((card, index) =>
            <CardItem key={index} card={card} />
        )}
    </View>)
}

function CardItem({ card }: { card: Card }) {
    const { theme } = useThemeStore();
    const { heldCards } = useGameStore();

    const isHeld = heldCards.some((heldCard) => heldCard.id === card.id);
    const isJester = card.id === "jester";

    if (isJester) return <Ionicons name="star-outline" size={24} color={theme.text} />

    return <Ionicons name={isHeld ? "ellipse" : "ellipse-outline"} size={24} color={theme.text} />
}