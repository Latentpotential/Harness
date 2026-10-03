import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export const readTool = {
  name: "read_file",
  description: "Read the contents of a file.",
  parameters: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "The path to the file to read.",
      },
    },
    required: ["path"],
  },

  async execute(args: Record<string, unknown>): Promise<string> {
    return await readFile(
      resolve(process.cwd(), args.path as string),
      { encoding: "utf-8" }
    );
  },
};