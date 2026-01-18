import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { View } from "react-native";
import { CardScreenBackground } from "@/components/ui/backgrounds/CardScreenBackground";
import { HeaderButton } from "@/components/ui/buttons/HeaderButton";
import { FocusedHand } from "@/components/hand/FocusedHand";

export default function Page() {

  return (
    <Fragment>
      <Stack.Screen options={{
        headerLeft: () => <HeaderButton title="Hand" onPress={() => router.dismissTo("/hand")} />,
        headerRight: () => <HeaderButton title="Burn" onPress={() => { }} />,
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
