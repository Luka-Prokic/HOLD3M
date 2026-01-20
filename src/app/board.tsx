import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { HeaderButton } from "@/components/ui/buttons/HeaderButton";

export default function Page() {
  function handleBackPress() {
    router.dismissTo("/hand");
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerLeft: () => <HeaderButton title="Back" onPress={handleBackPress} />,
        }} />
      <ScreenContent>

      </ScreenContent>
    </Fragment >
  );
}
