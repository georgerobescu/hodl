import React from 'react';
import '../layout/components/hero.sass';

function Hero() {
  return (
    <section class="hero">
      <h4 class="hero__subheader">Weak hands?</h4>
      <h1 class="hero__header">HODL</h1>
      <p class="hero__directions">
        Enter recipient address and lockup time.
      </p>
      <form>
        <input 
          type="text" 
          name="address"
          class="hero__input hero__input--address"
          placeholder="0x00000000000000000000000000000"
        />
        <br />
        <input 
          type="text" 
          name="time"
          class="hero__input hero__input--time"
          placeholder="12345678901234"
        />
        <select name="unit" id="unit" class="hero__unit">
          <option value="seconds">Seconds</option>
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
          <option value="months">Months</option>
          <option value="years">Years</option>
        </select>
        <button class="hero__button">Go</button>
      </form>
      <p class="hero__disclaimer">
        The value sent with this transaction will be locked in a
        <br />
        smart contract for as long as specified and can only be 
        <br />
        withdrawn by the chosen recipient.
      </p>
    </section>
  )
}

export default Hero;