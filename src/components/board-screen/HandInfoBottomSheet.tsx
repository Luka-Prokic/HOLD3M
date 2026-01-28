import { BlackBottomSheet } from "../ui/modals/BlackBottomSheet"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { forwardRef, useState } from "react"
import { Hand } from "@/stores/game/types"
import { useSettingsStore } from "@/stores/settings/settingsStore"
import { useBalletFont } from "@/utils/fonts/useBalletFont"
import { IText } from "../ui/texts/IText"
import { MiniHand } from "../hands/MiniHand"
import { PreviewHand } from "../hands/PreviewHand"

interface HandInfoBottomSheetProps {
    hand: Hand;
}

export const HandInfoBottomSheet = forwardRef<BottomSheetModal, HandInfoBottomSheetProps>(({ hand }, ref) => {
    const { theme } = useSettingsStore();
    const { fontFamily } = useBalletFont();
    const rank = hand.rank.type;
    const rankText = rank.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());

    const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);

    return (
        <BlackBottomSheet ref={ref}>
            <IText
                text={rankText}
                size={48}
                style={{
                    padding: 16,
                    fontFamily,
                    shadowColor: theme.lightSurface,
                    shadowOffset: { width: 1, height: 0 },
                    shadowOpacity: 1,
                    shadowRadius: 0,
                    elevation: 4
                }}
                white
                black
            />
            <MiniHand hand={hand} selectedCardIndex={selectedCardIndex} setSelectedCardIndex={setSelectedCardIndex} />
            <PreviewHand hand={hand} selectedCardIndex={selectedCardIndex} setSelectedCardIndex={setSelectedCardIndex} />
        </BlackBottomSheet>
    );
});