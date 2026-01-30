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
        edges={["top", "bottom"]}
        HeaderComponent={<HandHeader />}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "absolute", bottom: 0, left: 0, right: 0, top: 0 }}>
          <CurrentAnimatedHand />
        </View>
      </ScreenContent>
    </Fragment >
  );
}
