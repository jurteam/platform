import React, { Component } from 'react';
import Blockies from 'react-blockies';
import './App.scss';

// Web3 dapp utilities
import { web3 } from './Dapp'
var wallet = null;

web3.eth.getAccounts((err, accounts) => {
  console.log(accounts);
  console.log(err);
  wallet = accounts[0];
})

// provider change handler
if (web3.currentProvider.host === 'metamask') { // only if current provider is hosted by MetaMask
  web3.currentProvider.connection.publicConfigStore.on('update', (ev) => console.log('MetaMask update', ev));
}

class App extends Component {
  state = {
    metamask: false,
    logged: false,
    wallet: null
  }

  componentDidMount() {

    this.setState({ metamask: web3.currentProvider.host === 'metamask' })

    web3.eth.getAccounts((err, wallets) => {
      console.log(wallets);
      console.log(err);
      wallet = wallets[0];
      this.setState({
        logged: true,
        wallet
      })
    })
  }

  render() {
    return (
      <div className="jur">
        <header className="jur--header">
          {
            this.state.logged
            ?
              <div>
                <p>Your current account is <Blockies seed={this.state.wallet} size={8} scale={6} bgColor="#486aad" color="#37cda9" spotColor="#96f490" /> <code>{this.state.wallet}</code></p>
              </div>
            :
              <p>Please unlock <a href="https://metamask.io/">MetaMask</a></p>
          }
        </header>
      </div>
    );
  }
}

export default App;
