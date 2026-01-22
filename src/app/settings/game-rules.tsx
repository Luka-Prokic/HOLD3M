import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { AceButton } from "@/components/ui/buttons/AceButton";
import { useThemeStore } from "@/stores/themeStore";
import { View } from "react-native";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { PremadeDiamondBackground } from "@/components/ui/backgrounds/PremadeDiamondBackground";

export default function Page() {
    const { setTheme, themeName } = useThemeStore();

    const darkLabel = themeName === "dark" ? "> DARK <" : "DARK";
    const lightLabel = themeName === "light" ? "> LIGHT <" : "LIGHT";

    return (
        <Fragment>
            <PremadeDiamondBackground />
            <ScreenContent
                edges={["top"]}
                HeaderComponent={<SettingsHeader showBack />} >
                <View style={{ padding: 16, gap: 8 }}>
                    <AceButton title={darkLabel} onPress={() => setTheme("dark")} />
                    <AceButton title={lightLabel} onPress={() => setTheme("light")} />
                </View>
            </ScreenContent>
        </Fragment >
    );
}
