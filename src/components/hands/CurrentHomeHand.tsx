import { useGameStore } from "@/stores/game/gameStore";
import { PreviewCard } from "../cards/PreviewCard";
import { WIDTH } from "@/utils/Dimensions";
import Animated from "react-native-reanimated";
import { Card } from "@/stores/game/types";
import { useHomeHandAnimation } from "@/stores/animation/utils/useHomeHandAnimation";

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
    const style = useHomeHandAnimation(index);

    return (
        <Animated.View key={card.id} style={style}>
            <PreviewCard card={card} width={WIDTH / 4} privewOnly />
        </Animated.View>
    );
}