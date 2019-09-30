import React from 'react';
import github from '../images/github.png';
import '../layout/components/nav.sass';

function Nav() {
  return (
    <nav className="nav">
      <a href="/" className="nav__brand">
        HODL
      </a>
      <a href="https://github.com/KadenZipfel/hodl" className="nav__icon">
        <img src={github} alt="Github" className="nav__icon" />
      </a>
    </nav>
  )
}

export default Nav;