import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { SettingsScreenBackground } from "@/components/ui/backgrounds/SettingsScreenBackground";
import { Content } from "@/components/ui/screens/Content";
import { GameRuleItem } from "@/components/setttings-screen/game-rules/GameRuleItem";
import { GAME_RULES_SCHEMA } from "@/components/setttings-screen/game-rules/game.rules";

export default function Page() {
    return (
        <Fragment>
            <SettingsScreenBackground />
            <ScreenContent
                edges={["top"]}
                scrollable
                HeaderComponent={<SettingsHeader title="Game Rules" showBack />} >
                <Content style={{ gap: 32 }}>
                    {GAME_RULES_SCHEMA.map((rule) => (
                        <GameRuleItem key={rule.title} item={rule} />
                    ))}
                </Content>
            </ScreenContent>
        </Fragment >
    );
}
