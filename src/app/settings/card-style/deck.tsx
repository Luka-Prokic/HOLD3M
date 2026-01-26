import { Fragment, useRef } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { SettingsScreenBackground } from "@/components/ui/backgrounds/SettingsScreenBackground";
import BottomSheet from "@gorhom/bottom-sheet";
import { CardStyleBottomSheet } from "@/components/ui/modals/CardStyleBottomSheet";
import { IText } from "@/components/ui/texts/IText";

export default function Page() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    return (
        <Fragment>
            <SettingsScreenBackground />
            <ScreenContent
                edges={["top"]}
                HeaderComponent={<SettingsHeader title="Deck of Cards" backToSettings />} >

                <CardStyleBottomSheet ref={bottomSheetRef}>
                    <IText text="Cooming soon..." white header />
                </CardStyleBottomSheet>
            </ScreenContent>
        </Fragment >
    );
}
