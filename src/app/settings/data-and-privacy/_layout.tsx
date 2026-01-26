import { Fragment } from 'react';
import { Stack } from 'expo-router/stack';
import { useSettingsStore } from '@/stores/settings/settingsStore';

export default function Layout() {
  const { tintColor } = useSettingsStore();

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
          name="export-data"
        />
        <Stack.Screen
          name="import-data"
        />
        <Stack.Screen
          name="reset-app"
        />
      </Stack>
    </Fragment>

  );
}