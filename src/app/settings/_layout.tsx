import { Stack } from 'expo-router/stack';
import { useThemeStore } from '@/stores/themeStore';

export default function Layout() {
  const { theme } = useThemeStore();
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: theme.background,
        },
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Settings' }}
      />
    </Stack>
  );
}