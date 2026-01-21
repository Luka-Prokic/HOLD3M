import { router } from "expo-router";
import { useGameStore } from "@/stores/game/useGameStore";
import { AceButton } from "../ui/buttons/AceButton";
import { useThemeStore } from "@/stores/themeStore";
import { Card } from "@/stores/types";
import Animated, { FadeIn } from "react-native-reanimated";
import { WIDTH } from "@/utils/Dimensions";

export function HandHeader() {
    const { burnCards, burnsAvailable, currentHand, heldCards } = useGameStore();
    const { themeName } = useThemeStore();

    const unHeldCards = currentHand.filter((card: Card) => !heldCards.includes(card));
    const jesterCards = currentHand.filter((card: Card) => card.repetition === -1);


    const unHeldCardsCount = unHeldCards.length;
    const jesterCardsCount = jesterCards.length;

    const burnableCards = burnsAvailable > 0 && unHeldCardsCount > 0 && jesterCardsCount < unHeldCardsCount ? true : false;

    const burnStyle = themeName === "dark" ? "tint" : "accent";
    const burnLabel = `Burn (${unHeldCardsCount - jesterCardsCount})`;

    const buttonWidth = WIDTH / 2 - 36;

    return (
        <Animated.View
            entering={FadeIn.duration(400).delay(400)}
            style={{
                flexDirection: "row",
                width: WIDTH,
                paddingTop: 16,
                paddingHorizontal: 24,
                gap: 24,
                zIndex: 1
            }}>
            <AceButton title="Home" onPress={() => router.dismissTo("/")} buttonStyle={{ width: buttonWidth }} />
            <AceButton title={burnLabel} onPress={() => burnCards()} disabled={!burnableCards} themeType={burnStyle} buttonStyle={{ width: buttonWidth }} />
        </Animated.View>
    );
}