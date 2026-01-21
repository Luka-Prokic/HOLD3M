import { IBottomSheet } from "../ui/modals/IBottomSheet"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { Text } from "react-native"
import { forwardRef } from "react"
import { Hand } from "@/stores/types"
import { useThemeStore } from "@/stores/themeStore"
import { useBalletFont } from "@/utils/fonts/useBalletFont"

interface HandInfoBottomSheetProps {
    hand: Hand;
}

export const HandInfoBottomSheet = forwardRef<BottomSheetModal, HandInfoBottomSheetProps>(({ hand }, ref) => {
    const { theme } = useThemeStore();
    const { fontFamily } = useBalletFont();
    const rank = hand.rank.type;

    return (
        <IBottomSheet ref={ref}>
            <Text style={{ fontSize: 48, padding: 16, color: theme.text, fontFamily }}>
                {rank.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
            </Text>
        </IBottomSheet>
    );
});