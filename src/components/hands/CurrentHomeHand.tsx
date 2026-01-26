import { useGameStore } from "@/stores/game/gameStore";
import { PreviewCard } from "../cards/PreviewCard";
import { WIDTH } from "@/utils/Dimensions";
import Animated, { FadeInDown, SlideOutDown } from "react-native-reanimated";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { useAnimationStore } from "@/stores/animation/animationStore";
import { Card } from "@/stores/game/types";
import { useHomeHandAnimation } from "@/stores/animation/utils/useHomeHandAnimation";

export function CurrentHomeHand() {
    const { currentHand } = useGameStore();
    const { isAnimationsEnabled } = useSettingsStore();
    const { handAnimationPosition } = useAnimationStore();

    // const entering = isAnimationsEnabled ? FadeInDown.duration(300).delay(300) : undefined;
    // const exiting = isAnimationsEnabled ? SlideOutDown.duration(300) : undefined;

    // if (handAnimationPosition !== "home") return null;

    return (
        <Animated.View
            // entering={entering}
            // exiting={exiting}
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