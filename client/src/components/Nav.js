import React from 'react';
import github from '../images/github.png';
import '../layout/components/nav.sass';

function Nav() {
  return (
    <div>
      <nav class="nav">
        <a href="/" class="nav__brand">
          HODL
        </a>
        <a href="https://github.com/KadenZipfel/hodl" class="nav__icon">
          <img src={github} alt="Github" class="nav__icon" />
        </a>
      </nav>
    </div>
  )
}

export default Nav;