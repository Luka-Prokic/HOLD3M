import { IBottomSheet } from "../ui/modals/IBottomSheet"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { Text } from "react-native"


interface HandInfoBottomSheetProps {
    ref: React.RefObject<BottomSheetModal>;
}

export function HandInfoBottomSheet({ ref }: HandInfoBottomSheetProps) {
    return (
        <IBottomSheet ref={ref}>
            <Text>Hand Info</Text>
        </IBottomSheet>
    );
}