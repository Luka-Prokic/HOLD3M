import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useSettingsStore } from "@/stores/settings/settingsStore";
import { ViewStyle } from "react-native";
import { forwardRef } from "react";
import { PremadeDiamondBackground } from "../backgrounds/PremadeDiamondBackground";

interface BlackBottomSheetProps extends BottomSheetModalProps {
  children: React.ReactNode;
  bottomSheetStyle?: ViewStyle | ViewStyle[];
}

export const BlackBottomSheet = forwardRef<BottomSheetModal, BlackBottomSheetProps>(({
  children,
  bottomSheetStyle,
  ...props
}, ref) => {
  const { theme } = useSettingsStore();

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDismissOnClose
      keyboardBehavior="fillParent"
      keyboardBlurBehavior="restore"
      handleIndicatorStyle={{ backgroundColor: theme.handle }}
      handleStyle={{ backgroundColor: theme.darkSurface }}
      backgroundStyle={{ backgroundColor: theme.darkSurface }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
          opacity={0.2}
        />
      )}
      {...props}
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
        <PremadeDiamondBackground color={theme.lightSurface + "10"} />
        {children || null}
      </BottomSheetView>
    </BottomSheetModal>
  );
});
