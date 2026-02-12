import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { HandScreenBackground } from "@/components/ui/backgrounds/HandScreenBackground";
import { View } from "react-native";
import { HandHeader } from "@/components/hand-screen/HandHeader";
import { CurrentAnimatedHand } from "@/components/hands/CurrentAnimatedHand";
import { useAnimationStore } from "@/stores/animation/animationStore";
import { BurnScreenBackground } from "@/components/ui/backgrounds/BurnScreenBackground";
import { CurrentAnimatedShadow } from "@/components/hands/CurrentAnimatedHandShadow";

export default function Page() {
  const { handAnimationPosition } = useAnimationStore();
  return (
    <Fragment>
      {handAnimationPosition === "burn" ? <BurnScreenBackground /> : <HandScreenBackground />}
      <ScreenContent
        edges={["top", "bottom"]}
        HeaderComponent={<HandHeader />}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "absolute", bottom: 0, left: 0, right: 0, top: 0 }}>
          <CurrentAnimatedHand />
          <CurrentAnimatedShadow />
        </View>
      </ScreenContent>
    </Fragment >
  );
}
