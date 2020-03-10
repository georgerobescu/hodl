import React, { Component } from "react";
import HodlContract from "./contracts/Hodl.json";
import getWeb3 from "./utils/getWeb3";

import Nav from './components/Nav';
import Hero from './components/Hero';
import Hodler from './components/Hodler';
import Message from './components/Message';

import './layout/config/_base.sass';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      web3: null, 
      account: null, 
      contract: null, 
      user: null,
      message: null,
      balance: null
    };

    this.getUser = this.getUser.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }
 
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HodlContract.networks[networkId];
      const instance = new web3.eth.Contract(
        HodlContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, account, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, account, contract: instance });
    } catch (error) {
      console.error(error);
    }

    this.getUser();
    this.getBalance();

    this.accountInterval = setInterval(async () => {
      const accounts = await this.state.web3.eth.getAccounts();
      if (accounts[0] !== this.state.account) {
        this.setState({
          account: accounts[0]
        });
      }
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.accountInterval);
  }

  async getUser() {
    await this.state.contract.methods.getUser(this.state.account).call((err, user) => {
      this.setState({user: {
        earliest: user[0],
        amount: user[1],
        hodler: user[2]
      }});
    });
  }

  setMessage(newMessage) {
    this.setState({
      message: newMessage
    });
  }

  clearMessage() {
    this.setState({
      message: null
    });
  }

  getBalance() {
    this.state.contract.methods.getBalance().call((err, result) => {
      if(err) {
        return console.error(err);
      }
      this.setState({
        balance: this.state.web3.utils.fromWei(result.toString(), 'ether')
      });
    });
  }

  render() {
    if (this.state.user && this.state.user.hodler) {
      return (
        <div>
          <Nav {...this.state} />
          <Hodler 
            {...this.state} 
            getUser={this.getUser} 
            setMessage={this.setMessage}
            clearMessage={this.clearMessage}
          />
          <Message message={this.state.message} />
        </div>
      );
    } else {
      return (
        <div>
          <Nav {...this.state} />
          <Hero 
            {...this.state} 
            getUser={this.getUser}
            setMessage={this.setMessage}
            clearMessage={this.clearMessage}
          />
          <Message message={this.state.message} />
        </div>
      );
    }
  }
}

export default App;
