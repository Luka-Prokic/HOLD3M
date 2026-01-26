import { useEffect } from "react";
import { useGameStore } from "@/stores/game/gameStore";
import { PreviewCard } from "../cards/PreviewCard";
import { router } from "expo-router";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from "react-native-reanimated";

export function CurrentAnimatedHand() {
    const { currentHand, setCurrentCardIndex } = useGameStore();

    const translateX = currentHand.map(() => useSharedValue(0));
    const translateY = currentHand.map(() => useSharedValue(0));
    const rotation = currentHand.map(() => useSharedValue(0));

    // One random value per card (0 → 1)
    const randoms = currentHand.map(() => Math.random());

    const fanOffsets = currentHand.map((_, index) => {
        const offset = index - 2;
        const distance = Math.abs(offset);

        const x = offset * 54;

        let y = 0;
        if (distance === 0) y = -36;
        else if (distance === 1) y = -24;

        const rot = offset * 12;

        return { x, y, rot };
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            currentHand.forEach((_, i) => {
                const extraDelay = randoms[i] * 200; // 0–200ms

                translateX[i].value = withTiming(
                    fanOffsets[i].x,
                    { duration: 500 + extraDelay, easing: Easing.out(Easing.exp) }
                );

                translateY[i].value = withTiming(
                    fanOffsets[i].y,
                    { duration: 500 + extraDelay, easing: Easing.out(Easing.exp) }
                );

                rotation[i].value = withTiming(
                    fanOffsets[i].rot,
                    { duration: 500 + extraDelay, easing: Easing.out(Easing.exp) }
                );
            });
        }, 500); // your updated delay

        return () => clearTimeout(timeout);
    }, []);

    function handlePress(index: number) {
        setCurrentCardIndex(index);
        router.push("/card");
    }

    return (
        <Animated.View
            style={{
                flexDirection: "row",
                paddingBottom: 128,
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {currentHand.map((card, index) => {
                const style = useAnimatedStyle(() => ({
                    position: "absolute",
                    transform: [
                        { translateX: translateX[index].value },
                        { translateY: translateY[index].value },
                        { rotate: `${rotation[index].value}deg` },
                    ],
                }));

                return (
                    <Animated.View key={card.id} style={style}>
                        <PreviewCard
                            card={card}
                            onPress={() => handlePress(index)}
                        />
                    </Animated.View>
                );
            })}
        </Animated.View>
    );
}