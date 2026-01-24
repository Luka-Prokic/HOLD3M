import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useSettingsStore } from "@/stores/settings/settingsStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewStyle } from "react-native";
import { forwardRef } from "react";

interface IBottomSheetProps extends BottomSheetModalProps {
  children: React.ReactNode;
  bottomSheetStyle?: ViewStyle | ViewStyle[];
}

export const IBottomSheet = forwardRef<BottomSheetModal, IBottomSheetProps>(({
  children,
  bottomSheetStyle,
  ...props
}, ref) => {
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDismissOnClose
      keyboardBehavior="fillParent"
      keyboardBlurBehavior="restore"
      handleIndicatorStyle={{ backgroundColor: theme.handle }}
      backgroundStyle={{ backgroundColor: theme.surface }}
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
        style={[
          {
            flex: 1,
            padding: 16,
            paddingVertical: 32,
            justifyContent: "flex-start",
            paddingBottom: insets.bottom,
            alignItems: "center",
            ...bottomSheetStyle,
          },
        ]}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});
