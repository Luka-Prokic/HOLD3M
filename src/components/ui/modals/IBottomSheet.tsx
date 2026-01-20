import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useThemeStore } from "@/stores/themeStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewStyle } from "react-native";

interface IBottomSheetProps extends BottomSheetModalProps {
  ref: React.RefObject<BottomSheetModal | null>;
  children: React.ReactNode;
  bottomSheetStyle?: ViewStyle | ViewStyle[];
}

export function IBottomSheet({
  ref,
  children,
  bottomSheetStyle,
  ...props
}: IBottomSheetProps) {
  const { theme } = useThemeStore();
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
            borderTopColor: theme.border,
            borderTopWidth: 1,
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
}
