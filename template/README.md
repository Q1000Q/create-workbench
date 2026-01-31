# Welcome to Workbench Stack

Little funny technology stack, that is perfect for small, simple projects taht need frontend, backend and DB with everything in one place.

## Stack

- **React Router 7** - Full-stack React framework with **backend support** (using loader and action scripts)
- **Prisma** - Type safe database ORM with **SQLite**
- **Vite** - Fast build / serving tooling
- **Tailwind CSS** - CSS framework
- **TypeScript** - Type safe development

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Prisma migration and generation
```bash
npm run migrate
npm run generate
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

### DIY Deployment

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```