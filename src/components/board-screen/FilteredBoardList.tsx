import { FlatList } from "react-native-gesture-handler";
import { HandRankType } from "@/stores/game/types";
import { useGameStore } from "@/stores/game/gameStore";
import { useMemo } from "react";
import { RoundPreviewBar } from "./RoundPreviewBar";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

export type BoardFilterType = HandRankType | "all_hands";

interface FilteredBoardListProps {
    filter: BoardFilterType;
}

export function FilteredBoardList({ filter }: FilteredBoardListProps) {
    const { rounds } = useGameStore();

    const filteredRounds = useMemo(() => {
        const roundsToShow = filter === "all_hands" ? rounds : rounds.filter(r => r.rank.type === filter);
        return [...roundsToShow].reverse();
    }, [rounds, filter]);

    return (
        <MaskedView
            style={{ flex: 1 }}
            maskElement={
                <LinearGradient
                    colors={['transparent', 'black', 'black', 'transparent']} // fade top & bottom
                    locations={[0, 0.05, 0.95, 1]}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                />
            }
        >
            <FlatList
                data={filteredRounds}
                renderItem={({ item }) => <RoundPreviewBar round={item} roundNumber={rounds.indexOf(item) + 1} />}
                contentContainerStyle={{ padding: 16, gap: 16 }}
                inverted
            />
        </MaskedView>
    );
}