import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import './App.css';

// Web3 dapp utilities
import { web3 } from './Dapp'

class App extends Component {
  state = {
    logged: false,
    account: null
  }

  componentDidMount() {
    web3.eth
      .getAccounts()
      .then((e) => {
        console.log('web3 getAccounts()', e)
        this.setState({
          logged: true,
          account: e.pop()
        })
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {
            this.state.logged
            ?
              <p>Your current account is <code>{this.state.account}</code>.</p>
            :
              <p>Please unlock <a href="https://metamask.io/">MetaMask</a></p>
          }
        </header>
      </div>
    );
  }
}

export default App;
