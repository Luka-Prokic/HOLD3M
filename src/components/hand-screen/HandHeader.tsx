import { router } from "expo-router";
import { useGameStore } from "@/stores/game/useGameStore";
import { AceButton } from "../ui/buttons/AceButton";
import { useThemeStore } from "@/stores/themeStore";
import { Card } from "@/stores/types";
import Animated, { FadeIn } from "react-native-reanimated";

export function HandHeader() {
    const { burnCards, burnsAvailable, currentHand, heldCards } = useGameStore();
    const { themeName } = useThemeStore();

    const unHeldCardsCount = currentHand.filter((card: Card) => !heldCards.includes(card)).length;
    const jesterCardsCount = currentHand.filter((card: Card) => card.repetition === -1).length;

    const burnableCards = burnsAvailable > 0 && unHeldCardsCount > 0 && jesterCardsCount === 5 ? true : false;

    const burnStyle = themeName === "dark" ? "tint" : "accent";
    const burnLabel = `Burn (${unHeldCardsCount - jesterCardsCount})`;

    return (
        <Animated.View
            entering={FadeIn.duration(400).delay(400)}
            style={{
                flexDirection: "row",
                width: "100%",
                paddingTop: 16,
                paddingHorizontal: 24,
                gap: 24,
                zIndex: 1
            }}>
            <AceButton title="Home" onPress={() => router.dismissTo("/")} buttonStyle={{ flexGrow: 1 }} />
            <AceButton title={burnLabel} onPress={() => burnCards()} disabled={!burnableCards} themeType={burnStyle} />
        </Animated.View>
    );
}