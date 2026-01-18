import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { HandBackground } from "@/components/ui/backgrounds/HandBackground";
import { HeaderButton } from "@/components/ui/buttons/HeaderButton";

export default function Page() {
  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <HeaderButton title="Deck" onPress={() => router.dismissTo("/")} />,
          headerRight: () => <HeaderButton title="Burn" onPress={() => { }} />,
        }} />

      <ScreenContent scroll={false}>
        <HandBackground />
      </ScreenContent>
    </Fragment >
  );
}
