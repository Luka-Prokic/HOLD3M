import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { Theme, useThemeStore } from "@/stores/themeStore";
import { View, Text } from "react-native";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { AccentTintButton } from "@/components/ui/buttons/AccentTintButton";
import { SettingsScreenBackground } from "@/components/ui/backgrounds/SettingsScreenBackground";
import { SwitchButton } from "@/components/ui/buttons/SwitchButton";
import { WIDTH } from "@/utils/Dimensions";

export default function Page() {
    const { setTheme, themeName, theme } = useThemeStore();

    return (
        <Fragment>
            <SettingsScreenBackground />
            <ScreenContent
                edges={["top"]}
                HeaderComponent={<SettingsHeader title="Appearance" showBack />} >
                <View style={{ padding: 16, gap: 16 }}>
                    <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 24, fontWeight: "800", color: theme.text }}>Theme</Text>
                        <SwitchButton
                            optionOne="LIGHT"
                            optionTwo="DARK"
                            value={themeName.toUpperCase()}
                            onChange={(val) => setTheme(val.toLowerCase() as Theme)}
                            width={(WIDTH - 32) / 2}
                            height={54}
                            hideOtherOption
                        />
                    </View>


                    <AccentTintButton title="Crimson" tint={"#FF8A78"} accent={"#7A3E2A"} />
                    <AccentTintButton title="Lavender" tint={"#B7AEFF"} accent={"#5747E5"} />
                    <AccentTintButton title="Mono" tint={"#8C867C"} accent={"#2A2723"} />
                </View>
            </ScreenContent>
        </Fragment >
    );
}
