import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import HandRankBoard from "@/components/rank-screen/HandRankBoard";
import { BlackTileBackground } from "@/components/ui/backgrounds/BlackTileBackground";
import { RanksHeader } from "@/components/board-screen/RanksHeader";

export default function Page() {

  return (
    <Fragment>
      <BlackTileBackground />
      <ScreenContent
        edges={["top"]}
        scrollable
        HeaderComponent={<RanksHeader />}
      >

        <HandRankBoard />
      </ScreenContent>
    </Fragment >
  );
}
