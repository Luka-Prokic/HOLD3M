import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { AceButton } from "@/components/ui/buttons/AceButton";
import { HandBackground } from "@/components/backgrounds/HandBackground";

export default function Page() {
  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <AceButton title="Deck" onPress={() => router.dismissTo("/")} />,
          headerRight: () => <AceButton title="Burn" onPress={() => { }} />,
        }} />

      <ScreenContent style={{ backgroundColor: "red" }} scroll={false}>
        <HandBackground />
      </ScreenContent>
    </Fragment >
  );
}
