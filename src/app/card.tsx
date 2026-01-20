import { Fragment } from "react";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { CardScreenBackground } from "@/components/ui/backgrounds/CardScreenBackground";
import { FocusedHand } from "@/components/hand-screen/FocusedHand";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useThemeStore } from "@/stores/themeStore";

export default function Page() {

  return (
    <Fragment>
      <ScreenContent HeaderComponent={<FooterComponent />} >
      </ScreenContent>
      <CardScreenBackground />
      <FocusedHand />
    </Fragment >
  );
}


function FooterComponent() {
  const { accentColor, tintColor, themeName } = useThemeStore();

  const chevronColor = themeName === "light" ? accentColor : tintColor;

  function handlePress() {
    router.back();
  }
  return (

    <Pressable style={{ height: 120, zIndex: 1, justifyContent: "center", alignItems: "center" }} onPress={handlePress} >
      <Ionicons name="chevron-down" size={96} color={chevronColor} />
    </Pressable>
  );
}