# Milkyway Turborepo

This is my implementation for the Milkyway [interview task](https://uncovered-sneeze-520.notion.site/Milkyway-Frontend-assignment-f9fac27d31c6432c947b1b3a8f39c73c#9f7a34aaca1c4671bad606e1376d8526).

## What's inside?

This Turborepo includes the following packages/apps (some with their own READMEs):

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app where all the frontend code is located.
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

### References and Resources

- [Cosmos Docs on Keplr Wallet Integration w/ CosmJS](https://tutorials.cosmos.network/tutorials/7-cosmjs/4-with-keplr.html).
- [Keplr Wallet Example](https://github.com/chainapsis/keplr-example/blob/master/src/App.tsx) - industry standard example of how to integrate Keplr with CosmJS.
- [Cosmjs Changelog](https://github.com/cosmos/cosmjs/blob/main/CHANGELOG.md#0320---2023-11-23) - Used for IBC changes from `sendIbcTokens` to using `MsgTransfer` and `signAndBroadcast`.

### Skipped implementations

| Implementation                                        |                                          Why                                          |
| ----------------------------------------------------- | :-----------------------------------------------------------------------------------: |
| Display the states of the IBC transfer with a stepper | Couldn't find libraries to handle this, and constrained time to manually implement it |
| Implement IBC hook transfer using PFM                 |                                     Ellapsed time                                     |

### Difficulties

| Difficulty                                 |                                   Description                                    |                                                                                                                                                                                                                                                                                                                 Solution |
| ------------------------------------------ | :------------------------------------------------------------------------------: | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Error handling                             | Some errors are not thrown, but are insinuated in the transaction/api responses! |                                                                                                                                                                                                                                       Read through resolved json, and I had to manually handle them if the errors exist. |
| Documentation                              |            Some features on Cosmos ecosystem are not well documented             |                                                                                                                                                                                                                                                                      I read codebases and GitHub issues to resolve them. |
| Tracking IBC transfers status in real time |                                                                                  | I couldn't find libraries to handle this, so I tried to go through [Finschia Client Codebase](https://github.com/Finschia/finschia-js/blob/main/packages/finschia) to get how to track the status of the IBC transfer. Unfortunately, there wasn't an implementation to handle real-time tracking, just on request time. |

### Learnings

- Simplicity of IBC implementation. PS: this is my first time implementing IBC.
- I learned a lot more low-level knowledge about IBC -- Particularly, I learned that unlike other interoperability protocols, IBC does not rely on trusted third parties. If you trust two particular chains to use the functions they provide (and by default their consensus mechanisms), then there are no additional trust assumptions needed while using IBC to interact between these chains.
