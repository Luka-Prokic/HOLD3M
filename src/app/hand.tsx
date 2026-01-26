import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { HandScreenBackground } from "@/components/ui/backgrounds/HandScreenBackground";
import { View } from "react-native";
import { HandHeader } from "@/components/hand-screen/HandHeader";
import { CurrentAnimatedHand } from "@/components/hands/CurrentAnimatedHand";

export default function Page() {

  return (
    <Fragment>
      <HandScreenBackground />
      <ScreenContent
        edges={["top"]}
        HeaderComponent={<HandHeader />}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingBottom: 128 }}>
          <CurrentAnimatedHand />
        </View>
      </ScreenContent>
    </Fragment >
  );
}
