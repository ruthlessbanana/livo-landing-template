import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parsePageSpec } from "../src/schema/page-spec.schema.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const specPath = join(root, "interface", "landing", "page-spec.json");

const raw = JSON.parse(readFileSync(specPath, "utf8")) as unknown;

try {
  parsePageSpec(raw);
  console.log(`Valid page-spec: ${specPath}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
