import { View } from "react-native";
import { useGameStore } from "@/stores/game/gameStore";
import { PreviewCard } from "../cards/PreviewCard";
import { router } from "expo-router";

export function CurrentHand() {
    const { currentHand } = useGameStore();

    const { setCurrentCardIndex } = useGameStore();

    function handlePress(index: number) {
        setCurrentCardIndex(index);
        router.push("/card");
    }

    return (
        <View style={{ flexDirection: "row", paddingBottom: 128, width: "100%", justifyContent: "space-between", paddingHorizontal: 8 }}>
            {currentHand.map((card, index) =>
                <PreviewCard key={card.id} card={card} onPress={() => handlePress(index)} />
            )}
        </View>
    );
}