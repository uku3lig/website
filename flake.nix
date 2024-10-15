{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    flake-parts = {
      url = "github:hercules-ci/flake-parts";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };
  };

  outputs = {flake-parts, ...} @ inputs:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = ["x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin"];

      perSystem = {
        lib,
        pkgs,
        ...
      }: {
        devShells.default = with pkgs;
          mkShell {
            buildInputs = [bun];

            LD_LIBRARY_PATH = lib.makeLibraryPath [stdenv.cc.cc.lib];
          };

        formatter = pkgs.alejandra;
      };
    };
}
