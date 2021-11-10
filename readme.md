<h3 align="center">
	mastery-egress-voucher-consumer
</h3>

<p align="center">
	Kafka consumer for egress voucher
</p>

<p align="center">
	<a href="https://www.typescriptlang.org/">
		<img src="https://aleen42.github.io/badges/src/typescript.svg" />
	</a>
	<a href="https://eslint.org/">
		<img src="https://aleen42.github.io/badges/src/eslint.svg" />
	</a>
</p>

<p align="center">
	<a href="https://github.com/masterysystems/mastery-egress-voucher-consumer/actions?query=workflow%3Aci">
		<img src="https://github.com/masterysystems/mastery-egress-voucher-consumer/workflows/ci/badge.svg" title="CI Action Workflow">
	</a>
</p>

## Development Setup

-   run `npm i -g yarn`

## GH Registry Setup

login to the GitHub NPM Registry

```console
$ npm login --registry=https://npm.pkg.github.com
```

<p>
	<i>This sets up being able to install private modules within the @masterysystems scope</i>
</p>

## Commands

Install dependencies

```console
$ yarn
```

Run tests

```console
$ yarn test
```

Lint (fix)

```console
$ yarn lint
```

Build

```console
$ yarn build
```

Run local dev

```console
$ yarn dev
```

## Deployment Process

-   Merge into master
-   Run `npm version major|minor|patch`
-   Run `git push —tags` and `git push`
-   Run `npm-release masterysystems/<repository> refs/vx.x.x`
    -   Will need to install `npm i -g @masterysystems/lachesis-npm-release-action`
    -   You will need access to the private mastery systems npm package repository
-   Run the [deploy-release workflow](./.github/workflows/deploy-release.yml), or an environment specific workflow
    -   Docker image tag will be the commit SHA from the branch (most likely master) that was used to generate the image

### Editors

<b>VS Code</b>

> settings.json (workspace)

```json
{
    "editor.formatOnSave": true,
    "eslint.alwaysShowStatus": true,
    "eslint.format.enable": true,
    "eslint.packageManager": "yarn",
    "[javascript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "[typescript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```
