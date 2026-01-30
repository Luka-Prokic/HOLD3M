import { useSettingsStore } from "@/stores/settings/settingsStore";
import { LinearGradient } from "expo-linear-gradient";
import { useBalletFont } from "@/utils/fonts/useBalletFont";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { PremadeDiamondBackground } from "./PremadeDiamondBackground";
import { useGameStore } from "@/stores/game/gameStore";
import { Card } from "@/stores/game/types";
import { Text } from "react-native";

export function BurnScreenBackground() {
    const { theme, tintColor, isAnimationsEnabled } = useSettingsStore();
    const { fontFamily } = useBalletFont();
    const { currentHand, heldCards, burnsAvailable } = useGameStore();

    const unHeldCards = currentHand.filter((card: Card) => !heldCards.includes(card));
    const jesterCards = currentHand.filter((card: Card) => card.repetition === -1);

    const unHeldCardsCount = unHeldCards.length;
    const jesterCardsCount = jesterCards.length;

    const burnableCardsCount = burnsAvailable > 0 && unHeldCardsCount > 0 && jesterCardsCount < unHeldCardsCount ? unHeldCardsCount - jesterCardsCount : 0;

    return (
        <Animated.View
            entering={isAnimationsEnabled ? FadeIn.duration(400) : undefined}
            exiting={isAnimationsEnabled ? FadeOut.duration(0).delay(800) : undefined}
            style={{
                flex: 1,
                position: "absolute", top: 0, left: 0, bottom: 0, right: 0,
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: theme.background,
            }}>
            <LinearGradient
                colors={[tintColor + "00", theme.darkSurface]}
                style={{
                    flex: 1,
                    position: "absolute", top: 0, left: 0, bottom: 0, right: 0,
                    justifyContent: "flex-end",
                    alignItems: "center"
                }} >
                <PremadeDiamondBackground color={theme.background + "10"} />
                <Text
                    style={{
                        fontFamily,
                        fontSize: 96,
                        color: theme.lightSurface,
                        textShadowColor: theme.lightSurface,
                        textShadowOffset: { width: 1, height: 0 },
                        textShadowRadius: 0,
                        paddingHorizontal: 32,
                    }} >
                    {burnableCardsCount > 1 ? `Burn'em` : "Burn"}
                </Text>
            </LinearGradient>
        </Animated.View>
    );
}