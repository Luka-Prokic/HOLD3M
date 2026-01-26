import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export interface DataAndPrivacy {
    icon?: keyof typeof Ionicons.glyphMap;
    title: string;
    description: string;
    label?: string;
    onPress?: () => void;
}

export const DATA_AND_PRIVACY_SCHEMA: DataAndPrivacy[] = [
    {
        title: "Notifications",
        description: "Get reminders for your habits, including when rounds start or are about to end. \nYou'll also be notified about any unfinished habits as a round comes to a close.",
    },
    {
        title: "Incognito",
        description: "When enabled, habit names and details won't appear in notifications, keeping your activity private.\n\n*This only works when notifications are turned on.",

    },
    {
        icon: "download-outline",
        title: "Export Data",
        description: "Save a copy of all your app data in JSON format for backup or transfer.",
        label: "Download JSON",
        onPress: () => {
            router.push("/settings/data-and-privacy/export-data");
        },
    },
    {
        icon: "archive-outline",
        title: "Import Data",
        description: "Bring your data back into the app from a previously exported file. This will replace your current data with the imported one.",
        label: "Update App",
        onPress: () => {
            router.push("/settings/data-and-privacy/import-data");
        },
    },
    {
        title: "About Your Data",
        description: "All your habits and entries are stored locally on your device. The app works fully offline and doesn't track or send any personal data.",
    },
    {
        icon: "warning-outline",
        title: "Reset All Data",
        description: "Permanently delete all your habits, entries, and app settings. This cannot be undone.",
        label: "Start Over",
        onPress: () => {
            router.push("/settings/data-and-privacy/reset-app");
        },
    },
];