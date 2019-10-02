import React, {Component} from 'react';
import '../layout/components/hero.sass';

class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      time: ''
    }

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAmountChange(e) {
    this.setState({amount: e.target.value});
  }

  handleTimeChange(e) {
    this.setState({time: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.contract.methods.deposit(
      this.state.time, 
      this.props.web3.utils.toWei(this.state.amount)
    ).send(
      {from: this.props.account,
      value: this.props.web3.utils.toWei(this.state.amount)},
      () => {
        this.props.setMessage('Transaction Pending...');
      }
    ).on('confirmation', () => {
      this.props.setMessage('Transaction Confirmed!');
      this.props.getUser();
      setTimeout(() => {
        this.props.clearMessage();
      }, 10000);
    }).on('error', () => {
      this.props.setMessage('Transaction Failed.');
      this.props.getUser();
      setTimeout(() => {
        this.props.clearMessage();
      }, 10000);
    });
  }

  render() {
    return (
      <section className="hero">
        <h4 className="hero__subheader">Weak hands?</h4>
        <h1 className="hero__header">HODL</h1>
        <p className="hero__directions">
          Enter amount and lockup time.
        </p>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            name="amount"
            className="hero__input hero__input--amount"
            placeholder="Amount (eth)"
            value={this.state.amount}
            onChange={this.handleAmountChange}
          />
          <input 
            type="text" 
            name="time"
            className="hero__input hero__input--time"
            placeholder="Time (seconds)"
            value={this.state.time}
            onChange={this.handleTimeChange}
          />
          <button className="hero__button">Go</button>
        </form>
        <p className="hero__disclaimer">
          The value sent with this transaction will be locked in a
          <br />
          smart contract for as long as specified and can only be 
          <br />
          withdrawn by {this.props.account}.
        </p>
      </section>
    );
  }
}

export default Hero;