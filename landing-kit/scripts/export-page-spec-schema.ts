import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { zodToJsonSchema } from "zod-to-json-schema";
import { pageSpecSchema } from "../src/schema/page-spec.schema.ts";
import { REMIX_ICON_IDS } from "../src/schema/remix-icons.ts";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "schema");
const schemaPath = join(outDir, "page-spec.schema.json");

const jsonSchema = zodToJsonSchema(pageSpecSchema, {
  name: "PageSpec",
  $refStrategy: "none",
});

const enriched = {
  ...jsonSchema,
  $comment: "Generated from landing-kit Zod schema. Remix icons must be one of REMIX_ICON_IDS.",
  definitions: {
    ...(typeof jsonSchema === "object" && jsonSchema !== null && "definitions" in jsonSchema
      ? jsonSchema.definitions
      : {}),
    RemixIconId: {
      type: "string",
      enum: [...REMIX_ICON_IDS],
    },
  },
};

mkdirSync(outDir, { recursive: true });
writeFileSync(schemaPath, `${JSON.stringify(enriched, null, 2)}\n`, "utf8");
console.log(`Wrote ${schemaPath}`);
