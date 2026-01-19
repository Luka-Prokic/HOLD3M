import { Fragment } from "react";
import { router } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { Pressable } from "react-native";
import { CardScreenBackground } from "@/components/ui/backgrounds/CardScreenBackground";
import { FocusedHand } from "@/components/hand/FocusedHand";

export default function Page() {

  return (
    <Fragment>
      <ScreenContent scroll={false} >
        <CardScreenBackground />
        <Pressable style={{ flex: 1, justifyContent: "center" }} onPress={() => router.dismissTo("/hand")}>
          <FocusedHand />
        </Pressable>
      </ScreenContent>
    </Fragment >
  );
}
