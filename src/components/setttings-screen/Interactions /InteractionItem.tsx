import { GlassCard } from "@/components/ui/buttons/GlassCard";
import { Paragraph } from "@/components/ui/texts/Paragraph";
import { Interaction } from "./interactions";
import { SuitButton } from "@/components/ui/buttons/SuitButton";
import { SwitchGlassOption } from "../SwitchGlassOption";
import { WIDTH } from "@/utils/Dimensions";
import { useState } from "react";


interface InteractionItemProps {
    item: Interaction;
}

export function InteractionItem({ item }: InteractionItemProps) {

    const [hapticsIntensity, setHapticsIntensity] = useState<("off" | "gentle" | "MAX")>("off");
    const [animations, setAnimations] = useState<boolean>(false);

    if (item.title === "Haptics Intensity") {
        return <GlassCard style={{ gap: 8 }}>
            <Paragraph icon={item.icon} title={item.title} description={item.description} />
            <SuitButton options={["off", "gentle", "MAX"]} value={hapticsIntensity} onChange={setHapticsIntensity} width={WIDTH - 64} />
        </GlassCard>
    }

    if (item.title === "Animations") {
        return <SwitchGlassOption title={item.title} description={item.description} value={animations} onChange={setAnimations} />
    }


    return <GlassCard><Paragraph icon={item.icon} title={item.title} description={item.description} /></GlassCard>
}