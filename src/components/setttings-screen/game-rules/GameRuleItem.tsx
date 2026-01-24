import { GameRule } from "@/components/setttings-screen/game-rules/game.rules";
import { QueenButton } from "@/components/ui/buttons/QueenButton";
import { GlassCard } from "@/components/ui/buttons/GlassCard";
import { Paragraph } from "@/components/ui/texts/Paragraph";
import { EndOfRoundSelector } from "@/components/setttings-screen/game-rules/EndOfRoundSelector";
import { useGameStore } from "@/stores/game/useGameStore";

interface GameRuleItemProps {
    rule: GameRule;
}

export function GameRuleItem({ rule }: GameRuleItemProps) {
    const { endOfRoundTime } = useGameStore();

    if (rule.title === "End of Round") {
        return <GlassCard style={{ gap: 8 }}>
            <Paragraph icon={rule.icon} title={`${rule.title} - ${endOfRoundTime}`} description={rule.description} />
            <EndOfRoundSelector />
        </GlassCard>
    }

    if (rule.title === "Hands & Ranks") {
        return <GlassCard style={{ gap: 8 }}>
            <Paragraph icon={rule.icon} title={rule.title} description={rule.description} />
            <QueenButton title="View Ranks" onPress={() => { }} buttonStyle={{ width: "100%" }} />
        </GlassCard>
    }


    return <GlassCard><Paragraph icon={rule.icon} title={rule.title} description={rule.description} /></GlassCard>
}