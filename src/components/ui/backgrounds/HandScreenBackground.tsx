import { useSettingsStore } from "@/stores/settings/settingsStore";
import { LinearGradient } from "expo-linear-gradient";
import { useBalletFont } from "@/utils/fonts/useBalletFont";
import Animated, { FadeIn } from "react-native-reanimated";
import { PremadeDiamondBackground } from "./PremadeDiamondBackground";
import { useAnimationStore } from "@/stores/animation/animationStore";
import { useGameStore } from "@/stores/game/gameStore";
import { Card } from "@/stores/game/types";

export function HandScreenBackground() {
    const { theme, tintColor, accentColor, isAnimationsEnabled } = useSettingsStore();
    const { handAnimationPosition } = useAnimationStore();
    const { fontFamily } = useBalletFont();
    const { currentHand, heldCards, burnsAvailable } = useGameStore();

    const unHeldCards = currentHand.filter((card: Card) => !heldCards.includes(card));
    const jesterCards = currentHand.filter((card: Card) => card.repetition === -1);

    const unHeldCardsCount = unHeldCards.length;
    const jesterCardsCount = jesterCards.length;

    const burnableCardsCount = burnsAvailable > 0 && unHeldCardsCount > 0 && jesterCardsCount < unHeldCardsCount ? unHeldCardsCount - jesterCardsCount : 0;

    return (
        <Animated.View
            entering={isAnimationsEnabled ? FadeIn.duration(400).delay(400) : undefined}
            style={{
                flex: 1,
                position: "absolute", top: 0, left: 0, bottom: 0, right: 0,
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: theme.background,
            }}>
            <LinearGradient
                colors={[tintColor + "00", handAnimationPosition === "burn" ? theme.darkSurface : tintColor]}
                style={{
                    flex: 1,
                    position: "absolute", top: 0, left: 0, bottom: 0, right: 0,
                    justifyContent: "flex-end",
                    alignItems: "center"
                }} >
                <PremadeDiamondBackground color={handAnimationPosition === "burn" ? theme.lightSurface + "10" : undefined} />
                <Animated.Text entering={isAnimationsEnabled ? FadeIn.duration(400).delay(400) : undefined} style={{
                    fontFamily,
                    fontSize: 96,
                    color: handAnimationPosition === "burn" ? theme.lightSurface : accentColor,
                    textShadowColor: handAnimationPosition === "burn" ? theme.lightSurface : accentColor,
                    textShadowOffset: { width: 1, height: 0 },
                    textShadowRadius: 0,
                    paddingHorizontal: 32,
                }} >
                    {handAnimationPosition === "burn" ? burnableCardsCount > 1 ? `Burn'em` : "Burn" : "Holdem"}
                </Animated.Text>
            </LinearGradient>
        </Animated.View>
    );
}