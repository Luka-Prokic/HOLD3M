import { Text, TextProps, TextStyle } from "react-native";
import { useSettingsStore } from "@/stores/settings/settingsStore";
import { Fragment } from "react";
import { CardTextSize, CardTextWeight } from "@/stores/settings/types";

interface ITextProps extends TextProps {
  text: string;
  style?: TextStyle | TextStyle[];
  size?: CardTextSize;
  weight?: CardTextWeight;
  color?: string;
  children?: React.ReactNode;
  align?: "left" | "center" | "right";
  inverted?: boolean;
  gray?: boolean;
  header?: boolean;
  center?: boolean;
  white?: boolean;
}

export function IText({
  text,
  align = "left",
  style,
  size,
  weight,
  color,
  children,
  inverted = false,
  gray = false,
  header = false,
  center = false,
  white = false,
  ...rest
}: ITextProps) {
  const { theme } = useSettingsStore();
  return (
    <Text
      style={{
        fontSize: size ?? (header ? 24 : 18),
        fontWeight: weight ?? (header ? "800" : "600"),
        color: color ?? (inverted ? theme.textInverted : gray ? theme.textGrey : white ? theme.lightSurface : theme.text),
        textAlign: center ? "center" : align,
        ...style,
      }}
      {...rest}
    >
      {children ? (
        <Fragment>
          {text} {children}
        </Fragment>
      ) : (
        text
      )}
    </Text>
  );
}
