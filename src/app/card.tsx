import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { CardScreenBackground } from "@/components/ui/backgrounds/CardScreenBackground";
import { FocusedHand } from "@/components/hand-screen/FocusedHand";
import { MiniFocusedHand } from "@/components/hand-screen/MiniFocusedHand";

export default function Page() {

  return (
    <Fragment>
      <CardScreenBackground />
      <ScreenContent FooterComponent={<MiniFocusedHand />}>
        <FocusedHand />
      </ScreenContent>
    </Fragment >
  );
}
