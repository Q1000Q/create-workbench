# create-workbench

A scaffolding tool for quickly creating new projects with the Workbench stack - my little funny technology stack, that is perfect for small, simple projects taht need frontend, backend and DB with everything in one place.

## Stack

- **React Router 7** - Full-stack React framework with **backend support** (using loader and action scripts)
- **Prisma** - Type safe database ORM with **SQLite**
- **Vite** - Fast build / serving tooling
- **Tailwind CSS** - CSS framework
- **TypeScript** - Type safe development

## Usage
 
```bash
npm create workbench
```
This will fetch script from npm registry and run it for you.
You can also use `bun create workbench` if you prefere bun.

## What it does

1. Creates a new directory with your project name
2. Copies the template files
3. Installs dependencies
4. Runs Prisma migrations
5. Generates Prisma Client

Your app will be ready to run immediately after creation.

## Getting Started

After creating your project:

```bash
cd [project-name]
npm run dev
```
If you installed Workbench with bun use `bun run dev` instead.

Visit `http://localhost:5173` to see your app.

## Credits

I want to credit awesome people that created: React Router, Prisma and Vite, on which my stack is based on.