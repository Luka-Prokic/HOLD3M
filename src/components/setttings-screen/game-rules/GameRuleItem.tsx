import { GameRule } from "@/components/setttings-screen/game-rules/game.rules";
import { QueenButton } from "@/components/ui/buttons/QueenButton";
import { GlassCard } from "@/components/ui/buttons/GlassCard";
import { Paragraph } from "@/components/ui/texts/Paragraph";
import { EndOfRoundSelector } from "@/components/setttings-screen/game-rules/EndOfRoundSelector";
import { useGameStore } from "@/stores/game/useGameStore";

interface GameRuleItemProps {
    item: GameRule;
}

export function GameRuleItem({ item }: GameRuleItemProps) {
    const { endOfRoundTime } = useGameStore();

    if (item.title === "End of Round") {
        return <GlassCard style={{ gap: 8 }}>
            <Paragraph icon={item.icon} title={`${item.title} - ${endOfRoundTime}`} description={item.description} />
            <EndOfRoundSelector />
        </GlassCard>
    }

    if (item.title === "Hands & Ranks") {
        return <GlassCard style={{ gap: 8 }}>
            <Paragraph icon={item.icon} title={item.title} description={item.description} />
            <QueenButton title="View Ranks" onPress={() => { }} buttonStyle={{ width: "100%" }} />
        </GlassCard>
    }


    return <GlassCard><Paragraph icon={item.icon} title={item.title} description={item.description} /></GlassCard>
}