import { Fragment, useState } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { BoardFilterType } from "@/components/board-screen/FilteredBoardList";
import { HandFilterSelector } from "@/components/board-screen/HandFilterSelector";
import { FilteredBoardList } from "@/components/board-screen/FilteredBoardList";
import { HomeScreenBackground } from "@/components/ui/backgrounds/HomeScreenBackground";

export default function Page() {
  const [selectedBoardFilter, setSelectedBoardFilter] = useState<BoardFilterType>("all");

  return (
    <Fragment>
      <HomeScreenBackground />
      <ScreenContent
        edges={["top", "bottom"]}
        HeaderComponent={<SettingsHeader />}
        FooterComponent={<HandFilterSelector selectedBoardFilter={selectedBoardFilter} onSelect={setSelectedBoardFilter} />}
      >
        <FilteredBoardList filter={selectedBoardFilter} />
      </ScreenContent>
    </Fragment >
  );
}
