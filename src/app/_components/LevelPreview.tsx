type Point = { row: number; col: number };
type Direction = 'up' | 'down' | 'left' | 'right';

export type PreviewArrow = {
  tail: Point[]; // ordered tail-start → head; last entry MUST equal head
  head: Point;
  direction: Direction;
  variant?: 'default' | 'active' | 'ghost';
};

interface LevelPreviewProps {
  rows: number;
  cols: number;
  mask: string[]; // '#' = playable, '.' = outside
  arrows: PreviewArrow[];
  cellSize?: number;
  themeFill?: string; // shape background tint (ignored if showBackground=false)
  themeStroke?: string; // shape outline (ignored if showBackground=false)
  /** When false, render arrows on plain white — matches the in-game look. */
  showBackground?: boolean;
}

const DIRECTION_VECTORS: Record<Direction, { dr: number; dc: number }> = {
  up: { dr: -1, dc: 0 },
  down: { dr: 1, dc: 0 },
  left: { dr: 0, dc: -1 },
  right: { dr: 0, dc: 1 },
};

const INK = '#0F172A';
const BLUE = '#2563EB';
const GHOST = '#94A3B8';

/**
 * Renders a real Arrow Escape level. Arrows use the game's continuous-tail
 * rendering (tail path → head → wings), matching src/components/arrow/MultiCellArrow.tsx.
 */
export function LevelPreview({
  rows,
  cols,
  mask,
  arrows,
  cellSize = 34,
  themeFill = '#FEE2E2',
  themeStroke = '#FCA5A5',
  showBackground = true,
}: LevelPreviewProps) {
  const width = cols * cellSize;
  const height = rows * cellSize;

  const isPlayable = (r: number, c: number) =>
    r >= 0 && r < rows && c >= 0 && c < cols && mask[r]?.[c] === '#';

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      aria-hidden="true"
    >
      {showBackground && (
        <>
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((__, c) =>
              isPlayable(r, c) ? (
                <rect
                  key={`fill-${r}-${c}`}
                  x={c * cellSize}
                  y={r * cellSize}
                  width={cellSize}
                  height={cellSize}
                  fill={themeFill}
                />
              ) : null,
            ),
          )}
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((__, c) =>
              isPlayable(r, c) ? (
                <rect
                  key={`grid-${r}-${c}`}
                  x={c * cellSize + 0.5}
                  y={r * cellSize + 0.5}
                  width={cellSize - 1}
                  height={cellSize - 1}
                  fill="none"
                  stroke={themeStroke}
                  strokeOpacity={0.4}
                  strokeWidth={1}
                />
              ) : null,
            ),
          )}
        </>
      )}

      {arrows.map((arrow, idx) => (
        <ArrowShape key={idx} arrow={arrow} cellSize={cellSize} />
      ))}
    </svg>
  );
}

function ArrowShape({
  arrow,
  cellSize,
}: {
  arrow: PreviewArrow;
  cellSize: number;
}) {
  const color =
    arrow.variant === 'active'
      ? BLUE
      : arrow.variant === 'ghost'
        ? GHOST
        : INK;
  const strokeWidth = Math.max(3, Math.round(cellSize * 0.19));

  const px = (row: number, col: number) => ({
    x: col * cellSize + cellSize / 2,
    y: row * cellSize + cellSize / 2,
  });

  const points = [...arrow.tail];
  const last = points[points.length - 1];
  if (!last || last.row !== arrow.head.row || last.col !== arrow.head.col) {
    points.push(arrow.head);
  }
  const pxPoints = points.map((p) => px(p.row, p.col));
  const vec = DIRECTION_VECTORS[arrow.direction];

  const headPx = px(arrow.head.row, arrow.head.col);
  const tipAdvance = Math.round(cellSize * 0.28);
  const tipX = headPx.x + vec.dc * tipAdvance;
  const tipY = headPx.y + vec.dr * tipAdvance;

  let shaftD = `M ${pxPoints[0].x} ${pxPoints[0].y}`;
  for (let i = 1; i < pxPoints.length; i++) {
    shaftD += ` L ${pxPoints[i].x} ${pxPoints[i].y}`;
  }
  shaftD += ` L ${tipX} ${tipY}`;

  const barbLen = Math.max(5, Math.round(cellSize * 0.3));
  const barbWidth = Math.max(4, Math.round(cellSize * 0.24));
  const perpX = -vec.dr;
  const perpY = vec.dc;
  const wing1X = tipX - vec.dc * barbLen + perpX * barbWidth;
  const wing1Y = tipY - vec.dr * barbLen + perpY * barbWidth;
  const wing2X = tipX - vec.dc * barbLen - perpX * barbWidth;
  const wing2Y = tipY - vec.dr * barbLen - perpY * barbWidth;
  const headD = `M ${wing1X} ${wing1Y} L ${tipX} ${tipY} L ${wing2X} ${wing2Y}`;

  return (
    <g>
      <circle
        cx={pxPoints[0].x}
        cy={pxPoints[0].y}
        r={strokeWidth * 0.5}
        fill={color}
      />
      <path
        d={shaftD}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={headD}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}
