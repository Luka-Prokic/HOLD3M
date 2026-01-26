import { useGameStore } from "@/stores/game/gameStore";
import { PreviewCard } from "../cards/PreviewCard";
import { router } from "expo-router";
import Animated from "react-native-reanimated";
import { useCurrentHandAnimation } from "../../stores/animation/utils/useCurrentHandAnimation";
import { Card } from "@/stores/game/types";
import { useAnimationStore } from "@/stores/animation/animationStore";

export function CurrentAnimatedHand() {
    const { currentHand } = useGameStore();



    return (
        <Animated.View
            style={{
                flexDirection: "row",
                marginBottom: 64,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {currentHand.map((card: Card, index: number) => <CurrentCard key={card.id} card={card} index={index} />)}
        </Animated.View>
    );
}


function CurrentCard({ card, index }: { card: Card, index: number }) {
    const { setCurrentCardIndex } = useGameStore();
    const { handAnimationPosition } = useAnimationStore();
    const animatedStyle = useCurrentHandAnimation(index, handAnimationPosition);

    function handlePress(index: number) {
        setCurrentCardIndex(index);
        router.push("/card");
    }

    return (
        <Animated.View key={card.id} style={animatedStyle}>
            <PreviewCard
                card={card}
                onPress={() => handlePress(index)}
            />
        </Animated.View>
    );
}