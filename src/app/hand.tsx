import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { HandScreenBackground } from "@/components/ui/backgrounds/HandScreenBackground";
import { View } from "react-native";
import { CurrentHand } from "@/components/hand-screen/CurrentHand";
import { HandHeader } from "@/components/hand-screen/HandHeader";

export default function Page() {

  return (
    <Fragment>
      <HandScreenBackground />
      <ScreenContent
        edges={["top"]}
        HeaderComponent={<HandHeader />}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <CurrentHand />
        </View>
      </ScreenContent>
    </Fragment >
  );
}
