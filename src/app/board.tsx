import { Fragment, useState } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { BoardHeader } from "@/components/board-screen/BoardHeader";
import { BoardFilterType } from "@/components/board-screen/FilteredBoardList";
import { HandFilterSelector } from "@/components/board-screen/HandFilterSelector";
import { FilteredBoardList } from "@/components/board-screen/FilteredBoardList";
import { BoardScreenBackground } from "@/components/ui/backgrounds/BoardScreenBackground";

export default function Page() {
  const [selectedBoardFilter, setSelectedBoardFilter] = useState<BoardFilterType>("all_hands");

  return (
    <Fragment>
      {/* <HomeScreenBackground /> */}
      {/* <PremadeDiamondBackground /> */}
      <BoardScreenBackground />
      <ScreenContent
        edges={["top", "bottom"]}
        HeaderComponent={<BoardHeader />}
        FooterComponent={<HandFilterSelector selectedBoardFilter={selectedBoardFilter} onSelect={setSelectedBoardFilter} />}
      >
        <FilteredBoardList filter={selectedBoardFilter} />
      </ScreenContent>
    </Fragment >
  );
}
