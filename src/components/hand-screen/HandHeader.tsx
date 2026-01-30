import { router } from "expo-router";
import { useGameStore } from "@/stores/game/gameStore";
import { AceButton } from "../ui/buttons/AceButton";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { Card } from "@/stores/game/types";
import Animated, { FadeIn } from "react-native-reanimated";
import { WIDTH } from "@/utils/Dimensions";
import { useAnimationStore } from "@/stores/animation/animationStore";

export function HandHeader() {
    const { burnsAvailable, currentHand, heldCards, burnCards } = useGameStore();
    const { themeName, isAnimationsEnabled } = useSettingsStore();
    const { setHandAnimationPosition, handAnimationPosition } = useAnimationStore();

    const unHeldCards = currentHand.filter((card: Card) => !heldCards.includes(card));
    const jesterCards = currentHand.filter((card: Card) => card.repetition === -1);

    const unHeldCardsCount = unHeldCards.length;
    const jesterCardsCount = jesterCards.length;

    const burnableCardsCount = burnsAvailable > 0 && unHeldCardsCount > 0 && jesterCardsCount < unHeldCardsCount ? unHeldCardsCount - jesterCardsCount : 0;

    const burnStyle = themeName === "dark" ? "tint" : "accent";
    const burnLabel = !burnsAvailable ? "Used" : handAnimationPosition !== "burn" ? `Burn (${burnableCardsCount})` : burnableCardsCount > 1 ? "Burn'em" : "Burn";

    const homeLabel = handAnimationPosition !== "burn" ? "Home" : "Back";

    const buttonWidth = WIDTH / 2 - 36;


    function handleHome() {
        if (handAnimationPosition === "burn") {
            setHandAnimationPosition("hand");
            return;
        }
        router.dismissTo("/");
        setHandAnimationPosition("home");



    }

    function handleBurn() {
        if (handAnimationPosition === "burn") {
            setTimeout(() => burnCards(), 600);
            setHandAnimationPosition("hand");
            return;
        }
        setHandAnimationPosition("burn");
    }

    return (
        <Animated.View
            entering={isAnimationsEnabled ? FadeIn.duration(300).delay(800) : undefined}
            style={{
                flexDirection: "row",
                width: WIDTH,
                paddingTop: 16,
                paddingHorizontal: 24,
                gap: 24,
                zIndex: 1
            }}>
            <AceButton title={homeLabel} onPress={handleHome} buttonStyle={{ width: buttonWidth }} />
            <AceButton title={burnLabel} onPress={handleBurn} disabled={burnableCardsCount === 0} themeType={burnStyle} buttonStyle={{ width: buttonWidth }} />
        </Animated.View>
    );
}