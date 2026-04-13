import * as fs from "fs";
import * as path from "path";

export interface SnapshotOptions {
  dir?: string;
  update?: boolean;
}

function serialize(value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((v) => pad + "  " + serialize(v, indent + 1));
    return "[\n" + items.join(",\n") + "\n" + pad + "]";
  }
  if (typeof value === "object") {
    const keys = Object.keys(value as object).sort();
    if (keys.length === 0) return "{}";
    const items = keys.map(
      (k) => pad + "  " + JSON.stringify(k) + ": " + serialize((value as Record<string, unknown>)[k], indent + 1)
    );
    return "{\n" + items.join(",\n") + "\n" + pad + "}";
  }
  return String(value);
}

export function matchSnapshot(name: string, value: unknown, opts: SnapshotOptions = {}) {
  const dir = opts.dir ?? path.join(process.cwd(), "__snapshots__");
  const update = opts.update ?? process.env.UPDATE_SNAPSHOTS === "1";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, name.replace(/[^\w.-]+/g, "_") + ".snap");
  const current = serialize(value);
  if (!fs.existsSync(file) || update) {
    fs.writeFileSync(file, current, "utf8");
    return { pass: true, created: !fs.existsSync(file) };
  }
  const saved = fs.readFileSync(file, "utf8");
  if (saved === current) return { pass: true };
  return { pass: false, diff: `expected:\n${saved}\n\nreceived:\n${current}` };
}
