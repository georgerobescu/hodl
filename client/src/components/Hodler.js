import React, {Component} from 'react';

import '../layout/components/hodler.sass';

class Hodler extends Component {
  state = {
    date: null
  };

  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.getTime();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getTime() {
    if(this.props.user.earliest < Math.floor(Date.now() / 1000)) {
      this.setState({date: 0});
    } else {
      return this.formatTime(this.props.user.earliest - Math.floor(Date.now() / 1000));
    }
  }

  formatTime(time) {
    const date = new Date(time * 1000);
    const days = date.getUTCDate() - 1;
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getSeconds();
    this.setState({
      date: {
        days, 
        hours,
        minutes,
        seconds
      }
    });
  }

  renderTime() {
    if(this.state.date != null && this.state.date !== 0) {
      return(
        <div className="hodler__group">
          <p className="hodler__name">
            Time left:
          </p>
          <p className="hodler__value">
            <span>{this.state.date.days}</span> days <span>{this.state.date.hours}</span> hours <span>{this.state.date.minutes}</span> minutes <span>{this.state.date.seconds}</span> seconds
          </p>
        </div>
      );
    }
  }

  handleWithdrawal = () => {
    this.props.contract.methods.withdraw().send({
      from: this.props.account
    }, () => {
      this.props.setMessage('Transaction Pending...');
    }).on('confirmation', () => {
      this.props.setMessage('Transaction Confirmed!');
      this.props.getUser();
      setTimeout(() => {
        this.props.clearMessage();
      }, 10000);
    });
  }

  renderButton() {
    if(this.state.date === 0) {
      return(
        <button onClick={this.handleWithdrawal} className="hodler__button">
          Withdraw
        </button>
      );
    }
  }

  render() {
    return(
      <section className="hodler">
        <div className="hodler__group">
          <p className="hodler__name">
            Eth locked:
          </p>
          <p className="hodler__value">
            <span>{this.props.web3.utils.fromWei(this.props.user.amount, 'ether')}</span> eth
          </p>
        </div>
        {this.renderTime()}
        {this.renderButton()}
      </section>
    )
  }
}

export default Hodler;