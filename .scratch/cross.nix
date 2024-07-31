{ nixpkgs ? <nixpkgs>
, crossSystem ? { config = "aarch64-linux"; }
, localSystem ? { config = "aarch64-darwin"; }
}:

let
  crossPkgs = import nixpkgs {
    system = localSystem.config;
    crossSystem = crossSystem;
  };
in
crossPkgs.dockerTools.buildImage {
  name = "basic-nix-container";
  tag = "latest";
  copyToRoot = crossPkgs.buildEnv {
    name = "basic-env";
    paths = [
      crossPkgs.coreutils
      crossPkgs.zsh
      crossPkgs.curl
      crossPkgs.k3s
    ];
  };
  config = {
    Cmd = [ "${crossPkgs.zsh}/bin/zsh" ];
  };
  architecture = "aarch64"; # Ensures the correct architecture
}
