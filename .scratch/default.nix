{ pkgs ? import <nixpkgs> { system = "aarch64-linux"; } }:

pkgs.dockerTools.buildImage {
  name = "basic-nix-container";
  tag = "latest";
  copyToRoot = pkgs.buildEnv {
    name = "basic-env";
    paths = [
      pkgs.coreutils
      pkgs.zsh
      pkgs.curl
    ];
  };
  config = {
    Cmd = [ "${pkgs.zsh}/bin/zsh" ];
  };
  architecture = "aarch64"; # Ensures the correct architecture
}
