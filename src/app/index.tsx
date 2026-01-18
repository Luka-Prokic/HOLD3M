import { Fragment } from "react";
import { router, Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";
import { AceButton } from "@/components/ui/buttons/AceButton";

export default function Page() {
  return (
    <Fragment>
      <Stack.Screen options={{
        headerLeft: () => <AceButton title="Hand" onPress={() => router.push("/hand")} />,
        headerRight: () => <AceButton title="Tune" onPress={() => router.push("/settings")} />,
      }} />
      <ScreenContent>
      </ScreenContent>
    </Fragment >
  );
}
