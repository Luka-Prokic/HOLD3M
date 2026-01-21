import { Fragment, useState } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { BoardFilterType } from "@/components/board-screen/FilteredBoardList";
import { HandFilterSelector } from "@/components/board-screen/HandFilterSelector";
import { FilteredBoardList } from "@/components/board-screen/FilteredBoardList";

export default function Page() {
  const [selectedBoardFilter, setSelectedBoardFilter] = useState<BoardFilterType>("all");

  return (
    <Fragment>
      <ScreenContent edges={["top", "bottom"]} HeaderComponent={<SettingsHeader />}>
        <FilteredBoardList filter={selectedBoardFilter} />
        <HandFilterSelector selectedBoardFilter={selectedBoardFilter} onSelect={setSelectedBoardFilter} />

      </ScreenContent>
    </Fragment >
  );
}
