# chatondearu workspace

Monorepo pnpm pour les modules `@chatondearu/*` (app Nuxt + futurs packages).

## Prérequis

- **Nix + direnv** (recommandé)
- Sinon: **Node.js** + **pnpm** (non recommandé sur cette instance NixOS)

## Setup (NixOS / direnv)

1. Autoriser direnv:

```bash
direnv allow
```

2. Installer les dépendances du workspace:

```bash
nix develop -c pnpm install
```

## Dev (app principale)

```bash
nix develop -c pnpm dev
```

Le serveur tourne sur `http://localhost:3000` (`modules/app`).

## Commandes utiles (workspace)

```bash
nix develop -c pnpm build
nix develop -c pnpm --filter @chatondearu/app preview
```

## Notes

- **Nix env**: le devshell est défini dans `flake.nix` et verrouillé par `flake.lock`.
- **Monorepo**: les packages sont déclarés dans `pnpm-workspace.yaml` via `modules/*`.
- **Version pinning**: Node `24.x` et pnpm `10.33.x` sont alignés entre Nix et `package.json`.
- **pnpm**: si tu vois un warning “Ignored build scripts”, tu peux autoriser les builds nécessaires via:

```bash
nix develop -c pnpm approve-builds
```

