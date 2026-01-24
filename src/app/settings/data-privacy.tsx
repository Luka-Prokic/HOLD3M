import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { SettingsScreenBackground } from "@/components/ui/backgrounds/SettingsScreenBackground";
import { Content } from "@/components/ui/screens/Content";
import { DATA_AND_PRIVACY_SCHEMA } from "@/components/setttings-screen/data-&-privacy/data.and.privacy";
import { DataAndPrivacyItem } from "@/components/setttings-screen/data-&-privacy/DataAndPrivacyItem";

export default function Page() {

    return (
        <Fragment>
            <SettingsScreenBackground />
            <ScreenContent
                edges={["top"]}
                scrollable
                HeaderComponent={<SettingsHeader title="Data & Privacy" showBack />} >
                <Content style={{ gap: 32 }}>
                    {DATA_AND_PRIVACY_SCHEMA.map((rule) => (
                        <DataAndPrivacyItem key={rule.title} item={rule} />
                    ))}
                </Content>
            </ScreenContent>
        </Fragment >
    );
}
