#!/usr/bin/env nix-shell
#! nix-shell -i bash --pure
#! nix-shell -p bash httpie jq
#! nix-shell -I nixpkgs=https://github.com/NixOS/nixpkgs/archive/ecbc30d5ed9f75449233b17d4a4cdeab53af793f.tar.gz

for script in ./reqs/*.sh; do
    if [ -f "$script" ]; then
        bash "$script"
    fi
done

