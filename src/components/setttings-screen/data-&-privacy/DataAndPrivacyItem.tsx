import { GlassCard } from "@/components/ui/buttons/GlassCard";
import { Paragraph } from "@/components/ui/texts/Paragraph";
import { DataAndPrivacy } from "./data.and.privacy.schema";
import { SwitchGlassOption } from "../SwitchGlassOption";
import { Fragment } from "react";
import { ButtonGlassOption } from "../ButtonGlassOption";
import { QueenButton } from "@/components/ui/buttons/QueenButton";
import { WIDTH } from "@/utils/Dimensions";
import { useSettingsStore } from "@/stores/settings/settingsStore";

interface DataAndPrivacyItemProps {
    item: DataAndPrivacy;
}

export function DataAndPrivacyItem({ item }: DataAndPrivacyItemProps) {
    const { theme } = useSettingsStore();

    return <Fragment>
        {item.title === "Notifications" &&
            <SwitchGlassOption title={item.title} description={item.description} value={true} onChange={() => { }} />
        }
        {item.title === "Incognito" &&
            <SwitchGlassOption title={item.title} description={item.description} value={false} onChange={() => { }} />
        }
        {item.title === "Export Data" &&
            <ButtonGlassOption icon={item.icon} title={item.title} description={item.description} label={item.label} onPress={() => { }} />
        }
        {item.title === "Import Data" &&
            <ButtonGlassOption icon={item.icon} title={item.title} description={item.description} label={item.label} onPress={() => { }} />
        }
        {item.title === "About Your Data" &&
            <Paragraph icon={item.icon} title={item.title} description={item.description} style={{ paddingHorizontal: 16 }} />
        }
        {item.title === "Reset All Data" &&
            <GlassCard style={{ gap: 8 }}>
                <Paragraph icon={item.icon} title={item.title} description={item.description} />
                <QueenButton title={item.label} onPress={() => { }} themeType="custom" width={WIDTH - 64} gradientColor={theme.warning} buttonColor={theme.darkSurface} />
            </GlassCard>
        }

    </Fragment>
}