import { memo } from "react";
import { ViewStyle } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

type AnimationType = "card" | "wheel" | "album" | "flat";

interface SlideCardProps {
  scrollX: SharedValue<number>;
  index: number;
  content: React.ReactNode;
  width: number;
  height: number;
  animationType?: AnimationType;
}

export const memoizedSlideCard = memo(SlideCard);

export function SlideCard({
  scrollX,
  index,
  content,
  width,
  height,
  animationType = "card",
}: SlideCardProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const center = index * width;
    const distance = scrollX.value - center;

    const opacity =
      animationType === "flat"
        ? 1
        : interpolate(
          Math.abs(distance),
          [0, width, width * 2, width * 3],
          [1, 0.8, 0.6, 0.4],
          Extrapolate.CLAMP
        );

    const scale = interpolate(
      Math.abs(distance),
      [0, width, width * 2, width * 3],
      [1, 0.95, 0.9, 0.85],
      Extrapolate.CLAMP
    );

    let rotateY = "0deg";

    if (animationType === "card") {
      rotateY = `${interpolate(
        distance,
        [-width * 3, -width * 2, -width, 0, width, width * 2, width * 3],
        [-65, -35, -25, 0, 25, 35, 65],
        Extrapolate.CLAMP
      )}deg`;
    }

    if (animationType === "wheel") {
      rotateY = `${interpolate(
        distance,
        [-width * 3, -width * 2, -width, 0, width, width * 2, width * 3],
        [45, 25, 10, 0, -10, -25, -45],
        Extrapolate.CLAMP
      )}deg`;
    }

    if (animationType === "album") {
      rotateY = `${interpolate(
        distance,
        [-width * 3, -width * 2, -width, 0, width, width * 2, width * 3],
        [-55, -55, -55, 0, 55, 55, 55],
        Extrapolate.CLAMP
      )}deg`;
    }

    return {
      width,
      height,
      opacity,
      transform: [
        { scale },
        { perspective: 600 },
        { rotateY },
      ],
    } as ViewStyle;
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      {content}
    </Animated.View>
  );
}