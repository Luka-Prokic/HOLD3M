import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { CardScreenBackground } from "@/components/ui/backgrounds/CardScreenBackground";
import { FocusedHand } from "@/components/hand/FocusedHand";
import { MiniFocusedHand } from "@/components/hand/MiniFocusedHand";
import { HeaderButton } from "@/components/ui/buttons/HeaderButton";
import { useGameStore } from "@/stores/game/useGameStore";
export default function Page() {
  const { clearSelection } = useGameStore();

  function handleBackPress() {
    router.dismissTo("/hand");
    clearSelection();
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <HeaderButton title="Back" onPress={handleBackPress} />,
          headerTitle: () => <MiniFocusedHand />,
        }} />
      <ScreenContent scroll={false} >
        <CardScreenBackground />
        <FocusedHand />
      </ScreenContent>
    </Fragment >
  );
}
