import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { View } from "react-native";
import { HomeHeader } from "@/components/home-screen/HomeHeader";
import { HomeFooter } from "@/components/home-screen/HomeFooter";
import { HomeScreenBackground } from "@/components/ui/backgrounds/HomeScreenBackground";
import { CurrentRound } from "@/components/home-screen/CurrentRound";
import { CurrentHand } from "@/components/hands/CurrentHand";

export default function Page() {

  return (
    <Fragment>
      <HomeScreenBackground />
      <ScreenContent
        edges={["top", "bottom"]}
        HeaderComponent={<HomeHeader />}
        FooterComponent={<HomeFooter />}
      >
        <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center", paddingVertical: 32 }}>
          <CurrentRound />
          <CurrentHand />
        </View>
      </ScreenContent>
    </Fragment >
  );
}
