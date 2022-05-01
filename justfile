# JUSTFILE
# https://github.com/casey/just
#

export PATH := justfile_directory() + "/node_modules/.bin:" + env_var('PATH')

default:
    @just --list

# Project setup
setup:
    @echo '⛳ Begin project setup'
    pnpm install
    just fix
    husky install

# Record a changeset
change *command='':
    changeset {{command}}

build:
    nx run-many \
        --target=build \
        --all

# Process recorded changesets
release:
    changeset version

lint:
    nx affected \
        --target=lint

test:
    nx affected \
        --target=test \
        -- --ci --reporters=default --reporters=jest-junit

typecheck:
    nx affected \
        --target=typecheck

workspacelint:
    nx workspace-lint

prcheck: lint test typecheck

clean:
    git clean -xdf

fix:
    @echo "👨‍⚕️ Fixing monorepo problems"
    syncpack format
    syncpack set-semver-ranges

nx *command='':
    nx {{command}}

game *command='serve':
    nx {{command}} game
