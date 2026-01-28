import { Fragment, useState } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { MiniHand } from "@/components/hands/MiniHand";
import { useLocalSearchParams } from "expo-router";
import { PreviewHand } from "@/components/hands/PreviewHand";
import { BlackTileBackground } from "@/components/ui/backgrounds/BlackTileBackground";
import { RoundPreviewHeader } from "@/components/board-screen/RoundPreviewHeader";

export default function Page() {
  const { hand } = useLocalSearchParams<{ hand: string }>();
  const parsedHand = hand ? JSON.parse(hand) : null;

  const rank = parsedHand.rank.type;
  const rankText = rank.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());

  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  return (
    <Fragment>
      <BlackTileBackground />
      <ScreenContent
        edges={["top"]}
        scrollable
        HeaderComponent={<RoundPreviewHeader title={rankText} />}
      >
        <MiniHand
          hand={parsedHand}
          selectedCardIndex={selectedCardIndex}
          setSelectedCardIndex={setSelectedCardIndex}
        />
        <PreviewHand
          hand={parsedHand}
          selectedCardIndex={selectedCardIndex}
          setSelectedCardIndex={setSelectedCardIndex}
        />
      </ScreenContent>
    </Fragment>
  );
}