import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { CardScreenBackground } from "@/components/ui/backgrounds/CardScreenBackground";
import { FocusedHand } from "@/components/hands/FocusedHand";
import { MiniFocusedHand } from "@/components/hands/MiniFocusedHand";
import { CardFooter } from "@/components/hand-screen/CardFooter";
import { useAnimationStore } from "@/stores/animation/animationStore";
import { KeyboardButtons } from "@/components/cards/card-screen/KeyboardButtons";

export default function Page() {
  const { handAnimationPosition } = useAnimationStore();
  const focus = handAnimationPosition === "focus";

  return (
    <Fragment>
      <CardScreenBackground />
      {focus && <KeyboardButtons />}
      <ScreenContent
        edges={["top"]}
        HeaderComponent={<MiniFocusedHand style={{ marginTop: 16 }} />}
        FooterComponent={<CardFooter />}>
        <FocusedHand />
      </ScreenContent>
    </Fragment >
  );
}

