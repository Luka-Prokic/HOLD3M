import { Platform, Vibration } from "react-native";
import * as Haptics from "expo-haptics";
import { HapticsIntensity } from "@/stores/settings/types";
import { useSettingsStore } from "@/stores/settings/settingsStore";

export type IntentHaptic = "sharp" | "bold";
export type SystemHaptic = "success" | "warning" | "error";
export type HapticType = IntentHaptic | SystemHaptic;

/**
 * Intent → impact style mapping
 */
const INTENT_MAP: Record<
    IntentHaptic,
    Record<Exclude<HapticsIntensity, "off">, Haptics.ImpactFeedbackStyle>
> = {
    sharp: {
        gentle: Haptics.ImpactFeedbackStyle.Soft,
        max: Haptics.ImpactFeedbackStyle.Rigid,
    },
    bold: {
        gentle: Haptics.ImpactFeedbackStyle.Light,
        max: Haptics.ImpactFeedbackStyle.Heavy,
    },
};

/**
 * System haptics
 */
const SYSTEM_MAP: Record<SystemHaptic, Haptics.NotificationFeedbackType> = {
    success: Haptics.NotificationFeedbackType.Success,
    warning: Haptics.NotificationFeedbackType.Warning,
    error: Haptics.NotificationFeedbackType.Error,
};

/**
 * Fire haptic feedback
 */
export function haptic(type: HapticType) {
    const { hapticsIntensity } = useSettingsStore.getState();
    if (hapticsIntensity === "off") return;

    if (Platform.OS !== "ios") {
        Vibration.vibrate(10);
        return;
    }

    if (type in SYSTEM_MAP) {
        Haptics.notificationAsync(SYSTEM_MAP[type as SystemHaptic]);
        return;
    }

    const style = INTENT_MAP[type as IntentHaptic][hapticsIntensity as Exclude<HapticsIntensity, "off">];
    if (style) {
        Haptics.impactAsync(style);
    }
}


export function hapticMax(type: HapticType) {
    const { hapticsIntensity } = useSettingsStore.getState();

    if (hapticsIntensity === "off") return;

    if (Platform.OS !== "ios") {
        Vibration.vibrate(10);
        return;
    }

    if (type in SYSTEM_MAP) {
        Haptics.notificationAsync(SYSTEM_MAP[type as SystemHaptic]);
        return;
    }

    const style = INTENT_MAP[type as IntentHaptic].max;

    Haptics.impactAsync(style);
}