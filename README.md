# JUR MVP

JUR MVP will be available at <https://jur.io/mvp/>

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)](https://github.com/storybooks/storybook)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

> Note: this project should be refactored using _Drizzle Truffle Box ([Further info here](https://github.com/truffle-box/drizzle-box))_

## Dependencies

### Global (host) dependencies

-   **Truffle** as EVM framework _([more info here](https://truffleframework.com/docs/truffle/getting-started/installation))_;
-   **Ganache CLI** for ETH test network _([more info here](https://github.com/trufflesuite/ganache-cli))_;
-   **Dot Env** for environment configuration _([more info here](https://github.com/motdotla/dotenv#readme))_;
-   **Composer** as PHP package manager for Lumen/Laravel framework _([more info here](https://getcomposer.org/))_
-   **Docker** for service containers management _([more info here](https://docs.docker.com/))_

### Direct Dependencies

-   **react-blockies** for users ident icons _(based on ETH Blockies [more info here](https://github.com/ethereum/blockies))_

### Developmnent (host)

-   **prettier** for coding style format _([more info here](https://prettier.io))_;
-   **storybook** for ui components _([more info here](https://github.com/storybooks/storybook))_;

### Editor

Your code editor should be compatible with [.editorconfig](https://editorconfig.org) or [Prettier](https://prettier.io).
_Please note: this project supports both._

## Branches

This project repo is organized in 3 branches:

-   **master** : is a mirror of _production_ environment;
-   **beta** : is a mirror of _stage_ environment;
-   **develop** : for development purposes;

### Git Workflow

Using this repository you should follow this workflow: [Atlassian Git-flow](https://it.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow), by using _**features**_, _**hotfix**_ and _**releases**_ throuth previous mentioned branches.

## Architecture

This project is structured as following:

-   **Frontend** build with [React.js](https://reactjs.org) + [Drizzle](https://truffleframework.com/drizzle)
-   **REST API** built with [Laravel Lumen](https://lumen.laravel.com)

## Environment setup

This project uses a `.env` file in order to please [follow the instructions here](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables) and create this file based on your needs.

> **NOTE** : only constants definition prefixed by `REACT_APP_` will be available in React App.

_**You can find the environment configuration template [here](.env.template).**_

## Running Test Network

To run a test ethereum network, in a separate terminal execute:
`ganache-cli --gasLimit 7000000`

## Rest API

REST API are used to keep all user, contracts and disputes data off-chain.
This servise is exposed via Lumen and is accessible via Docker.

> Please have a look at the Postman config available under `rest/postman` for furter informations about endpoints

## Storybook

In order to have a full overview of the components available for this project please run **Storybook** available at <http://localhost:9009> once you have run the following commands.

1.  Make sure you have installed host dependencies;
2.  Make sure you have installed project dependencies (step one of _First run flow_);
3.  Run `npm run storybook`;

If all goes well Storybook is accessible at <http://localhost:9009>

## First run flow

On first run you should download and setup Laravel packages and database. Just follow this commands.

> This step by step guide assumes that _Metamask_ and required host packages was already configured.

### 1. Project Dependecies Manager

    $ cd path/to/project/root
    $ npm install

### 2. Setup configuration

Based on [.env.template](.env.template) create your local environment file and change `<api-base-url>` and `<provider>` constant in relation to your host.

> A standard **.env.local** configuration can have `REACT_APP_API_BASE_URL=http://localhost/api/v1` and `REACT_APP_ETHEREUM_PROVIDER=http://localhost:8545`

### 3. Smart Contract Build

    $ cd path/to/project/root/protocol
    $ npm install
    $ ganache-cli --gasLimit 7000000
    $ truffle compile
    $ cd ..
    $ npm run migrate-contracts

Once contracts is migrated and available on your local network you should Mint a couple of Token. To do it you can use the last test available under **protocol** folder (`protocol/test/07_mint_tokens.js`).

> Please use `truffle network` command to look at token address for minting (edit test file at row 17) and token adding in _Metamask_ extension.

### 4. Docker Environment for API

    $ cd path/to/project/root
    $ docker-compose build
    $ docker-compose up -d
    $ docker exec -it php bash
    $ cd ..
    $ composer install
    $ php artisan key:generate
    $ php artisan migrate:refresh
    $ php artisan db:seed

If all goes well, all API endpoints are accessible at <http://localhost/api/v[api-version]>.

### 5. DApp run

    $ cd path/to/project/root
    $ npm start -- --reset-cache

If all goes well, now Dapp is accessible at <http://localhost:3000>.

#### `$ docker-compose up -d`

This command will **launch** REST API service on your host.

#### `$ docker-compose stop`

This command will **stop** REST API service on your host.

## Available Scripts

> **NOTE** : see the [_Environment setup_](#environment-setup) section for further details before first run of the following scripts.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open <http://localhost:3000> to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run migrate-contracts`

**Note: this command will work only if you had installed `truffle` as global npm package!**

> Please install the same version available in protocol README.md - _**Truffle** `^4.1.11`_

Run this command in order to migrate Smart Contract from protocol repository.

### `npm run storybook`

**Note: this command will work only if you had installed `storybook` as global npm package!**

Run this command in order to view app storybook (and the entire components list) in your browser.

### `npm run build-storybook`

**Note: this command will work only if you had installed `storybook` as global npm package!**

Run this command in order to build public storybook.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: <https://facebook.github.io/create-react-app/docs/code-splitting>

### Analyzing the Bundle Size

This section has moved here: <https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size>

### Making a Progressive Web App

This section has moved here: <https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app>

### Advanced Configuration

This section has moved here: <https://facebook.github.io/create-react-app/docs/advanced-configuration>

### Deployment

This section has moved here: <https://facebook.github.io/create-react-app/docs/deployment>

### `npm run build` fails to minify

This section has moved here: <https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify>

# Contributing Guide

See [CONTRIBUTING.md](CONTRIBUTING.md)

# Troubleshooting

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

# Change Log

See [CHANGELOG.md](CHANGELOG.md)
