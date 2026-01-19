import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useThemeStore } from "@/stores/themeStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewStyle } from "react-native";

interface TransparentBottomSheetProps extends BottomSheetModalProps {
  ref: React.RefObject<BottomSheetModal | null>;
  children: React.ReactNode;
  bottomSheetStyle?: ViewStyle;
}

export function TransparentBottomSheet({
  ref,
  children,
  bottomSheetStyle,
  ...props
}: TransparentBottomSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDismissOnClose
      keyboardBehavior="fillParent"
      keyboardBlurBehavior="restore"
      handleIndicatorStyle={{ backgroundColor: "transparent" }}
      backgroundStyle={{ backgroundColor: "transparent" }}
      snapPoints={["80%"]}
      enableDynamicSizing={false}

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
            paddingBottom: insets.bottom,
            ...bottomSheetStyle,
          },
        ]}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
}
