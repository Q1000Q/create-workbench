# create-workbench

A scaffolding tool for quickly creating new projects with the Workbench stack - my little funny technology stack, taht is perfect for small, simple projects taht need frontend, backend and DB with everything in one place.

## Stack

- **React Router 7** - Full-stack React framework with **backend support** (using loader and action scripts)
- **Prisma** - Type safe database ORM with **SQLite**
- **Vite** - Fast build / serving tooling
- **Tailwind CSS** - CSS framework
- **TypeScript** - Type safe development

## Usage

```bash
npx create-workbench [project-name]
```

If no project name is provided, it defaults to `workbench-app`.

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

Visit `http://localhost:5173` to see your app.
