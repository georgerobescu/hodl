import React from 'react';
import '../layout/components/hero.sass';

function Hero(props) {
  return (
    <section className="hero">
      <h4 className="hero__subheader">Weak hands?</h4>
      <h1 className="hero__header">HODL</h1>
      <p className="hero__directions">
        Enter amount and lockup time.
      </p>
      <form>
        <input 
          type="text" 
          name="amount"
          className="hero__input hero__input--amount"
          placeholder="Amount (eth)"
        />
        <input 
          type="text" 
          name="time"
          className="hero__input hero__input--time"
          placeholder="Time (seconds)"
        />
        <button className="hero__button">Go</button>
      </form>
      <p className="hero__disclaimer">
        The value sent with this transaction will be locked in a
        <br />
        smart contract for as long as specified and can only be 
        <br />
        withdrawn by {props.address}.
      </p>
    </section>
  )
}

export default Hero;