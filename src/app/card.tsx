import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { View } from "react-native";
import { CardScreenBackground } from "@/components/ui/backgrounds/CardScreenBackground";
import { HeaderButton } from "@/components/ui/buttons/HeaderButton";
import { FocusedHand } from "@/components/hand/FocusedHand";
import { useGameStore } from "@/stores/game/useGameStore";

export default function Page() {
  const { currentCardIndex, currentHand } = useGameStore();
  const card = currentHand[currentCardIndex];
  const isJester = card ? false : true;

  function handleBurn() {
    if (isJester) {

    } else {
      // burn card
    }
  }

  return (
    <Fragment>
      <Stack.Screen options={{
        headerLeft: () => <HeaderButton title="Hand" onPress={() => router.dismissTo("/hand")} />,
        headerRight: () => <HeaderButton title={isJester ? "Add" : "Burn"} onPress={handleBurn} />,
      }} />

      <ScreenContent scroll={false} >
        <CardScreenBackground />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <FocusedHand />
        </View>
      </ScreenContent>
    </Fragment >
  );
}
