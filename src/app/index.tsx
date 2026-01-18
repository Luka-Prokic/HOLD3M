import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { HeaderButton } from "@/components/ui/buttons/HeaderButton";
import { useThemeStore } from "@/stores/themeStore";

export default function Page() {
  const { theme } = useThemeStore();
  return (
    <Fragment>
      <Stack.Screen options={{
        headerLeft: () => <HeaderButton title="Hand" onPress={() => router.push("/hand")} />,
        headerRight: () => <HeaderButton title="Tune" onPress={() => router.push("/settings")} />,
        contentStyle: {
          backgroundColor: theme.background,
        },
      }} />
      <ScreenContent edges={["top"]}>
      </ScreenContent>
    </Fragment >
  );
}
