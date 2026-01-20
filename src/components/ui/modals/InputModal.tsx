import { useState, useRef, Fragment } from "react";
import { Keyboard, TouchableOpacity, TextInput, ViewStyle, Pressable, Text, View } from "react-native";
import { useThemeStore } from "@/stores/themeStore";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { TransparentBottomSheet } from "./TransparentBottomSheet";

interface InputModalProps {
  style?: ViewStyle | ViewStyle[];
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export function InputModal({ style, placeholder = "Type something...", value = "", onChangeText }: InputModalProps) {
  const { theme } = useThemeStore();
  const [newValue, setNewValue] = useState(value);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  function handleSubmit() {
    onChangeText?.(newValue);
    bottomSheetRef.current?.close();
    Keyboard.dismiss();
  }

  return (
    <Fragment>
      <Pressable style={[{ flex: 1 }, style]} onPress={() => bottomSheetRef.current?.present()}>
        <Text style={{
          flex: 1,
          backgroundColor: theme.input,
          color: newValue.length > 0 ? theme.text : theme.handle,
          borderRadius: 12,
          padding: 12,
          textAlignVertical: "top",
          fontSize: 16,
        }}>{newValue || placeholder}</Text>
      </Pressable>
      <TransparentBottomSheet ref={bottomSheetRef} bottomSheetStyle={{ flex: 1 }}>
        <View style={[{ flex: 1 }, style]}>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: theme.input,
              color: theme.text,
              borderTopRightRadius: 16,
              borderTopLeftRadius: 16,
              padding: 12,
              textAlignVertical: "top",
              fontSize: 16,
            }}
            multiline
            value={newValue}
            onChangeText={setNewValue}
            onSubmitEditing={handleSubmit}
            autoFocus
          />
          <TouchableOpacity
            style={{
              borderTopWidth: 1,
              borderTopColor: theme.handle,
              backgroundColor: theme.input,
              paddingVertical: 16,
              borderBottomRightRadius: 16,
              borderBottomLeftRadius: 16,
              alignItems: "center",
            }}
            onPress={handleSubmit}
          >
            <Ionicons name="caret-down" size={24} color={theme.handle} />
          </TouchableOpacity>
        </View>
      </TransparentBottomSheet>
    </Fragment >
  );
}