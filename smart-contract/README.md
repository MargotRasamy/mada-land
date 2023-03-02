# Smart contract for transactions

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

Create a .env file with these properties :

ACCOUNT_PRIVATE_KEY: the account used to deploy on a the chosen testnet
RPC_URL: the rpc url found on infura or alchemy
ETHERSCAN_API_KEY: the api key on etherscan account

```
ACCOUNT_PRIVATE_KEY=
RPC_URL=
ETHERSCAN_API_KEY=
```

To deploy, run:

```shell
npx hardhat clean
```

```shell
npx hardhat compile
```

```shell
npx hardhat run scripts/deploy.js --network [chosen-network]
```

Après avoir déployé, on obtient l'adresse du contrat et l'abi dans artifacts/contracts/[nom_contrat].json. L'abi sera utilisé par le clien pour invoquer le contrat.