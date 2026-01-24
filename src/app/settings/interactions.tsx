import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { SettingsScreenBackground } from "@/components/ui/backgrounds/SettingsScreenBackground";
import { Content } from "@/components/ui/screens/Content";
import { INTERACTIONS_SCHEMA } from "@/components/setttings-screen/Interactions /interactions";
import { InteractionItem } from "@/components/setttings-screen/Interactions /InteractionItem";

export default function Page() {
    return (
        <Fragment>
            <SettingsScreenBackground />
            <ScreenContent
                edges={["top"]}
                scrollable
                HeaderComponent={<SettingsHeader title="Interactions" showBack />} >
                <Content style={{ gap: 32 }}>
                    {INTERACTIONS_SCHEMA.map((interaction) => (
                        <InteractionItem key={interaction.title} item={interaction} />
                    ))}
                </Content>
            </ScreenContent>
        </Fragment >
    );
}
