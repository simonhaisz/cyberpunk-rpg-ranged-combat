import { writeFileSync } from "fs-extra";

export function writeFile(name: string, content: string[]) {
    writeFileSync(name, content.join("\n"), { encoding: "utf8" });
}