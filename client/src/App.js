import React from 'react';
import Nav from './components/Nav';

import { useWeb3Injected, useWeb3Network } from '@openzeppelin/network/react';

const infuraToken = '95202223388e49f48b423ea50a70e336';

function App() {
  const injected = useWeb3Injected();
  const local = useWeb3Network('http://127.0.0.1:8545');
  let network;
  network = useWeb3Network(`wss://ropsten.infura.io/ws/v3/${infuraToken}`, {
    pollInterval: 10 * 1000,
  });

  return (
    <div>
      <Nav />
    </div>
  );
}

export default App;
