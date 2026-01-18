import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { HandScreenBackground } from "@/components/ui/backgrounds/HandScreenBackground";
import { HeaderButton } from "@/components/ui/buttons/HeaderButton";
import { CurrentHand } from "@/components/hand/CurrentHand";
import { View } from "react-native";

export default function Page() {
  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <HeaderButton title="Deck" onPress={() => router.dismissTo("/")} />,
          headerRight: () => <HeaderButton title="Burn" onPress={() => { }} />,
        }} />

      <ScreenContent scroll={false}>
        <HandScreenBackground />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
          <CurrentHand />
        </View>
      </ScreenContent>
    </Fragment >
  );
}
