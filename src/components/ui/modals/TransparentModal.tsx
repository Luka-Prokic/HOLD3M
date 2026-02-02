import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetModalProps,
    BottomSheetView,
  } from "@gorhom/bottom-sheet";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import { ViewStyle } from "react-native";
  
  interface TransparentBottomSheetProps extends BottomSheetModalProps {
    ref: React.RefObject<BottomSheetModal | null>;
    children: React.ReactNode;
    bottomSheetStyle?: ViewStyle | ViewStyle[];
    noBackdrop?: boolean;
    customBackdropComponent?: ((props: BottomSheetBackdropProps) => React.ReactNode);
  }
  
  /**
   * ## Usage
   *
   * ```tsx
   * const sheetRef = useRef<BottomSheetModal>(null);
   *
   * <TransparentBottomSheet
   *   ref={sheetRef}
   * >
   *   <YourContent /> //children
   * </TransparentBottomSheet> ```
   *
   * @param ref - Ref to control the BottomSheetModal
   * @param children - Content rendered inside the bottom sheet
   * @param bottomSheetStyle - Optional styles applied to the BottomSheetView
   * @param noBackdrop - If true, disables backdrop entirely
   * @param customBackdropComponent - Custom backdrop renderer
   *
   * @returns A transparent BottomSheetModal wrapper
   */
  
  export function TransparentBottomSheet({
    ref,
    children,
    bottomSheetStyle,
    noBackdrop = false,
    customBackdropComponent,
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
        snapPoints={["100%"]}
        enableDynamicSizing={false}
        backdropComponent={(props) =>
          BackdropComponent({
            noBackdrop,
            customBackdropComponent,
            ...props,
          })
        }
        {...props}
      >
        <BottomSheetView
          style={[
            {
              flex: 1,
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
            bottomSheetStyle,
          ]}
        >
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
  
  
  /**
   * Internal backdrop resolver for TransparentBottomSheet.
   *
   * Priority:
   * 1. noBackdrop → renders nothing
   * 2. customBackdropComponent → user-provided backdrop
   * 3. Default BottomSheetBackdrop
   */
  function BackdropComponent({
    noBackdrop = false,
    customBackdropComponent,
    ...props
  }: {
    noBackdrop: boolean;
    customBackdropComponent?: (
      props: BottomSheetBackdropProps
    ) => React.ReactNode;
  } & BottomSheetBackdropProps) {
    if (noBackdrop) return null;
    if (customBackdropComponent) return customBackdropComponent(props);
  
    return (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
        opacity={0.2}
      />
    );
  }