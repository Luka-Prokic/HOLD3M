import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { HeaderButton } from "@/components/ui/buttons/HeaderButton";
import { useThemeStore } from "@/stores/themeStore";
import { AceButton } from "@/components/ui/buttons/AceButton";
import { useGameStore } from "@/stores/game/useGameStore";
import { View } from "react-native";

export default function Page() {
  const { theme } = useThemeStore();
  const { finalizeHand, startNewHand, deck } = useGameStore();

  function handleEndDay() {
    finalizeHand();
    setTimeout(() => {
      startNewHand();
      console.log("Deck", deck.length);
      console.log(deck[deck.length - 1].cards.map((card) => card.repetition).join(", "), deck[deck.length - 1].rank.type, deck[deck.length - 1].rank.values.join(", "));
    }, 100);
  }
  return (
    <Fragment>
      <Stack.Screen options={{
        headerLeft: () => <HeaderButton title="Hand" onPress={() => router.push("/hand")} />,
        headerRight: () => <HeaderButton title="Tune" onPress={() => router.push("/settings")} />,
        contentStyle: {
          backgroundColor: theme.background,
        },
      }} />
      <ScreenContent edges={["top"]} scroll={false}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <AceButton title="End Day" onPress={handleEndDay} />
        </View>
      </ScreenContent>
    </Fragment >
  );
}
