import { MiniHand } from "../hands/MiniHand";
import { FlatList } from "react-native-gesture-handler";
import { WIDTH } from "@/utils/Dimensions";
import { HandRankType } from "@/stores/types";
import { useGameStore } from "@/stores/game/useGameStore";
import { useMemo } from "react";

export type BoardFilterType = HandRankType | "all";

interface FilteredBoardListProps {
    filter: BoardFilterType;
}

export function FilteredBoardList({ filter }: FilteredBoardListProps) {
    const { rounds } = useGameStore();

    const filteredRounds = useMemo(() => {
        if (filter === "all") {
            return rounds;
        }
        return rounds.filter((round) => round.rank.type === filter);
    }, [rounds, filter]);

    return (
        <FlatList data={filteredRounds} renderItem={({ item }) => <MiniHand hand={item} />} style={{ width: WIDTH }} />
    );
}