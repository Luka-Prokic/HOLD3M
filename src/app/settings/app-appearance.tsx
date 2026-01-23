import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { SettingsScreenBackground } from "@/components/ui/backgrounds/SettingsScreenBackground";
import { ColorComboPicker } from "@/components/setttings-screen/app-appearance/ColorComboPicker";
import { Paragraph } from "@/components/ui/texts/Paragraph"; 
import { Content } from "@/components/ui/screens/Content";
import { ThemeSwtichOption } from "@/components/setttings-screen/app-appearance/ThemeSwtichOption";

export default function Page() {

    return (
        <Fragment>
            <SettingsScreenBackground />
            <ScreenContent
                edges={["top"]}
                scrollable
                HeaderComponent={<SettingsHeader title="Appearance" showBack />}
            >

                <Content>
                    <ThemeSwtichOption />

                    <Paragraph
                        icon="color-fill-outline"
                        title="App Color Combo"
                        description="Pick the main colors used across the app."
                    />

                    <ColorComboPicker />
                </Content>
            </ScreenContent>
        </Fragment >
    );
}
