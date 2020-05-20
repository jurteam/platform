var token = require('../src/build/contracts/JURToken.json').networks;

const getJURToken = (network) => {
    if(network === 'development') return token["5777"].address;
    else if(network === 'mainnet') return token["1"].address;
    else if(network === 'testnet') return token["3"].address;
}

module.exports = {
    getJURToken
}