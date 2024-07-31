{ pkgs ? import <nixpkgs> {} }:

let
  nodejs = pkgs.nodejs_21;
  yarn = pkgs.yarn;
  python = pkgs.python3;
in

pkgs.stdenv.mkDerivation {
  name = "KnowledgeDumpBase";
  src = ./.;

  buildInputs = [ pkgs.nodePackages.node-gyp-build nodejs yarn python pkgs.cacert pkgs.krb5  ];

  buildPhase = ''
    export HOME=$TMPDIR
    export NODE_EXTRA_CA_CERTS=${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt
    export npm_config_nodedir=${nodejs}
    export npm_config_python=${python}/bin/python
    yarn install
    yarn run build
  '';

  installPhase = ''
    mkdir -p $out/bin
    cp -r .next/standalone/* $out/bin
    cp -r .next/static $out/bin/.next/static
    chmod +x $out/bin/server.js
  '';

  shellHook = ''
    export NODE_ENV=production
    export NEXT_TELEMETRY_DISABLED=1
  '';
}
