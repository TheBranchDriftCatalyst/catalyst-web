{ pkgs ? import <nixpkgs> {} }:

pkgs.stdenv.mkDerivation {
  name = "CatalystNextMountableApp";
  buildInputs = [ pkgs.nodejs pkgs.yarn ];

  # General configuration and build steps for the Next.js app
  configurePhase = ''
    # Configuration steps if any
  '';

  buildPhase = ''
    yarn install
    yarn build
  '';

  installPhase = ''
    mkdir -p $out
    cp -r ./out $out/
  '';
}
