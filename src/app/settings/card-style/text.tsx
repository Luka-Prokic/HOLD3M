import { Fragment, useRef } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { SettingsScreenBackground } from "@/components/ui/backgrounds/SettingsScreenBackground";
import BottomSheet from "@gorhom/bottom-sheet";
import { View } from "react-native";
import { CardStyleBottomSheet } from "@/components/ui/modals/CardStyleBottomSheet";
import { FocusCard } from "@/components/cards/FocusCard";
import { CardTextWeightSelector } from "@/components/setttings-screen/card-style/CardTextWeightSelector";
import { CardTextFontSelector } from "@/components/setttings-screen/card-style/CardTextFontSelector";
import { CardTextSizeSelector } from "@/components/setttings-screen/card-style/CardTextSizeSelector";

export default function Page() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    return (
        <Fragment>
            <SettingsScreenBackground />
            <ScreenContent
                edges={["top"]}
                HeaderComponent={<SettingsHeader title="Card Text" backToSettings />} >
                <View style={{ zIndex: 0, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" }}>
                    <FocusCard
                        card={
                            {
                                id: "color",
                                text: `"Your habit here"`,
                                repetition: 1,
                                suit: "hearts",
                                createdAt: Date.now()
                            }}
                    />
                </View>

                <CardStyleBottomSheet ref={bottomSheetRef}>
                    <CardTextSizeSelector />
                    <CardTextWeightSelector />
                    <CardTextFontSelector />
                </CardStyleBottomSheet>
            </ScreenContent>
        </Fragment >
    );
}
