import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { InputModal } from "@/components/ui/modals/InputModal";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { View } from "react-native";
import { WIDTH } from "@/utils/Dimensions";

export default function Page() {


  const cardHeight = (WIDTH - 48) * 1.4;
  const cardWidth = WIDTH - 48;

  return (
    <Fragment>
      <ScreenContent edges={["top"]} HeaderComponent={<SettingsHeader />}>
        <View style={{ width: WIDTH, height: cardHeight }}>

          <InputModal style={{ width: cardWidth, height: cardHeight, marginHorizontal: 24 }} />
        </View>
      </ScreenContent>
    </Fragment >
  );
}
