import { Text } from "react-native";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";
import { BoardFilterType } from "./FilteredBoardList";
import { WIDTH } from "@/utils/Dimensions";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { useBalletFont } from "@/utils/fonts/useBalletFont";
import { useGameStore } from "@/stores/game/gameStore";

interface HandFilterSelectorProps {
    selectedBoardFilter: BoardFilterType;
    onSelect: (boardFilter: BoardFilterType) => void;
}

export function HandFilterSelector({ selectedBoardFilter, onSelect }: HandFilterSelectorProps) {
    const { theme } = useSettingsStore();
    const { fontFamily } = useBalletFont();
    const { rounds } = useGameStore();

    const usedRanks = Array.from(
        new Set(rounds.map(hand => hand.rank.type).filter(rank => rank !== "empty_hand"))
    );

    const availableFilters: BoardFilterType[] = [
        "all_hands",
        ...usedRanks
    ];


    return (
        <CenterCardSlider
            data={availableFilters}
            card={({ item }) => <Text
                style={{
                    fontSize: 48,
                    color: theme.text,
                    opacity: item === selectedBoardFilter ? 1 : 0.4,
                    fontFamily,
                    lineHeight: 128,
                    width: "100%",
                    textAlign: "center",

                }}>
                {item.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
            </Text>
            }
            selectedIndex={availableFilters.indexOf(selectedBoardFilter)}
            onSelect={(index) => onSelect(availableFilters[index])}
            cardWidth={WIDTH}
            cardHeight={128}
            sliderWidth={WIDTH}
            maxDotsShown={availableFilters.length}
            animationType="flat"
        />
    );
}

