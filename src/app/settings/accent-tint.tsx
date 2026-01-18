import { Fragment } from "react";
import { Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { AccentTintButton } from "@/components/ui/buttons/AccentTintButton";

export default function Page() {

    return (
        <Fragment>
            <Stack.Screen options={{ headerShown: false }} />

            <ScreenContent >
                <AccentTintButton title="Crimson" tint={"#FF8A78"} accent={"#7A3E2A"} />
                <AccentTintButton title="Vapor" tint={"#B7AEFF"} accent={"#5747E5"} />
                <AccentTintButton title="Mono" tint={"#8C867C"} accent={"#2A2723"} />
            </ScreenContent>
        </Fragment >
    );
}
