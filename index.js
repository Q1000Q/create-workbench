#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import readline from "readline";

const ask = (question) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim());
        })
    })
}

console.log("Creating an Workbench app...");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let targetDir = process.argv[2];
if (!targetDir) {
    targetDir = await ask("Target directory: ");
    if (!targetDir) {
        console.error("Target directory is required");
        process.exit(1);
    }
}

const templateDir = path.join(__dirname, "template");

const destDir = path.resolve(process.cwd(), targetDir);

if (fs.existsSync(destDir)) {
    console.error(`Directory '${targetDir}' already exists`);
    process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });

fs.cpSync(templateDir, destDir, { recursive: true });

// Rename _env to .env
fs.renameSync(path.join(destDir, "_env"), path.join(destDir, ".env"));

// npm install
const install = spawnSync("npm", ["install"], { cwd: destDir, stdio: "inherit", shell: true });
if (install.error || install.status !== 0) {
    console.error("npm install failed!")
    process.exit(1);
}
console.log("Dependencies installed");

// Prisma migrate
const migrate = spawnSync("npm", ["run", "migrate"], { cwd: destDir, stdio: "inherit", shell: true });
if (migrate.error || migrate.status !== 0) {
    console.error("npm install failed!")
    process.exit(1);
}
console.log("Prisma migration successful");

// Prisma generate
const generate = spawnSync("npm", ["run", "generate"], { cwd: destDir, stdio: "inherit", shell: true });
if (generate.error || generate.status !== 0) {
    console.error("npm install failed!")
    process.exit(1);
}
console.log("Prisma generation successful");


console.log("All done!");
console.log("To start the app:");
console.log(`cd ${targetDir}`);
console.log("npm run dev");