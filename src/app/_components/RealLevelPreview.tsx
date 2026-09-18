import { MultiCellArrow } from '../_game/GameArrow';
import { getBestHint } from '../_game/solver';
import type { MultiCellArrow as Arrow } from '../_game/types';
import level from '../_game/level-one.json';

export const previewArrowCount = level.arrows.length;

export function RealLevelPreview() {
  const arrows = level.arrows as Arrow[];
  const hinted = getBestHint(level.rows, level.cols, arrows);
  const cellSize = 24;
  return (
    <svg width="390" height="390" viewBox={`-12 -12 ${level.cols * cellSize + 24} ${level.rows * cellSize + 24}`} role="img" aria-label="The actual first level of Arrow Escape: 97 connected arrows, with one clear escape path highlighted in blue">
      {arrows.map(arrow => <MultiCellArrow key={arrow.id} arrow={arrow} cellSize={cellSize} isHinted={arrow.id === hinted?.id} />)}
    </svg>
  );
}
