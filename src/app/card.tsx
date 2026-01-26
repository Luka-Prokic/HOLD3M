import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { CardScreenBackground } from "@/components/ui/backgrounds/CardScreenBackground";
import { FocusedHand } from "@/components/hands/FocusedHand";
import { MiniFocusedHand } from "@/components/hands/MiniFocusedHand";
import { CardFooter } from "@/components/hand-screen/CardFooter";

export default function Page() {

  return (
    <Fragment>
      <CardScreenBackground />
      <ScreenContent
        edges={["top"]}
        HeaderComponent={<MiniFocusedHand style={{ marginTop: 16 }} />}
        FooterComponent={<CardFooter />}>
        <FocusedHand />
      </ScreenContent>
    </Fragment >
  );
}

