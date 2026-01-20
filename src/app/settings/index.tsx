import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { AceButton } from "@/components/ui/buttons/AceButton";
import { useThemeStore } from "@/stores/themeStore";
import { EndDayButton } from "@/components/ui/mock/EndDayButton";
import { View } from "react-native";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { AccentTintButton } from "@/components/ui/buttons/AccentTintButton";

export default function Page() {
    const { setTheme, themeName } = useThemeStore();

    const darkLabel = themeName === "dark" ? "> DARK <" : "DARK";
    const lightLabel = themeName === "light" ? "> LIGHT <" : "LIGHT";

    return (
        <Fragment>
            <ScreenContent
                edges={["top"]}
                HeaderComponent={<SettingsHeader />} >
                <View style={{ padding: 16, gap: 8 }}>
                    <EndDayButton />
                    <AceButton title={darkLabel} onPress={() => setTheme("dark")} themeType="accent" />
                    <AceButton title={lightLabel} onPress={() => setTheme("light")} themeType="tint" />

                    <AccentTintButton title="Crimson" tint={"#FF8A78"} accent={"#7A3E2A"} />
                    <AccentTintButton title="Frost" tint={"#B7AEFF"} accent={"#5747E5"} />
                    <AccentTintButton title="Mono" tint={"#8C867C"} accent={"#2A2723"} />
                </View>
            </ScreenContent>
        </Fragment >
    );
}
