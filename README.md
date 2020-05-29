# Jur Platform

Jur Platform will be available at <https://jur.io/mvp/>

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://github.com/storybooks/storybook)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

> Note: this project should be refactored using _Drizzle Truffle Box ([Further info here](https://github.com/truffle-box/drizzle-box))_

## Deployments ☁

- Test https://test.jur.io/
- Jur Academy http://68.183.13.0/
- Production https://beta.jur.io/

## Dependencies

### Global (host) dependencies

- **Truffle** as EVM framework _([more info here](https://truffleframework.com/docs/truffle/getting-started/installation))_;
- **Ganache CLI** for ETH test network _([more info here](https://github.com/trufflesuite/ganache-cli))_;
- **VeChain Thor** for VeChain Thor Blockchain test network _([more info here](https://github.com/vechain/thor))_;
- **Dot Env** for environment configuration _([more info here](https://github.com/motdotla/dotenv#readme))_;
- **Composer** as PHP package manager for Lumen/Laravel framework _([more info here](https://getcomposer.org/))_
- **Docker** for service containers management _([more info here](https://docs.docker.com/))_

### Direct Dependencies

- **react-blockies** for users ident icons _(based on ETH Blockies [more info here](https://github.com/ethereum/blockies))_

### Development (host)

- **prettier** for coding style format _([more info here](https://prettier.io))_;
- **storybook** for ui components _([more info here](https://github.com/storybooks/storybook))_;

### Editor

Your code editor should be compatible with [.editorconfig](https://editorconfig.org) or [Prettier](https://prettier.io).
_Please note: this project supports both._

## Branches

This project repo is organized in 3 branches:

- **master**: is a mirror of _production_ environment;
- **beta**: is a mirror of _stage_ environment;
- **develop**: for development purposes;

### Git Workflow

Using this repository you should follow this workflow: [Atlassian Git-flow](https://it.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow), by using _**features**_, _**hotfix**_ and _**releases**_ through previous mentioned branches.

## Architecture 🏰

This project is structured as following:

- **Frontend** build with [React.js](https://reactjs.org) + [Drizzle](https://truffleframework.com/drizzle) + [connex](https://connex.vecha.in/#/)
- **REST API** built with [Laravel Lumen](https://lumen.laravel.com)
- **Runtime** managed by [Docker](https://www.docker.com/) 🐳 and [docker-compose](https://docs.docker.com/compose/)
- **Smart Contracts** deployed by Truffle 🍰 + web3-gear ⚙️
- **Blockchain** is [VeChainThor](https://github.com/vechain/thor) 🔨
- **Blockchain Interfaces** are provided by ☄ [Comet](https://chrome.google.com/webstore/detail/comet/jpkkakbelpcambmhdcaoidiejaikiemn) (in Chrome browser) and ♻️ [Sync browser](https://env.vechain.org/)

## Environment setup

This project uses `.env` files in order to please [follow the instructions here](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables) and create this file based on your needs.

> **NOTE** : only constants definition prefixed by `REACT_APP_` will be available in React App.

_**You can find the environment configuration template [here](.env.template).**_

### List of `.env` files

1. `.env` root env file used by react app.
1. `rest/.env` backend env file used by lumen app.
1. `polling-service/.env` nodeJS based polling service env file.
1. `.env.docker-compose` for variables used in `docker-compose.yml` file.

All the env files have equivalent _`*.example`_ files to be used as a starting point for creating your own `.env` files. Please make sure that `.env` files are not checked in the git. `.env` files may contain secrets (passwords) and hence must be protected.

## Details of docker services 🤓

### 1️⃣ Polling Service

This service listens to blockchain and pulls out relevant information. It uses `web3` for communicating with the VeChain Thor blockchain. It scans every block and sees if it has information about smart contracts/transactions we are interested in as mentioned in configuration files. Once a relevant transaction/event is found, it sends it to RabbitMQ service.

Docker-compose name is `polling`.

**⚙️ Config:** Polling service needs URL for thor API and URL for RabbitMQ. Both of these are taken from the `polling-service/.env` file.

If the thor node is running outside the docker on your local machine, you have to provide machine's IP address on Linux (e.g. `http://192.168.0.32:8669`) OR special binded IP `http://host.docker.internal:8699` for macOS/Windows.

In the `polling-service/config` folder, there are two files:

1. `currentBlock.json` for storing the last read block's number
1. `smart-contracts.json` for reading the info on interested events and contract addresses.

You have to update `currentBlock.json` manually with the least block id of your locally deployed contracts. Among JUR Token, Arbitration and Oath Keeper smart contracts, the least block id will be that of JUR Token smart contract.

**Test cases:** To run test cases, please follow the instructions bellow:

```bash
cd polling-service
npm install # in case any package is missing
npm run test
```

**📦 Stack:** Polling service is written using NodeJS. Lifecycle is handled by docker-compose. The service will auto restart if crashed.

### RabbitMQ service

This service provides queue storage between the polling service and lumen's listeners. It has a common queue named `blockchain-events` for all the relevant events received from blockchain.

Docker-compose name is `rabbit`.

**⚙️ Config:** This service can run without any configuration. In that case it will use the default username and password of RabbitMQ. Default username is `guest` and password is also `guest`. You can (and should) override the username and password in `.env.docker-compose`. The changes you make here for the username and password, must be reflected in the polling service and rest's `.env` files so that they can access the rabbitmq service.

**📦 Stack:** RabbitMQ service is using the standard docker image `rabbitmq:3.8`. It's based on Erlang and uses Erlang Cookie Common Auth for internal communication between rabbitmq daemon and rabbitmqctl.

### Rest service

This is the backend service provider for all of our centralized APIs and background tasks.

Docker-compose name is `jur`.

**⚙️ Config:** All the config needed by the rest service is provided via `rest/.env` file. You may want to mount the `rest/.env` file for the latest changes to be picked up by this service. If the file is not mounted, the docker will pick up the existing file which was copied during the build process. You can see which config file is actually being used by getting into a running docker and inspecting the file at `/var/www/html/.env`. Alternative to mounting the `rest/.env` file is to rebuild the `jur` image.

This service needs regular db migrations whenever a new migration file is checked in. You can run migrations by referring to [run db migrations](#/how-to-run-db-migrations).

**📦 Stack:** Rest service (also called **jur docker, lumen app, backend**) is a Laravel Lumen app written in PHP 7.2. It serves the production build of frontend assets, APIs and executes the background jobs. It has a supervisor for running background jobs. The nginx server takes care of request handling.

### Mysql service

This is the main centralized database and primarily interacted through the rest service.

Docker-compose name is `db`.

**⚙️ Config:** Mysql service takes credentials from the docker-compose file. {TODO: credentials should be moved to `.env.docker-compose`}

**📦 Stack:** Mysql service uses the standard `mysql:5.7` docker image.

## Running Test Network

### Ethereum [depr]

To run a test ethereum network, in a separate terminal execute:
`ganache-cli --gasLimit 7000000`

### VeChain

**!!! Before run !!!**

> Make sure you've already installed [VeChain Thor](https://github.com/vechain/thor#installation)

> Also make sure you've deployed smart contracts on the local solo network using [Web3-Gear](https://github.com/vechain/web3-gear) using options `--log 1` and `--debug 1` for logging and debugging purposes.

To run a test vechain blockchain network, in a separate terminal execute:
`$ bin/thor solo --gas-limit 7000000 --on-demand`

#### Configuration [depr]

Please select the network properly in `src/config/drizzleOptions.js` file where you can find a node `vechain` that can be filled with a boolean value (for mainnet) or a string of your host (in ex. http://localhost:8669 in SOLO mode)

## Rest API

REST API are used to keep all user, contracts and disputes data off-chain.
This service is exposed via Lumen and is accessible via Docker.

> Please have a look at the Postman config available under `rest/postman` for further informations about endpoints

## Storybook

In order to have a full overview of the components available for this project please run **Storybook** available at <http://localhost:9009> once you have run the following commands.

1.  Make sure you have installed host dependencies;
2.  Make sure you have installed project dependencies (step one of _First run flow_);
3.  Run `npm run storybook`;

If all goes well Storybook is accessible at <http://localhost:9009>

## Connex

Connex is the standard interface to connect VeChain apps with VeChain blockchain and users.<br>

> Is under development migration to Connex as authentication, reading and writing method to the blockchain.

Connex method used into DApp are:

- **Authentication**: perform a certificate signing request with `identification` purpose.<br>
  [more info here](https://docs.vechain.org/connex/api.html#certificate-signing-service).<br>

  > Into DApp is used into `signCertIdentification` method available [here](https://github.com/jurteam/platform/blob/feature/connex/src/api/connex/Sign.js)

- **Contract Method call**: to call a contract method without altering contract state.<br>
  [more info here](https://docs.vechain.org/connex/api.html#contract-method).<br>

  > Into DApp is used in the `balanceOf` method available [here](https://github.com/jurteam/platform/blob/feature/connex/src/api/connex/JURToken.js)

- **Transaction signing service**: perform a transaction signing request<br>
  [more info here](https://docs.vechain.org/connex/api.html#transaction-signing-service).<br>
  > Into DApp is used in the `createArbitration` method available [here](https://github.com/jurteam/platform/blob/feature/connex/src/api/connex/ArbitrationFactory.js)

## Docker based first run flow 🐳

> 🌟 This is the prefered way of running the project.

### Get all the tools we will need ⬇️

- [NodeJS](https://nodejs.org/it/)
- [Truffle (global)](https://github.com/trufflesuite/truffle)
- [Go](https://golang.org/doc/install) + [VeChain Thor](https://github.com/vechain/thor)
- [Docker](https://www.docker.com/) 🐳 and [docker-compose](https://docs.docker.com/compose/)
- [Postman](https://www.postman.com/)
- [Sync browser](https://env.vechain.org/)

### Steps for the setup

1. Create `.env` files in all the places mentioned in [Environment](#environments) section
1. `docker-compose up` For the first run, it will build the Jur image and fetch all other images. Once fetching/build is done, you can stop dockers for now `docker-compose stop`.
1. `bin/thor solo --gas-limit 10000000 --persist --on-demand` Alternatively you can connect to TESTNET using `bin/thor --network test`
1. Add auto created users from the previous command to your Comet or Sync
1. Run `npm install` at project root, `polling-service`, `protocol`, `smart-contracts/oath-keeper`
1. `web3-gear`
1. `npm run migrate-contracts` and `npm_config_network=development npm run migrate-oathkeeper`
1. `docker-compose up -d` starts dockers in background
1. For the first run of backend, you will need to [enter into running dockers](#/how-to-enter-into-running-dockers) and [run db migrations](#/how-to-run-db-migrations).
1. Add a user in the backend using the Postman collection available at `rest/postman`. Please import all the contents of the folder. Once opened in the Postman app, update environment variables. Then use the `store` API call in the users to create a new user using your wallet address.
1. Import JUR Token contract located at `src/build/contracts` into [Sync browser](https://env.vechain.org/) via [Inspector tool](https://inspector.vecha.in/#/contracts)
1. Mint some JUR Tokens for our use. Make sure the value of balance is more than 18 digits.
1. `npm run start`
1. Open the DApp in Chrome or Sync 🎉

### How to enter into running docker

**[Preferred]** Put the following code into your shell script's `rc` file and reload the source (`source .zshrc` or open a new terminal)

```sh
function de() {
  docker exec -i -t $1 /bin/bash -c 'export TERM=xterm; /bin/bash'
}

function o() {
  de $(docker ps | awk '{print $NF}' | grep $@);
}
```

Once you have aforementioned codes in the shell environment, you can get into any running docker by using it's container name/part of the name.

Examples:

```sh
o jur
o poll
o polling
```

**[Alternative]** To manually get into a running docker:

```sh
docker exec -it container_name /bin/sh
```

### How to run db migrations

1. `docker-compose up -d jur`
1. `o jur` OR use alternative ways to enter into running docker
1. `cd /var/www/html` Our PHP codes (lumen) are here
1. `php artisan migrate:refresh` this will rollback everything and then run migration OR `php artisan migrate` for incremental migration

## First run flow

During the first run you should download and set up Laravel packages and the database. Just follow these commands.

> This step by step guide assumes that _Metamask_ and required host packages was already configured.

### 1. Project Dependencies Manager

    $ cd path/to/project/root
    $ npm install

### 2. Setup configuration

Based on [.env.template](.env.template) create your local environment file and change `<api-base-url>` and other constants in relation to your host.

> A standard **.env.local** configuration can have `REACT_APP_API_BASE_URL=http://localhost/api/v1`

### 3. Smart Contract Build

    $ cd path/to/project/root/protocol
    $ npm install
    $ ganache-cli --gasLimit 7000000
    $ truffle compile
    $ cd ..
    $ npm run migrate-contracts

Once the contracts are migrated and are available on your local network you should Mint some tokens. To do that, you can use the last test available under **protocol** folder (`protocol/test/07_mint_tokens.js`).

> Please use the `truffle network` command to look at token address for minting (edit test file at row 17) and token adding in _Metamask_ extension.

### 4. Docker Environment for API

    $ cd path/to/project/root
    $ docker-compose build
    $ docker-compose up -d
    $ docker exec -ti jur-mvp_jur_1 bash
    $ cd var/www/html/
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

## Deploy

After you have configured the environment on remote machine and already [give the right permissions for rsync](https://askubuntu.com/questions/719439/using-rsync-with-sudo-on-the-destination-machine#answer-719440)

You should use `./bin/deploy.sh` script in order to deploy.

There are 3 parameters to look at:

- `-e|--environment` to specify an environment from **deploy-conf.yml** file;
- `-f|--frontend` equals 1 in order to deploy frontend only;
- `-b|--backend` equals 1 in order to deploy backend only;
- `--all` equals 1 to deploy both frontend and backend.

This operation uses `rsync` with sudo and and excludes files and folder written in **deploy-exclude.list** file.

> Take a look also to `.template` files for this.

> Please note: this operation should be automated using a CI service like CircleCI. Feel free to use this script on a runner machine.

## Available Scripts

> **NOTE** : see the [_Environment setup_](#environment-setup) section for further details before running the scripts.

In the project directory, run:

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

Run this command in order to view the app storybook (and the entire components list) in your browser.

### `npm run build-storybook`

**Note: this command will work only if you had installed `storybook` as global npm package!**

Run this command in order to build a public storybook.

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

## Contributing Guide

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Troubleshooting

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## Change Log

See [CHANGELOG.md](CHANGELOG.md)
