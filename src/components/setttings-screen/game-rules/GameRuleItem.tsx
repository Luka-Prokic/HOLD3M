import { GameRule } from "@/components/setttings-screen/game-rules/game.rules";
import { QueenButton } from "@/components/ui/buttons/QueenButton";
import { GlassCard } from "@/components/ui/sliders/GlassCard";
import { Paragraph } from "@/components/ui/texts/Paragraph";

interface GameRuleItemProps {
    rule: GameRule;
}

export function GameRuleItem({ rule }: GameRuleItemProps) {

    if (rule.title === "End of Round - 00:00") {
        return <GlassCard><Paragraph icon={rule.icon} title={rule.title} description={rule.description} /></GlassCard>
    }

    if (rule.title === "Hands & Ranks") {
        return <GlassCard style={{ gap: 8 }}>
            <Paragraph icon={rule.icon} title={rule.title} description={rule.description} />
            <QueenButton title="View Ranks" onPress={() => { }} buttonStyle={{ width: "100%" }} />
        </GlassCard>
    }


    return <GlassCard><Paragraph icon={rule.icon} title={rule.title} description={rule.description} /></GlassCard>
}