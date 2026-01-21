import { Text } from "react-native";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";
import { BoardFilterType } from "./FilteredBoardList";
import { WIDTH } from "@/utils/Dimensions";
import { useThemeStore } from "@/stores/themeStore";
import { useBalletFont } from "@/utils/fonts/useBalletFont";


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
    const { fontFamily } = useBalletFont();

    return (
        <CenterCardSlider
            data={BOARD_FILTER_OPTIONS}
            card={({ item }) => <Text
                style={{
                    fontSize: 48,
                    color: theme.text,
                    fontFamily,
                    lineHeight: 128,
                    width: "100%",
                    textAlign: "center",

                }}>
                {item.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
            </Text>
            }
            selectedIndex={BOARD_FILTER_OPTIONS.indexOf(selectedBoardFilter)}
            onSelect={(index) => onSelect(BOARD_FILTER_OPTIONS[index])}
            cardWidth={WIDTH}
            cardHeight={128}
            sliderWidth={WIDTH}
            maxDotsShown={BOARD_FILTER_OPTIONS.length}
            animationType="flat"
        />
    );
}