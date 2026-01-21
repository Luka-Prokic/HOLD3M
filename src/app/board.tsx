import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/screens/ScreenContent";
import { SettingsHeader } from "@/components/setttings-screen/SettingsHeader";
import { WIDTH } from "@/utils/Dimensions";
import { FlatList } from "react-native-gesture-handler";
import { MiniHand } from "@/components/hands/MiniHand";
import { useGameStore } from "@/stores/game/useGameStore";

export default function Page() {
  const { rounds } = useGameStore();

  return (
    <Fragment>
      <ScreenContent edges={["top"]} HeaderComponent={<SettingsHeader />}>
        <FlatList data={rounds} renderItem={({ item }) => <MiniHand hand={item} />} style={{ width: WIDTH }} />

      </ScreenContent>
    </Fragment >
  );
}
