import { View } from "react-native";
import { useGameStore } from "@/stores/game/useGameStore";
import { PreviewCard } from "../cards/PreviewCard";
import { JesterPreviewCard } from "../cards/JesterPreviewCard";
import { Card } from "@/stores/types";
import { router } from "expo-router";

export function CurrentHand() {
    const { currentHand, setCurrentCardIndex, currentCardIndex } = useGameStore();

    // Always render 5 cards, fill with jesters if needed
    const cardsToShow = [...currentHand];
    while (cardsToShow.length < 5) {
        cardsToShow.push({ id: "jester", repetition: 0, suit: "hearts" } as Card); // undefined will render jester
    }

    function handlePress(index: number) {
        setCurrentCardIndex(index);
        router.push("/card");
    }


    if (currentCardIndex !== -1) return null;
    return (
        <View style={{ flexDirection: "row", paddingBottom: 128, width: "100%", justifyContent: "space-between", paddingHorizontal: 8 }}>
            {cardsToShow.map((card, index) =>
                card.id !== "jester" ? (
                    <PreviewCard key={card.id} card={card} onPress={() => handlePress(index)} />
                ) : (
                    <JesterPreviewCard key={`jester-${index}`} onPress={() => handlePress(index)} />
                )
            )}
        </View>
    );
}