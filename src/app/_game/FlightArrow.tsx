"use client";
import { useEffect, useRef } from "react";
import type { MultiCellArrow } from "./types";
import { DIRECTION_VECTORS } from "./raycast";

// The app's SnakeFlightArrow track: the tail follows the head around every bend.
export function FlightArrow({
  arrow,
  cellSize,
  rows,
  cols,
  onComplete,
}: {
  arrow: MultiCellArrow;
  cellSize: number;
  rows: number;
  cols: number;
  onComplete: () => void;
}) {
  const body = useRef<SVGPathElement>(null),
    head = useRef<SVGPathElement>(null);
  const done = useRef(onComplete);
  done.current = onComplete;
  useEffect(() => {
    const vector = DIRECTION_VECTORS[arrow.direction];
    const original = [...arrow.tail];
    if (
      original.at(-1)?.row !== arrow.head.row ||
      original.at(-1)?.col !== arrow.head.col
    )
      original.push(arrow.head);
    const edge =
      vector.dr === -1
        ? arrow.head.row + 1
        : vector.dr === 1
          ? rows - arrow.head.row
          : vector.dc === -1
            ? arrow.head.col + 1
            : cols - arrow.head.col;
    const track = [...original];
    for (
      let step = 1;
      step <= Math.max(6, edge + arrow.tail.length + 3);
      step++
    )
      track.push({
        row: arrow.head.row + vector.dr * step,
        col: arrow.head.col + vector.dc * step,
      });
    const points = track.map((p) => ({
      x: (p.col + 0.5) * cellSize,
      y: (p.row + 0.5) * cellSize,
    }));
    const distances = [0];
    for (let i = 1; i < points.length; i++)
      distances.push(
        distances[i - 1] +
          Math.hypot(
            points[i].x - points[i - 1].x,
            points[i].y - points[i - 1].y,
          ),
      );
    const length = distances[original.length - 1],
      total = distances.at(-1)!;
    const pointAt = (d: number) => {
      let i = 0;
      while (i < points.length - 2 && distances[i + 1] < d) i++;
      const a = points[i],
        b = points[i + 1],
        segment = Math.max(0.001, distances[i + 1] - distances[i]),
        t = (d - distances[i]) / segment;
      return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        dx: (b.x - a.x) / segment,
        dy: (b.y - a.y) / segment,
      };
    };
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const start = performance.now();
    const render = (time: number) => {
      const t = Math.min(1, (time - start) / (reduced ? 1 : 850)),
        travel = (1 - Math.pow(1 - t, 3)) * (total - length),
        tail = pointAt(travel),
        tip = pointAt(travel + length);
      let path = `M ${tail.x} ${tail.y}`;
      points.forEach((p, i) => {
        if (distances[i] > travel && distances[i] < travel + length)
          path += ` L ${p.x} ${p.y}`;
      });
      path += ` L ${tip.x} ${tip.y}`;
      body.current?.setAttribute("d", path);
      const bl = Math.max(3.8, cellSize * 0.4),
        bw = Math.max(3, cellSize * 0.32);
      head.current?.setAttribute(
        "d",
        `M ${tip.x} ${tip.y} L ${tip.x - tip.dx * bl - tip.dy * bw} ${tip.y - tip.dy * bl + tip.dx * bw} L ${tip.x - tip.dx * bl + tip.dy * bw} ${tip.y - tip.dy * bl - tip.dx * bw} Z`,
      );
      if (t < 1) frame = requestAnimationFrame(render);
      else done.current();
    };
    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [arrow, cellSize, rows, cols]);
  return (
    <g fill="#2563EB" stroke="#2563EB" pointerEvents="none">
      <path
        ref={body}
        fill="none"
        strokeWidth={5.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path ref={head} strokeWidth={1.8} />
    </g>
  );
}
