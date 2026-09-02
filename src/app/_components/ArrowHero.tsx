const INK = '#0F172A';
const BLUE = '#2563EB';
const SOFT = '#CBD5E1';

type A = { pts: [number, number][]; color: string };

const arrows: A[] = [
  { pts: [[3, 5], [4, 5], [4, 4], [4, 3]], color: BLUE },
  { pts: [[0, 0], [1, 0], [1, 1], [1, 2]], color: INK },
  { pts: [[7, 1], [6, 1], [5, 1]], color: INK },
  { pts: [[7, 3], [7, 4], [6, 4], [6, 5]], color: INK },
  { pts: [[6, 7], [5, 7], [5, 6], [4, 6]], color: INK },
  { pts: [[0, 4], [0, 5], [1, 5], [2, 5]], color: SOFT },
  { pts: [[2, 2], [3, 2]], color: SOFT },
  { pts: [[3, 0], [4, 0], [4, 1]], color: SOFT },
  { pts: [[0, 2], [0, 3]], color: INK },
  { pts: [[0, 7], [1, 7], [1, 6]], color: INK },
  { pts: [[3, 7], [3, 6]], color: SOFT },
  { pts: [[6, 2], [6, 3]], color: SOFT },
  { pts: [[5, 4], [5, 3]], color: BLUE },
];

export function ArrowHero({ size = 320 }: { size?: number }) {
  const cell = 26;
  const stroke = 5.5;
  const barb = 6.5;

  const gridToPx = (c: number, r: number) => ({
    x: c * cell + cell / 2 + 8,
    y: r * cell + cell / 2 + 8,
  });

  const viewBox = 220;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBox} ${viewBox}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {arrows.map((a, idx) => {
        const pxPts = a.pts.map(([c, r]) => gridToPx(c, r));
        const tailD = 'M ' + pxPts.map((p) => `${p.x} ${p.y}`).join(' L ');
        const last = pxPts[pxPts.length - 1];
        const prev = pxPts[pxPts.length - 2];
        const dx = last.x - prev.x;
        const dy = last.y - prev.y;
        const mag = Math.max(1, Math.hypot(dx, dy));
        const ux = dx / mag;
        const uy = dy / mag;
        const tipAdvance = cell * 0.28;
        const tipX = last.x + ux * tipAdvance;
        const tipY = last.y + uy * tipAdvance;
        const px = -uy;
        const py = ux;
        const wing1X = tipX - ux * barb + px * barb;
        const wing1Y = tipY - uy * barb + py * barb;
        const wing2X = tipX - ux * barb - px * barb;
        const wing2Y = tipY - uy * barb - py * barb;
        const shaftPath = tailD + ` L ${tipX} ${tipY}`;
        const headPath = `M ${wing1X} ${wing1Y} L ${tipX} ${tipY} L ${wing2X} ${wing2Y}`;
        return (
          <g key={idx}>
            <path
              d={shaftPath}
              stroke={a.color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d={headPath}
              stroke={a.color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        );
      })}
    </svg>
  );
}
