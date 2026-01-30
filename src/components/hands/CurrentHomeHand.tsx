import { useGameStore } from "@/stores/game/gameStore";
import { JackCard } from "../cards/JackCard";
import { WIDTH } from "@/utils/Dimensions";
import Animated from "react-native-reanimated";
import { Card } from "@/stores/game/types";
import { useHomeHandAnimation } from "@/stores/animation/utils/useHomeHandAnimation";
import { router } from "expo-router";
import { useAnimationStore } from "@/stores/animation/animationStore";

export function CurrentHomeHand() {
    const { currentHand } = useGameStore();

    return (
        <Animated.View
            style={{
                width: "100%",
                height: 200,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {currentHand.map((card, index) => <CurrentHomeCard key={card.id} card={card} index={index} />)}
        </Animated.View>
    );
}

function CurrentHomeCard({ card, index }: { card: Card, index: number }) {
    const { setHandAnimationPosition } = useAnimationStore();
    const style = useHomeHandAnimation(index);

    function handlePress() {
        router.push(`/hand`);
        setHandAnimationPosition("hand");
    }

    return (
        <Animated.View key={card.id} style={style}>
            <JackCard card={card} width={WIDTH / 4} onPress={handlePress} noHold />
        </Animated.View>
    );
}