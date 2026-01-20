import { Stack } from 'expo-router/stack';
import { useThemeStore } from '@/stores/themeStore';

export default function Layout() {
  const { theme } = useThemeStore();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
      />
    </Stack>
  );
}