import { Fragment } from 'react';
import { Stack } from 'expo-router/stack';
import { useThemeStore } from '@/stores/themeStore';

export default function Layout() {
  const { tintColor } = useThemeStore();

  return (
    <Fragment>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: tintColor,
          },
        }}
      >
        <Stack.Screen
          name="index"
        />
        <Stack.Screen
          name="app-appearance"
        />
      </Stack>
    </Fragment>

  );
}