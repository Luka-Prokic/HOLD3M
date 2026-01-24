import { GlassCard } from "@/components/ui/buttons/GlassCard";
import { Paragraph } from "@/components/ui/texts/Paragraph";
import { Interaction } from "./interactions.schema";
import { SuitButton } from "@/components/ui/buttons/SuitButton";
import { SwitchGlassOption } from "../SwitchGlassOption";
import { WIDTH } from "@/utils/Dimensions";
import { Fragment } from "react";
import { useSettingsStore } from "@/stores/settings/settingsStore";

interface InteractionItemProps {
    item: Interaction;
}

export function InteractionItem({ item }: InteractionItemProps) {
    const { hapticsIntensity, setHapticsIntensity, isAnimationsEnabled, setIsAnimationsEnabled } = useSettingsStore();

    return (
        <Fragment>
            {item.title === "Haptics Intensity" &&
                <GlassCard style={{ gap: 8 }}>
                    <Paragraph icon={item.icon} title={item.title} description={item.description} />
                    <SuitButton options={["off", "gentle", "max"]} value={hapticsIntensity} onChange={setHapticsIntensity} width={WIDTH - 64} />
                </GlassCard>
            }
            {item.title === "Animations" &&
                <SwitchGlassOption title={item.title} description={item.description} value={isAnimationsEnabled} onChange={setIsAnimationsEnabled} />
            }
            {item.title !== "Haptics Intensity" && item.title !== "Animations" &&
                <GlassCard style={{ gap: 8 }}>
                    <Paragraph icon={item.icon} title={item.title} description={item.description} />
                </GlassCard>
            }
        </Fragment>
    )
}