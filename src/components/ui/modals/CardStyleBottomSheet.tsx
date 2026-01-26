import { forwardRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "@/stores/settings/settingsStore";

interface CardStyleBottomSheetProps {
    children?: React.ReactNode;
}

export const CardStyleBottomSheet = forwardRef<BottomSheet, CardStyleBottomSheetProps>(
    ({ children }, ref) => {
        const { theme, isAnimationsEnabled } = useSettingsStore();
        return (
            <BottomSheet
                ref={ref}
                handleStyle={{ opacity: 0, height: 0 }}
                backgroundStyle={{ backgroundColor: theme.darkSurface }}
                animateOnMount={isAnimationsEnabled}
            >
                <BottomSheetView
                    style={{
                        flex: 1,
                        paddingVertical: 16,
                        gap: 16,
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    {children || null}
                </BottomSheetView>
            </BottomSheet>
        );
    }
);