import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { FlatList } from "react-native";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { PremadeDiamondBackground } from "@/components/ui/backgrounds/PremadeDiamondBackground";
import { SETTINGS_SCHEMA } from "@/components/setttings-screen/settings.schema";
import { SettingsButton } from "@/components/setttings-screen/SettingsButton";
import { SettingsFooter } from "@/components/setttings-screen/SettingsFooter";

export default function Page() {

    return (
        <Fragment>
            <PremadeDiamondBackground />
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
