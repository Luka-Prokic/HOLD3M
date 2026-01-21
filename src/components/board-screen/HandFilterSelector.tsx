import { Text } from "react-native";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";
import { BoardFilterType } from "./FilteredBoardList";
import { WIDTH } from "@/utils/Dimensions";
import { useThemeStore } from "@/stores/themeStore";


const BOARD_FILTER_OPTIONS: BoardFilterType[] = [
    "all",
    "high_card",
    "pair",
    "two_pair",
    "three_kind",
    "straight",
    "flush",
    "full_house",
    "four_kind",
    "straight_flush",
    "royal_flush",
];

interface HandFilterSelectorProps {
    selectedBoardFilter: BoardFilterType;
    onSelect: (boardFilter: BoardFilterType) => void;
}

export function HandFilterSelector({ selectedBoardFilter, onSelect }: HandFilterSelectorProps) {
    const { theme } = useThemeStore();

    return (
        <CenterCardSlider
            data={BOARD_FILTER_OPTIONS}
            card={({ item }) => <Text style={{ fontSize: 24, fontWeight: "bold", color: theme.text }}>{item}</Text>}
            selectedIndex={BOARD_FILTER_OPTIONS.indexOf(selectedBoardFilter)}
            onSelect={(index) => onSelect(BOARD_FILTER_OPTIONS[index])}
            cardWidth={WIDTH}
            cardHeight={88}
            maxDotsShown={BOARD_FILTER_OPTIONS.length}
        />
    );
}