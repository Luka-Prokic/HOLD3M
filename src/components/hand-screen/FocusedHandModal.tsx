import { Pressable } from "react-native";
import { Fragment, useRef } from "react";
import { TransparentBottomSheet } from "../ui/modals/TransparentBottomSheet";
import { FocusedHand } from "./FocusedHand";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export function FocusedHandModal({ children }: { children: React.ReactNode }) {
    const bottomSheetRef = useRef<BottomSheetModal>(null);


    return (
        <Fragment>
            <Pressable onPress={() => bottomSheetRef.current?.present()}>
                {children}
            </Pressable>
            <TransparentBottomSheet ref={bottomSheetRef}>
                <FocusedHand />
            </TransparentBottomSheet>
        </Fragment >

    );
}