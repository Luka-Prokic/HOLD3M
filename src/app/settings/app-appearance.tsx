import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { Theme, useThemeStore } from "@/stores/themeStore";
import { View } from "react-native";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { AccentTintButton } from "@/components/ui/buttons/AccentTintButton";
import { PremadeDiamondBackground } from "@/components/ui/backgrounds/PremadeDiamondBackground";
import { SwitchButton } from "@/components/ui/buttons/SwitchButton";
import { WIDTH } from "@/utils/Dimensions";

export default function Page() {
    const { setTheme, themeName } = useThemeStore();

    return (
        <Fragment>
            <PremadeDiamondBackground />
            <ScreenContent
                edges={["top"]}
                HeaderComponent={<SettingsHeader showBack />} >
                <View style={{ padding: 16, gap: 8 }}>
                    <SwitchButton option1="light" option2="dark" value={themeName} onChange={(val) => setTheme(val.toLowerCase() as Theme)} width={(WIDTH - 32) / 2} height={54} />

                    <AccentTintButton title="Crimson" tint={"#FF8A78"} accent={"#7A3E2A"} />
                    <AccentTintButton title="Frost" tint={"#B7AEFF"} accent={"#5747E5"} />
                    <AccentTintButton title="Mono" tint={"#8C867C"} accent={"#2A2723"} />
                </View>
            </ScreenContent>
        </Fragment >
    );
}
