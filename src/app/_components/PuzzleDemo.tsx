"use client";
import { useEffect, useMemo, useState } from "react";
import { Heart, Lightbulb, Minus, Plus, RotateCcw, Check } from "lucide-react";
import level from "../_game/level-one.json";
import type { MultiCellArrow as Arrow, Direction } from "../_game/types";
import { MultiCellArrow } from "../_game/GameArrow";
import { buildOccupancyGrid, checkRaycast } from "../_game/raycast";
import { getBestHint } from "../_game/solver";
import { FlightArrow } from "../_game/FlightArrow";

const cell = 24;
// Match buildArrowsFromLevel in the native game's useEasybrainGame hook.
const arrows: Arrow[] = level.arrows.map((a) => {
  const neck = a.tail.at(-2);
  return {
    ...a,
    direction: (neck
      ? a.head.row < neck.row
        ? "up"
        : a.head.row > neck.row
          ? "down"
          : a.head.col < neck.col
            ? "left"
            : "right"
      : a.direction) as Direction,
  };
});
export function PuzzleDemo({ preview = false }: { preview?: boolean }) {
  const [active, setActive] = useState(arrows),
    [flying, setFlying] = useState<Arrow[]>([]),
    [lives, setLives] = useState(3),
    [hints, setHints] = useState(5),
    [hint, setHint] = useState<string | null>(null),
    [wrong, setWrong] = useState<string | null>(null),
    [zoom, setZoom] = useState(1),
    [round, setRound] = useState(0),
    [message, setMessage] = useState(
      "Follow the arrowhead. Tap a path that can escape.",
    );
  const grid = useMemo(
    () => buildOccupancyGrid(level.rows, level.cols, active),
    [active],
  );
  useEffect(() => {
    if (!wrong) return;
    const timer = setTimeout(() => setWrong(null), 700);
    return () => clearTimeout(timer);
  }, [wrong]);
  const won = !active.length && !flying.length;
  function reset() {
    setRound((r) => r + 1);
    setActive(arrows);
    setFlying([]);
    setLives(3);
    setHints(5);
    setHint(null);
    setWrong(null);
    setZoom(1);
    setMessage("Follow the arrowhead. Tap a path that can escape.");
  }
  function tap(arrow: Arrow) {
    if (preview || !lives || wrong === arrow.id) return;
    if (!checkRaycast(grid, level.rows, level.cols, arrow).canFly) {
      setWrong(arrow.id);
      setHint(null);
      setLives((n) => Math.max(0, n - 1));
      setMessage("Blocked by another arrow. You lost a life.");
      return;
    }
    setActive((current) => current.filter((a) => a.id !== arrow.id));
    setFlying((current) => [...current, arrow]);
    setHint(null);
    setWrong(null);
    setMessage("Clear path. Watch the tail follow the arrowhead out.");
  }
  function giveHint() {
    if (!hints || !lives) return;
    const best = getBestHint(level.rows, level.cols, active);
    if (best) {
      setHint(best.id);
      setWrong(null);
      setHints((n) => n - 1);
      setMessage(
        "The blue arrow has a clear way out. Tap anywhere on its path.",
      );
    }
  }
  return (
    <div
      className={`actual-game ${preview ? "game-preview" : "game-playable"}`}
      id={preview ? undefined : "try-it"}
      aria-label={
        preview ? "Actual Level 1 preview" : "Play Arrow Escape Level 1"
      }
    >
      <div className="actual-game-heading">
        <span>LEVEL {level.id}</span>
        <h3>{level.name}</h3>
      </div>
      <div className="actual-game-toolbar">
        <div className="game-hearts" aria-label={`${lives} lives remaining`}>
          {[0, 1, 2].map((i) => (
            <Heart
              key={i}
              size={21}
              fill={i < lives ? "#ef4444" : "#e2e8f0"}
              color={i < lives ? "#ef4444" : "#e2e8f0"}
            />
          ))}
        </div>
        <span className="actual-count">
          {active.length} <span>left</span>
        </span>
      </div>
      {!preview && (
        <div className="game-zoom">
          <button
            aria-label="Zoom out"
            disabled={zoom === 1}
            onClick={() => setZoom((z) => Math.max(1, z - 0.5))}
          >
            <Minus size={17} />
          </button>
          <span>{zoom.toFixed(1)}×</span>
          <button
            aria-label="Zoom in"
            disabled={zoom === 2}
            onClick={() => setZoom((z) => Math.min(2, z + 0.5))}
          >
            <Plus size={17} />
          </button>
        </div>
      )}
      <div
        className="actual-board-scroll"
        tabIndex={preview ? undefined : 0}
        aria-label={
          preview
            ? undefined
            : "Puzzle board. Zoom in and scroll to inspect the paths."
        }
      >
        <svg
          key={round}
          className="actual-board"
          style={{ width: `${zoom * 100}%` }}
          viewBox={`-10 -10 ${level.cols * cell + 20} ${level.rows * cell + 20}`}
          role={preview ? "img" : "group"}
          aria-label="97 connected arrows from the actual first level of Arrow Escape"
        >
          {active.map((arrow) => (
            <g
              key={arrow.id}
              className={preview ? "" : "game-arrow"}
              role={preview ? undefined : "button"}
              tabIndex={preview || !lives ? undefined : 0}
              aria-disabled={!lives || undefined}
              aria-label={
                preview
                  ? undefined
                  : `Arrow pointing ${arrow.direction} at row ${arrow.head.row + 1}, column ${arrow.head.col + 1}`
              }
              data-hinted={hint === arrow.id}
              data-arrow-id={arrow.id}
              data-clear={
                checkRaycast(grid, level.rows, level.cols, arrow).canFly
              }
              onClick={() => tap(arrow)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  tap(arrow);
                }
              }}
            >
              {!preview && (
                <path
                  d={
                    "M " +
                    arrow.tail
                      .map(
                        (p) =>
                          `${(p.col + 0.5) * cell} ${(p.row + 0.5) * cell}`,
                      )
                      .join(" L ")
                  }
                  stroke="transparent"
                  strokeWidth={16}
                  fill="none"
                  pointerEvents="stroke"
                />
              )}
              <MultiCellArrow
                arrow={arrow}
                cellSize={cell}
                isHinted={hint === arrow.id}
                isBumping={wrong === arrow.id}
              />
            </g>
          ))}
          {flying.map((arrow) => (
            <FlightArrow
              key={arrow.id}
              arrow={arrow}
              cellSize={cell}
              rows={level.rows}
              cols={level.cols}
              onComplete={() =>
                setFlying((current) => current.filter((a) => a.id !== arrow.id))
              }
            />
          ))}
        </svg>
      </div>
      {preview ? (
        <a className="game-preview-cta" href="#try-it">
          Play this level
        </a>
      ) : (
        <>
          <p className="actual-game-message" role="status">
            {won
              ? "Every arrow escaped. Level complete!"
              : !lives
                ? "Out of lives. Start again to give this maze another try."
                : message}
          </p>
          <div className="actual-game-controls">
            <button onClick={reset} className="game-reset">
              <RotateCcw size={17} /> Restart
            </button>
            <button
              className="game-hint"
              onClick={giveHint}
              disabled={!hints || !lives || !active.length}
            >
              <Lightbulb size={19} /> Hint <span>{hints}</span>
            </button>
          </div>
          {(won || !lives) && (
            <div className="game-result">
              <span>{won ? <Check size={25} /> : <Heart size={25} />}</span>
              <strong>{won ? "Level complete" : "Try again"}</strong>
              <button onClick={reset}>
                {won ? "Play again" : "Restart level"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
