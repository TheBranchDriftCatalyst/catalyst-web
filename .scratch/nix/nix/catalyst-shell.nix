

{
  description = "A standard shell environment for my projects";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            allowUnfree = true; # or any other configurations
          };
        };
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            pkgs.git
            pkgs.htop
            pkgs.neovim
            # add any other packages you need
          ];

          shellHook = ''
            echo "Welcome to your Nix-powered shell!"
          '';
        };
      }
    );
}

