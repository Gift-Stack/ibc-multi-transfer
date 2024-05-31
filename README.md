# Milkyway Turborepo

This is my implementation for the Milkyway [interview task](https://uncovered-sneeze-520.notion.site/Milkyway-Frontend-assignment-f9fac27d31c6432c947b1b3a8f39c73c#9f7a34aaca1c4671bad606e1376d8526).

## What's inside?

This Turborepo includes the following packages/apps (some with their own READMEs):

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) where all the frontend code is located.
- `@milkyway-engine/ui`: a stub React component library shared by both `web` and `docs` applications. [Read docs](packages/ui/README.md)
- `@milkyway-engine/wallet`: a stub React hooks library utilized in `web` for blockchain interactivities. [Read docs](packages/wallet/README.md)
- `@milkyway-engine/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@milkyway-engine/tailwind-config`: `tailwindcss` configurations used throughout the apps and ui package (includes `tailwindcss`, `postcss` and `autoprefixer`)
- `@milkyway-engine/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Why use this pattern?

- Save time and effort on repetitive tasks
- Segregating ui package from web package allows for easier maintenance and scalability
- Enables a consistent coding style
- Provides a centralized location for configuration files

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) (or whatever port you specified) with your browser to see the result.

### Build

To build the web app, run the following command:

```
yarn build:web
```

To build all apps and packages in parallel, run the following command:

```
yarn build
```

### Develop

To run the web app, run the following command:

```
yarn dev:web
```

To develop all apps and packages in parallel, run the following command:

```
yarn dev
```
