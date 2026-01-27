import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import HandRankBoard from "@/components/rank-screen/HandRankBoard";
import { PremadeDiamondBackground } from "@/components/ui/backgrounds/PremadeDiamondBackground";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { IText } from "@/components/ui/texts/IText";
import { useBalletFont } from "@/utils/fonts/useBalletFont";

export default function Page() {
  const { theme } = useSettingsStore();
  const { fontFamily } = useBalletFont();

  return (
    <Fragment>
      <PremadeDiamondBackground color={theme.lightSurface + "10"} />
      <ScreenContent
        scrollable
        disableFadedEdges
      >
        <IText
          text="Hand Ranks"
          size={48}
          color={theme.lightSurface}
          style={{
            fontFamily,
            shadowColor: theme.lightSurface,
            shadowOffset: { width: 1, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 4,
            width: "100%",
            textAlign: "center",
            paddingTop: 16,
          }} />
        <HandRankBoard />
      </ScreenContent>
    </Fragment >
  );
}
