import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { Pressable } from "react-native";
import { CardScreenBackground } from "@/components/ui/backgrounds/CardScreenBackground";
import { FocusedHand } from "@/components/hand/FocusedHand";
import { MiniFocusedHand } from "@/components/hand/MiniFocusedHand";

export default function Page() {

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerTitle: () => <MiniFocusedHand />,
        }} />
      <ScreenContent scroll={false} >
        <CardScreenBackground />
        <Pressable style={{ flex: 1, justifyContent: "center" }} onPress={() => router.dismissTo("/hand")}>
          <FocusedHand />
        </Pressable>
      </ScreenContent>
    </Fragment >
  );
}
