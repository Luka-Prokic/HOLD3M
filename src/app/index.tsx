import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { HeaderButton } from "@/components/ui/buttons/HeaderButton";
import { useThemeStore } from "@/stores/themeStore";
import { AceButton } from "@/components/ui/buttons/AceButton";
import { useGameStore } from "@/stores/game/useGameStore";
import { View } from "react-native";

export default function Page() {
  const { theme } = useThemeStore();
  const { finalizeHand, startNewHand } = useGameStore();

  return (
    <Fragment>
      <Stack.Screen options={{
        headerLeft: () => <HeaderButton title="Hand" onPress={() => router.push("/hand")} />,
        headerRight: () => <HeaderButton title="Tune" onPress={() => router.push("/settings")} />,
        contentStyle: {
          backgroundColor: theme.background,
        },
      }} />
      <ScreenContent edges={["top"]} scroll={false}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <AceButton title="End Hand" onPress={() => finalizeHand()} />
          <AceButton title="New Hand" onPress={() => startNewHand()} />
        </View>
      </ScreenContent>
    </Fragment >
  );
}
