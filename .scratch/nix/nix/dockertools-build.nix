# TODO: see https://discourse.nixos.org/t/dockertools-nix-with-skaffold-custom-builds/8771/5
...
let
  skaffold-build-nix-container = pkgs.writeShellScriptBin "skaffold-build-nix-container" ''
    set -e

    repo=$(echo "$IMAGE" | cut -d':' -f 1)
    tag=$(echo "$IMAGE" | cut -d':' -f 2)
    out="$(mktemp -u)"
    nix-build "$BUILD_CONTEXT/Nixfile.nix" -A "images.$repo" -o "$out" --arg image-tag "\"$tag\""
    ${pkgs.docker}/bin/docker load -i $out

    if $PUSH_IMAGE; then
        ${pkgs.docker}/bin/docker push $IMAGE
    fi
  '';
in
pkgs.mkShell {
  buildInputs = [
    ...
    skaffold-build-nix-container
  ];
}