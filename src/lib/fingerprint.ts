function djb2Hash(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function getCanvasHash(): string {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "no-canvas";
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillText("fingerprint", 2, 2);
    return djb2Hash(canvas.toDataURL());
  } catch {
    return "no-canvas";
  }
}

export function generateFingerprint(): string {
  const deviceMemory =
    "deviceMemory" in navigator ? navigator.deviceMemory : "";

  const components = [
    navigator.userAgent,
    navigator.language,
    `${screen.width}x${screen.height}`,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    String(navigator.hardwareConcurrency ?? ""),
    String(deviceMemory ?? ""),
    getCanvasHash(),
  ].join("|");

  return djb2Hash(components);
}


function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage errors in restricted browsing modes.
  }
}

export function createFingerprint(): string {
  const visitorId = generateFingerprint();
  safeSetItem("visitor_id", visitorId);

  return visitorId;
}

export function getFingerprint(): string {
  const visitorId = safeGetItem("visitor_id");

  if (visitorId) {
    return visitorId;
  }

  return createFingerprint();
}

export function hasVisited(): boolean {
  return safeGetItem("visited") === "true";
}

export function markVisited(): void {
  safeSetItem("visited", "true");
}
