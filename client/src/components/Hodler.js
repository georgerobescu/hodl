import React, {Component} from 'react';

import '../layout/components/hodler.sass';

class Hodler extends Component {
  getTime(earliest, now) {
    if(earliest < now) {
      return 0;
    } else {
      return earliest - now;
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
        <div className="hodler__group">
          <p className="hodler__name">
            Time left:
          </p>
          <p className="hodler__value">
            {/* Add proper units */}
            <span>{this.getTime(this.props.user.earliest, Math.floor(Date.now() / 1000))}</span> seconds
          </p>
        </div>
        <button className="hodler__button">
          Withdraw
        </button>
      </section>
    )
  }
}

export default Hodler;