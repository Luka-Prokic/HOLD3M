import type { Card, HandRank } from "../../types";

export const calculateHandRank = (cards: Card[]): HandRank => {
    if (cards.length === 0) {
      return { type: "high_card", values: [] };
    }
  
    const sortedReps = cards
      .map((c) => c.repetition)
      .sort((a, b) => b - a);
  
    const repCounts: Record<number, number> = {};
    sortedReps.forEach((rep) => {
      repCounts[rep] = (repCounts[rep] || 0) + 1;
    });
  
    const counts = Object.values(repCounts).sort((a, b) => b - a);
    const uniqueReps = Object.keys(repCounts)
      .map(Number)
      .sort((a, b) => b - a);
  
    const suits = cards.map((c) => c.suit);
    const isFlush = suits.every((s) => s === suits[0]) && cards.length === 5;
  
    const isStraight =
      cards.length === 5 &&
      uniqueReps.length === 5 &&
      uniqueReps[0] - uniqueReps[4] === 4;
  
    const isRoyalFlush =
      isFlush &&
      isStraight &&
      uniqueReps[0] === 14 &&
      uniqueReps[4] === 10;
  
    if (isRoyalFlush) {
      return { type: "royal_flush", values: uniqueReps };
    }
  
    if (isFlush && isStraight) {
      return { type: "straight_flush", values: uniqueReps };
    }
  
    if (counts[0] === 4) {
      return { type: "four_kind", values: uniqueReps };
    }
  
    if (counts[0] === 3 && counts[1] === 2) {
      return { type: "full_house", values: uniqueReps };
    }
  
    if (isFlush) {
      return { type: "flush", values: uniqueReps };
    }
  
    if (isStraight) {
      return { type: "straight", values: uniqueReps };
    }
  
    if (counts[0] === 3) {
      return { type: "three_kind", values: uniqueReps };
    }
  
    if (counts[0] === 2 && counts[1] === 2) {
      return { type: "two_pair", values: uniqueReps };
    }
  
    if (counts[0] === 2) {
      return { type: "pair", values: uniqueReps };
    }
  
    return { type: "high_card", values: uniqueReps };
  };