import { Fragment } from "react";
import { Stack } from "expo-router";
import { ScreenContent } from "@/components/ui/utils/ScreenContent";

export default function Page() {
  return (
    <Fragment>
      <Stack.Screen options={{}} />

      <ScreenContent ></ScreenContent>
    </Fragment >
  );
}
