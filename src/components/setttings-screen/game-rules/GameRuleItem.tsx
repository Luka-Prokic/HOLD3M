import { GameRule } from "@/components/setttings-screen/game-rules/game.rules.schema";
import { ButtonGlassOption } from "@/components/setttings-screen/ButtonGlassOption";
import { GlassCard } from "@/components/ui/buttons/GlassCard";
import { Paragraph } from "@/components/ui/texts/Paragraph";
import { EndOfRoundSelector } from "@/components/setttings-screen/game-rules/EndOfRoundSelector";
import { useGameStore } from "@/stores/game/gameStore";
import { Fragment } from "react";

interface GameRuleItemProps {
    item: GameRule;
}

export function GameRuleItem({ item }: GameRuleItemProps) {
    const { endOfRoundTime } = useGameStore();

    return (
        <Fragment>
            {item.title === "End of Round" &&
                <GlassCard style={{ gap: 8 }}>
                    <Paragraph icon={item.icon} title={`${item.title} - ${endOfRoundTime}`} description={item.description} />
                    <EndOfRoundSelector />
                </GlassCard>
            }

            {item.title === "Hands & Ranks" &&
                <ButtonGlassOption icon={item.icon} title={item.title} description={item.description} label="View Ranks" onPress={() => { }} />
            }

            {item.title !== "End of Round" && item.title !== "Hands & Ranks" &&
                <GlassCard style={{ gap: 8 }}>
                    <Paragraph icon={item.icon} title={item.title} description={item.description} />
                </GlassCard>
            }
        </Fragment>
    )
}