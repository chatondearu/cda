{
  description = "chatondearu monorepo dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        # Daily Node/pnpm: prefer Mise (mise.toml). This flake is the hermetic fallback.
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_24
            pnpm
            git
          ];

          shellHook = ''
            export PNPM_HOME="$PWD/.pnpm"
            export PATH="$PNPM_HOME:$PATH"
          '';
        };
      });
}
