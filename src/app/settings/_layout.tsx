import { Fragment } from 'react';
import { Stack } from 'expo-router/stack';
import { PremadeDiamondBackground } from '@/components/ui/backgrounds/PremadeDiamondBackground';

export default function Layout() {
  return (
    <Fragment>
      <PremadeDiamondBackground />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack.Screen
          name="index"
        />
      </Stack>
    </Fragment>

  );
}