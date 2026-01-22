import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { View } from "react-native";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { SettingsScreenBackground } from "@/components/ui/backgrounds/SettingsScreenBackground";

export default function Page() {
    return (
        <Fragment>
            <SettingsScreenBackground />
            <ScreenContent
                edges={["top"]}
                HeaderComponent={<SettingsHeader title="Game Rules" showBack />} >
                <View style={{ padding: 16, gap: 8 }}>
                </View>
            </ScreenContent>
        </Fragment >
    );
}
