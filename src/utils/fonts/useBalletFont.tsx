import { useFonts } from "expo-font";

export function useBalletFont() {
  const [fontsLoaded] = useFonts({
    "Ballet-Regular": require("../../../assets/fonts/Ballet-Regular-VariableFont_opsz.ttf"),
  });

  return fontsLoaded ? { fontFamily: "Ballet-Regular" } : {};
}