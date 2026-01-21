import { ViewStyle } from "react-native";
import Svg, { Rect, G } from "react-native-svg";

interface DiamondTileBackgroundProps {
  columns: number;
  rows: number;
  squareSize: number; // horizontal diagonal length
  ratio?: number;     // vertical / horizontal diagonal ratio
  color?: string;
  style?: ViewStyle;
}

export function DiamondTileBackground({
  columns,
  rows,
  squareSize,
  ratio = 1.2,
  color = "#000",
  style,
}: DiamondTileBackgroundProps) {
  // base square side derived from horizontal diagonal
  const side = squareSize / Math.SQRT2;

  // spacing follows actual diamond extents
  const spacingX = squareSize;
  const spacingY = squareSize * ratio;

  const width = columns * spacingX;
  const height = rows * spacingY;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={style}
    >
      <G>
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: columns }).map((_, col) => {
            const cx = col * spacingX + spacingX / 2;
            const cy = row * spacingY + spacingY / 2;

            return (
              <Rect
                key={`${row}-${col}`}
                x={cx - side / 2}
                y={cy - side / 2}
                width={side}
                height={side}
                fill={color}
                transform={`
                  translate(${cx} ${cy})
                  scale(1 ${ratio})
                  rotate(45)
                  translate(${-cx} ${-cy})
                `}
              />
            );
          })
        )}
      </G>
    </Svg>
  );
}