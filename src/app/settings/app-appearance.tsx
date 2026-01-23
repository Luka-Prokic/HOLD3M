import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { Theme, useThemeStore } from "@/stores/themeStore";
import { View, Text } from "react-native";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { SettingsScreenBackground } from "@/components/ui/backgrounds/SettingsScreenBackground";
import { SwitchButton } from "@/components/ui/buttons/SwitchButton";
import { WIDTH } from "@/utils/Dimensions";
import { ColorComboPicker } from "@/components/setttings-screen/app-appearance/ColorComboPicker";

export default function Page() {
    const { setTheme, themeName, theme } = useThemeStore();

    return (
        <Fragment>
            <SettingsScreenBackground />
            <ScreenContent
                edges={["top"]}
                HeaderComponent={<SettingsHeader title="Appearance" showBack />} >
                <View style={{ gap: 16 }}>
                    <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between", padding: 16 }}>
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
                    <View style={{ width: "100%" }}>
                        <Text style={{ fontSize: 24, fontWeight: "800", color: theme.text, paddingHorizontal: 16 }}>Color Combo</Text>
                        <ColorComboPicker />
                    </View>
                </View>
            </ScreenContent>
        </Fragment >
    );
}
