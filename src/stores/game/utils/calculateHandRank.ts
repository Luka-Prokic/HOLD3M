import type { Card, HandRank } from "../types";
import { getCardRank } from "@/utils/getCardRank";

export const calculateHandRank = (cards: Card[]): HandRank => {
  if (cards.length === 0) {
    return { type: "empty_hand", values: [] };
  }

  // Map repetitions to rank numbers
  const sortedRanks = cards
    .map((c) => getCardRank(c.repetition))
    .sort((a, b) => b - a);

  const rankCounts: Record<number, number> = {};
  sortedRanks.forEach((rank) => {
    rankCounts[rank] = (rankCounts[rank] || 0) + 1;
  });

  const counts = Object.values(rankCounts).sort((a, b) => b - a);
  const uniqueRanks = Object.keys(rankCounts)
    .map(Number)
    .sort((a, b) => b - a);

  const suits = cards.map((c) => c.suit);
  const isFlush = suits.every((s) => s === suits[0]) && cards.length === 5;

  const isStraight =
    cards.length === 5 &&
    uniqueRanks.length === 5 &&
    uniqueRanks[0] - uniqueRanks[4] === 4;

  const isRoyalFlush =
    isFlush && isStraight && uniqueRanks[0] === 14 && uniqueRanks[4] === 10;

  if (isRoyalFlush) return { type: "royal_flush", values: uniqueRanks };
  if (isFlush && isStraight) return { type: "straight_flush", values: uniqueRanks };
  if (counts[0] === 4) return { type: "four_kind", values: uniqueRanks };
  if (counts[0] === 3 && counts[1] === 2) return { type: "full_house", values: uniqueRanks };
  if (isFlush) return { type: "flush", values: uniqueRanks };
  if (isStraight) return { type: "straight", values: uniqueRanks };
  if (counts[0] === 3) return { type: "three_kind", values: uniqueRanks };
  if (counts[0] === 2 && counts[1] === 2) return { type: "two_pair", values: uniqueRanks };
  if (counts[0] === 2) return { type: "pair", values: uniqueRanks };

  return { type: "high_card", values: uniqueRanks };
};