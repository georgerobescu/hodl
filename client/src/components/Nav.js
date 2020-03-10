import React from 'react';
import '../layout/components/nav.sass';

function Nav(props) {
  return (
    <nav className="nav">
      <h1 className="nav__brand">
        HODL
      </h1>
      <button className="nav__address">
        {props.account ? `${props.account.slice(0, 4)}...${props.account.slice(props.account.length - 4, props.account.length)}` : 'Connect Metamask'}
      </button>
    </nav>
  )
}

export default Nav;