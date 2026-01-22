import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { FlatList } from "react-native";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { SETTINGS_SCHEMA } from "@/components/setttings-screen/settings.schema";
import { SettingsButton } from "@/components/setttings-screen/SettingsButton";
import { SettingsFooter } from "@/components/setttings-screen/SettingsFooter";
import { SettingsScreenBackground } from "@/components/ui/backgrounds/SettingsScreenBackground";

export default function Page() {

    return (
        <Fragment>
            <SettingsScreenBackground />
            <ScreenContent
                edges={["top"]}
                HeaderComponent={<SettingsHeader />} >
                <FlatList
                    data={SETTINGS_SCHEMA}
                    renderItem={({ item }) => <SettingsButton icon={item.icon} title={item.title} description={item.description} onPress={item.onPress} />}
                    contentContainerStyle={{ padding: 16, gap: 16 }}
                    ListFooterComponent={() => <SettingsFooter />}
                />
            </ScreenContent>
        </Fragment >
    );
}
