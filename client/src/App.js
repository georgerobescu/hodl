import React, { Component } from "react";
import HodlContract from "./contracts/Hodl.json";
import getWeb3 from "./utils/getWeb3";

import Nav from './components/Nav';
import Hero from './components/Hero';

import './layout/config/_base.sass';

class App extends Component {
  state = { web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HodlContract.networks[networkId];
      const instance = new web3.eth.Contract(
        HodlContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

    this.getUser();
  };

  getUser() {
    this.state.contract.methods.getUser(this.state.accounts[0]).call((err, user) => {
      console.log('User: ', user);
    });
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
        <Nav />
        <Hero {...this.state} />
      </div>
    );
  }
}

export default App;
