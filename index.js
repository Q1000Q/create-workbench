#!/usr/bin/env node

import fs, { readFileSync } from "fs";
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
    targetDir = await ask("Target directory (my-workbench-app): ");
    if (!targetDir) {
        targetDir = "my-workbench-app";
    }
}

const templateDir = path.join(__dirname, "template");

const destDir = path.resolve(process.cwd(), targetDir);

fs.mkdirSync(destDir, { recursive: true });

fs.cpSync(templateDir, destDir, { recursive: true });

// Rename _env to .env
fs.renameSync(path.join(destDir, "_env"), path.join(destDir, ".env"));

// Add example project files if option set
let noExample = process.argv.includes("--no-example");
if (!noExample) {
    const answer = await ask("Dou you want an example project? (yes): ");
    if (answer) {
        noExample = answer.toLowerCase() == "yes" ? false : true;
    } else {
        noExample = false;
    }
}
if (!noExample) {
    const exampleDir = path.join(__dirname, "example");
    fs.cpSync(exampleDir, destDir, { recursive: true, force: true });
}

// Detect package manager
const ua = process.env.npm_config_user_agent || "";
let currentPM = "npm";
if (ua.startsWith("pnpm/")) currentPM = "pnpm";
if (ua.startsWith("bun/")) currentPM = "bun";

// Check if running with Bun runtime
if (typeof Bun !== 'undefined') currentPM = "bun";

// Replace package.json with proper PM one
if (currentPM == "pnpm") fs.cpSync(path.join(__dirname, "template-pnpm"), destDir, { recursive: true, force: true });
if (currentPM == "bun") fs.cpSync(path.join(__dirname, "template-bun"), destDir, { recursive: true, force: true });

// Replace project name
const packageContent = fs.readFileSync(path.join(destDir, "package.json"), "utf-8").replace("{{project-name}}", path.basename(destDir));
fs.writeFileSync(path.join(destDir, "package.json"), packageContent);

// npm install
let noInstall = process.argv.includes("--no-install");
if (!noInstall) {
    const answer = await ask("Dou you want an automatic packages install? (yes): ");
    if (answer) {
        noInstall = answer.toLowerCase() == "yes" ? false : true;
    } else {
        noInstall = false;
    }
}

if (!noInstall) {
    const install = spawnSync(currentPM, ["install"], { cwd: destDir, stdio: "inherit", shell: true });
    if (install.error || install.status !== 0) {
        console.error("Dependencies install failed!")
        process.exit(1);
    }
    console.log("Dependencies installed");

    // Approve and rebuild better-sqlite3 for pnpm
    if (currentPM === "pnpm") {
        console.log("Approving build scripts...");
        console.log("If prompted SELECT ALL AND ACCEPT if you don't know what you are doing");
        spawnSync(currentPM, ["approve-builds"], { cwd: destDir, stdio: "inherit", shell: true });
        
        console.log("Rebuilding packages...");
        const rebuild = spawnSync(currentPM, ["rebuild"], { cwd: destDir, stdio: "inherit", shell: true });
        if (rebuild.error || rebuild.status !== 0) {
            console.error("Failed to rebuild packages!");
            process.exit(1);
        }
        console.log("Packages rebuilt successfully");
    }
}

// Prisma migrate
if (!noExample) {
    const migrate = spawnSync(currentPM, ["run", "migrate"], { cwd: destDir, stdio: "inherit", shell: true });
    if (migrate.error || migrate.status !== 0) {
        console.error("npm install failed!")
        process.exit(1);
    }
    console.log("Prisma migration successful");
}

// Prisma generate
if (!noExample) {
    const generate = spawnSync(currentPM, ["run", "generate"], { cwd: destDir, stdio: "inherit", shell: true });
    if (generate.error || generate.status !== 0) {
        console.error("npm install failed!")
        process.exit(1);
    }
    console.log("Prisma generation successful");
}


console.log("All done!");
console.log("To start the app:");
console.log(`cd ${targetDir}`);
console.log(`${currentPM} run dev`);