import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { Text, View } from "react-native";
import { useGameStore } from "@/stores/game/useGameStore";
import { JesterInputCard } from "@/components/cards/JesterInputCard";
import { InputCard } from "@/components/cards/InputCard";
import { CardScreenBackground } from "@/components/ui/backgrounds/CardScreenBackground";
import { HeaderButton } from "@/components/ui/buttons/HeaderButton";
import { useThemeStore } from "@/stores/themeStore";
import { AceButton } from "@/components/ui/buttons/AceButton";

export default function Page() {
  const { currentCardIndex, currentHand, setCurrentCardIndex } = useGameStore();
  const { theme } = useThemeStore();
  return (
    <Fragment>
      <Stack.Screen options={{
        headerLeft: () => <HeaderButton title="Hand" onPress={() => router.dismissTo("/hand")} />,
        headerRight: () => <HeaderButton title="Burn" onPress={() => { }} />,
      }} />

      <ScreenContent scroll={false}>
        <CardScreenBackground />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: theme.text }} >#{currentCardIndex + 1}</Text>
          {currentHand[currentCardIndex] ? (
            <InputCard card={currentHand[currentCardIndex]} />
          ) : (
            <JesterInputCard />
          )}
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <AceButton title="Prev" onPress={() => setCurrentCardIndex(currentCardIndex - 1)} disabled={currentCardIndex === 0} />
            <AceButton title="Next" onPress={() => setCurrentCardIndex(currentCardIndex + 1)} disabled={currentCardIndex === 4} />
          </View>
        </View>
      </ScreenContent>
    </Fragment >
  );
}
