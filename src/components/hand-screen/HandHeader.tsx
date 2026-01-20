import { router } from "expo-router";
import { View } from "react-native";
import { useGameStore } from "@/stores/game/useGameStore";
import { AceButton } from "../ui/buttons/AceButton";
import { useThemeStore } from "@/stores/themeStore";
import { Card } from "@/stores/types";

export function HandHeader() {
    const { burnCards, burnsAvailable, currentHand, heldCards } = useGameStore();
    const { themeName } = useThemeStore();

    const unHeldCards = currentHand.filter((card: Card) => !heldCards.includes(card));
    const unHeldCardsCount = unHeldCards.length;

    const burnableCards = burnsAvailable > 0 && unHeldCardsCount > 0 ? true : false;

    const burnStyle = themeName === "dark" ? "tint" : "accent";
    const burnLabel = `Burn (${unHeldCardsCount})`;

    return (
        <View style={{ flexDirection: "row", width: "100%", paddingTop: 16, paddingHorizontal: 24, gap: 24, zIndex: 1 }}>
            <AceButton title="Home" onPress={() => router.dismissTo("/")} buttonStyle={{ flexGrow: 1 }} />
            <AceButton title={burnLabel} onPress={() => burnCards()} disabled={!burnableCards} themeType={burnStyle} />
        </View>
    );
}