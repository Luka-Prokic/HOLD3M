import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { SettingsScreenBackground } from "@/components/ui/backgrounds/SettingsScreenBackground";
import { ColorComboPicker } from "@/components/setttings-screen/app-appearance/ColorComboPicker";
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

                    <ColorComboPicker />
                </Content>
            </ScreenContent>
        </Fragment >
    );
}
