# chatondearu-web

Site perso / archive de projets (Nuxt 4 + Nuxt Content + UnoCSS + Nuxt Studio).

## Prérequis

- **Nix + direnv** (recommandé)
- Sinon: **Node.js** + **pnpm** (non recommandé sur cette instance NixOS)

## Setup (NixOS / direnv)

1. Autoriser direnv:

```bash
direnv allow
```

2. Installer les dépendances:

```bash
pnpm install
```

## Dev

```bash
pnpm dev
```

Le serveur tourne sur `http://localhost:3000`.

## Notes

- **Nix env**: le devshell est défini dans `flake.nix` et verrouillé par `flake.lock`.
- **pnpm**: si tu vois un warning “Ignored build scripts”, tu peux autoriser les builds nécessaires via:

```bash
pnpm approve-builds
```

