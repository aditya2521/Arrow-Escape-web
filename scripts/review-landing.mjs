import fs from "node:fs/promises";
const tabs = await (await fetch("http://[::1]:9231/json/list")).json();
const tab = tabs.find((t) => t.type === "page" && t.url.includes("3091"));
if (!tab) throw new Error("Preview tab not found");
const ws = new WebSocket(
  tab.webSocketDebuggerUrl.replace("localhost", "[::1]"),
);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});
let id = 0;
const pending = new Map();
const errors = [];
ws.onmessage = ({ data }) => {
  const msg = JSON.parse(data);
  if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error")
    errors.push(
      msg.params.args.map((a) => a.value || a.description || "").join(" "),
    );
  if (msg.method === "Runtime.exceptionThrown")
    errors.push(msg.params.exceptionDetails.text);
  if (msg.id) {
    const p = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? p.reject(msg.error) : p.resolve(msg.result);
  }
};
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params }));
  });
}
async function evaluate(expression) {
  const r = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
  return r.result.value;
}
const pause = (ms) => new Promise((r) => setTimeout(r, ms));
function assert(value, message) {
  if (!value) throw new Error(message);
  console.log(`PASS ${message}`);
}
await send("Runtime.enable");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 1000,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.navigate", { url: "http://127.0.0.1:3091" });
for (let n = 0; n < 30; n++) {
  await pause(300);
  if (await evaluate('document.querySelectorAll(".game-arrow").length === 97'))
    break;
}
await pause(700);
assert(
  await evaluate('document.querySelectorAll(".game-arrow").length===97'),
  "Actual Level 1 contains 97 arrows",
);
assert(await evaluate('document.querySelector("h1").textContent.includes("Find the arrow")'), 'Original deployed hero is restored');
assert(await evaluate('document.querySelectorAll(".actual-game").length===1'), 'Only one new playable section');
assert(await evaluate('!document.querySelector("canvas")'), 'Redesign showcase removed');
const source = JSON.parse(
  await fs.readFile("../Arrow/src/engine/precomputedLevels-1.json", "utf8"),
)[0];
const copied = JSON.parse(
  await fs.readFile("src/app/_game/level-one.json", "utf8"),
);
assert(
  JSON.stringify(source) === JSON.stringify(copied),
  "Preview level exactly matches the native game data",
);
await fs.mkdir("/tmp/arrow-redesign-review", { recursive: true });
async function shot(name, full = false) {
  const metrics = await send("Page.getLayoutMetrics");
  const result = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: full,
    ...(full
      ? {
          clip: {
            x: 0,
            y: 0,
            width: metrics.cssContentSize.width,
            height: metrics.cssContentSize.height,
            scale: 1,
          },
        }
      : {}),
  });
  await fs.writeFile(
    `/tmp/arrow-redesign-review/${name}.png`,
    Buffer.from(result.data, "base64"),
  );
}
await shot("actual-game-desktop");
await evaluate(
  'document.querySelector(".game-playable").scrollIntoView({behavior:"instant",block:"center"})',
);
await pause(150);
await shot("actual-game-demo");
const clickArrow = (selector) =>
  evaluate(
    `document.querySelector(${JSON.stringify(selector)}).dispatchEvent(new MouseEvent('click',{bubbles:true}))`,
  );
await clickArrow('.game-arrow[data-clear="false"]');
await pause(100);
assert(
  await evaluate(
    'document.querySelector(".game-playable .game-hearts").getAttribute("aria-label")==="2 lives remaining"',
  ),
  "Blocked path costs one life",
);
assert(
  await evaluate('document.querySelectorAll(".game-arrow").length===97'),
  "Blocked arrow stays on the board",
);
await pause(750);
await clickArrow('.game-arrow[data-clear="false"]');
await pause(750);
await clickArrow('.game-arrow[data-clear="false"]');
await pause(100);
assert(
  await evaluate(
    'document.querySelector(".game-result strong").textContent==="Try again"',
  ),
  "Three blocked moves trigger game over",
);
await evaluate('document.querySelector(".game-reset").click()');
await pause(100);
await evaluate('document.querySelector(".game-hint").click()');
await pause(100);
assert(
  await evaluate(
    'document.querySelector(".game-arrow[data-hinted=true]").dataset.clear==="true"',
  ),
  "Native hint solver selects a clear path",
);
assert(
  await evaluate('document.querySelector(".game-hint span").textContent==="4"'),
  "Hint inventory decreases",
);
await clickArrow(".game-arrow[data-hinted=true]");
await pause(70);
assert(
  await evaluate('document.querySelectorAll(".game-arrow").length===96'),
  "Clear arrow is removed from occupancy immediately",
);
assert(
  await evaluate(
    '!!document.querySelector(".game-playable g[pointer-events=none] path[d]")',
  ),
  "Head-first flight animation is rendered",
);
await pause(900);
await evaluate(
  'document.querySelector("button[aria-label=" + JSON.stringify("Zoom in") + "]").click()',
);
await pause(100);
assert(
  await evaluate(
    'document.querySelector(".game-playable .actual-board").style.width==="150%"',
  ),
  "Zoom enlarges the real maze",
);
await evaluate('document.querySelector(".game-reset").click()');
await pause(100);
// Independently derive valid moves from the native data, then play them in the UI.
let remaining = source.arrows.map((a) => {
  const neck = a.tail.at(-2);
  return {
    ...a,
    direction: neck
      ? a.head.row < neck.row
        ? "up"
        : a.head.row > neck.row
          ? "down"
          : a.head.col < neck.col
            ? "left"
            : "right"
      : a.direction,
  };
});
for (let i = 0; i < 97; i++) {
  const free = remaining.find((a) => {
    const [dr, dc] = {
      up: [-1, 0],
      down: [1, 0],
      left: [0, -1],
      right: [0, 1],
    }[a.direction];
    for (
      let r = a.head.row + dr, c = a.head.col + dc;
      r >= 0 && r < source.rows && c >= 0 && c < source.cols;
      r += dr, c += dc
    ) {
      if (
        remaining.some(
          (b) =>
            b.id !== a.id && b.tail.some((p) => p.row === r && p.col === c),
        )
      )
        return false;
    }
    return true;
  });
  if (!free) throw new Error("Native level became unsolvable");
  await clickArrow(`.game-arrow[data-arrow-id="${free.id}"]`);
  await pause(25);
  remaining = remaining.filter((a) => a.id !== free.id);
}
await pause(1000);
assert(
  await evaluate(
    'document.querySelector(".game-result strong").textContent==="Level complete"',
  ),
  "All 97 real arrows can be cleared",
);
await evaluate('document.querySelector(".game-reset").click()');
await pause(100);
assert(
  await evaluate('document.querySelectorAll(".game-arrow").length===97'),
  "Restart restores the complete maze",
);
for (const width of [390, 320]) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await evaluate('window.scrollTo({top:0,behavior:"instant"})');
  await pause(200);
  assert(
    await evaluate("document.documentElement.scrollWidth<=innerWidth"),
    `No overflow at ${width}px`,
  );
  if (width === 390) {
    await shot("actual-game-mobile");
    await evaluate(
      'document.querySelector(".game-playable").scrollIntoView({behavior:"instant",block:"center"})',
    );
    await pause(100);
    await shot("actual-game-demo-mobile");
  }
}
assert(errors.length === 0, `No browser errors: ${errors.join(", ")}`);
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 1000,
  deviceScaleFactor: 1,
  mobile: false,
});
await evaluate('window.scrollTo({top:0,behavior:"instant"})');
ws.close();
