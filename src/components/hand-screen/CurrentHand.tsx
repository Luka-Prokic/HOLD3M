import { View } from "react-native";
import { useGameStore } from "@/stores/game/useGameStore";
import { PreviewCard } from "../cards/PreviewCard";
import { JesterPreviewCard } from "../cards/JesterPreviewCard";
import { Card } from "@/stores/types";
import { router } from "expo-router";

export function CurrentHand() {
    const { currentHand } = useGameStore();

    // Always render 5 cards, fill with jesters if needed
    const cardsToShow = [...currentHand];
    while (cardsToShow.length < 5) {
        cardsToShow.push({ id: "jester", repetition: 0, suit: "hearts" } as Card); // undefined will render jester
    }

    return (
        <View style={{ flexDirection: "row", paddingBottom: 128, width: "100%", justifyContent: "space-between", paddingHorizontal: 8 }}>
            {cardsToShow.map((card, index) =>
                <CardItem key={index} card={card} index={index} />
            )}
        </View>
    );
}

function CardItem({ card, index }: { card: Card, index: number }) {
    const { setCurrentCardIndex } = useGameStore();

    function handlePress(index: number) {
        setCurrentCardIndex(index);
        router.push("/card");
    }

    if (card.id === "jester") {
        return <JesterPreviewCard onPress={() => handlePress(index)} />;
    }
    return <PreviewCard card={card} onPress={() => handlePress(index)} />;
}