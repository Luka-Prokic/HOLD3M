import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { HandScreenBackground } from "@/components/ui/backgrounds/HandScreenBackground";
import { HeaderButton } from "@/components/ui/buttons/HeaderButton";
import { View } from "react-native";
import { CurrentHand } from "@/components/hand/CurrentHand";
import { useThemeStore } from "@/stores/themeStore";
import { useGameStore } from "@/stores/game/useGameStore";

export default function Page() {
  const { theme } = useThemeStore();
  const { burnCards, burnsAvailable } = useGameStore();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <HeaderButton title="Deck" onPress={() => router.dismissTo("/")} />,
          headerRight: () => <HeaderButton title="Burn" onPress={() => burnCards()} disabled={burnsAvailable <= 0} />,
        }} />

      <ScreenContent scroll={false} style={{ backgroundColor: theme.background }}>
        <HandScreenBackground />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <CurrentHand />
        </View>
      </ScreenContent>
    </Fragment >
  );
}
