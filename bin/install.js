#!/usr/bin/env node

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const skillName = "texture-blind-box-draw";
const packageRoot = path.resolve(__dirname, "..");
const sourceDir = path.join(packageRoot, "skills", skillName);

const args = process.argv.slice(2);
const force = args.includes("--force");
const destIndex = args.indexOf("--dest");
const customDest = destIndex >= 0 ? args[destIndex + 1] : null;

if (args.includes("--help") || args.includes("-h")) {
  console.log(`Install the ${skillName} Codex skill.

Usage:
  npx add-texture-blind-box-draw-skill
  npx add-texture-blind-box-draw-skill -- --force
  npx add-texture-blind-box-draw-skill -- --dest <skills-directory>

By default this installs to $CODEX_HOME/skills when CODEX_HOME is set,
otherwise to ~/.codex/skills.`);
  process.exit(0);
}

if (!fs.existsSync(sourceDir)) {
  fail(`Packaged skill folder not found: ${sourceDir}`);
}

const defaultSkillsDir = process.env.CODEX_HOME
  ? path.join(process.env.CODEX_HOME, "skills")
  : path.join(os.homedir(), ".codex", "skills");

const skillsDir = customDest ? path.resolve(customDest) : defaultSkillsDir;
const destDir = path.join(skillsDir, skillName);

if (fs.existsSync(destDir)) {
  if (!force) {
    fail(`${skillName} is already installed at ${destDir}
Run again with --force to replace it.`);
  }
  fs.rmSync(destDir, { recursive: true, force: true });
}

fs.mkdirSync(skillsDir, { recursive: true });
copyDir(sourceDir, destDir);

console.log(`Installed ${skillName} to ${destDir}`);
console.log("Restart Codex or start a new task if the skill does not appear immediately.");

function copyDir(source, target) {
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else if (entry.isFile()) {
      fs.copyFileSync(from, to);
    }
  }
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
