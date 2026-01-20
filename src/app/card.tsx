import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { CardScreenBackground } from "@/components/ui/backgrounds/CardScreenBackground";
import { FocusedHand } from "@/components/hand-screen/FocusedHand";
import { MiniFocusedHand } from "@/components/hand-screen/MiniFocusedHand";
import { CardFooter } from "@/components/hand-screen/CardFooter";

export default function Page() {

  return (
    <Fragment>
      <CardScreenBackground />
      <ScreenContent
        edges={["top", "bottom"]}
        HeaderComponent={<MiniFocusedHand style={{ marginTop: 16 }} />}
        FooterComponent={<CardFooter />}>
        <FocusedHand />
      </ScreenContent>
    </Fragment >
  );
}

