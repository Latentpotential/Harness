import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Tool } from "../types.ts";

export const wordCountTool: Tool = {
  name: "word_count",
  description:
    "Count lines, words, characters and bytes in a file (like wc). Returns a compact summary.",
  parameters: {
    type: "object",
    properties: {
      path: { type: "string", description: "Path to the file, relative to the current folder" },
    },
    required: ["path"],
  },
  async execute(args) {
    const target = resolve(process.cwd(), String(args.path));
    const content = await readFile(target, "utf-8");
    const bytes = Buffer.byteLength(content, "utf-8");
    const lines = content.length === 0
      ? 0
      : content.split("\n").length - (content.endsWith("\n") ? 0 : 1);
    const trimmed = content.trim();
    const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
    const chars = Array.from(content).length;
    return [
      "path: " + target,
      "lines: " + lines,
      "words: " + words,
      "chars: " + chars,
      "bytes: " + bytes,
    ].join("\n");
  },
};
