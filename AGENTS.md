# Repository Guidelines

## Project Structure & Module Organization

This repository is a personal terminal-style portfolio built with React, TypeScript, and Vite. Application code lives in `src/`: `main.tsx` mounts the app, `App.tsx` provides the shell layout, `components/Terminal.tsx` contains the interactive terminal UI, `data/` stores portfolio content, and `types/` contains shared TypeScript types. Global styling is in `src/styles.css`. Static assets such as the CV PDF and audio file belong in `public/assets/`. `dist/` is generated build output and should only be updated intentionally after a production build.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite development server for local work.
- `npm run build`: run TypeScript project checks with `tsc -b` and generate the production bundle in `dist/`.
- `npm run preview`: serve the built `dist/` output locally for verification.
- `docker compose up --build -d`: build and run the static site container on port `8181`.

## Coding Style & Naming Conventions

Use TypeScript and React functional components. Keep component files in PascalCase, for example `Terminal.tsx`, and use lower camel case for functions, constants, and data exports. Prefer explicit shared types in `src/types/` when values cross module boundaries. Match the existing style: two-space indentation, single-quoted imports/strings, semicolons, and concise object literals. Keep portfolio content changes in the relevant `src/data/*.ts` file instead of hard-coding copy in components.

## Testing Guidelines

No test framework is currently configured. For now, use `npm run build` as the required validation step before committing. When adding tests, prefer colocated files named `*.test.ts` or `*.test.tsx`, and add a matching `npm test` script so contributors have a standard entry point.

## Commit & Pull Request Guidelines

The current Git history only shows `first commit`, so there is no established commit convention yet. Use short, imperative commit subjects such as `Update terminal command data` or `Add deployment notes`. Pull requests should describe the user-facing change, list validation performed, link any relevant issue, and include screenshots or screen recordings for visual changes to the terminal UI.

## Security & Configuration Tips

Do not commit secrets or personal credentials. Public resume, audio, and other downloadable files should stay under `public/assets/`. Deployment details belong in `DEPLOY_REMOTE.md`; keep environment-specific values out of source files unless they are safe for public static hosting.
