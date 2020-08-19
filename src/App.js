import React from 'react';
import './App.css';
import Status from './providers/Status'
import Log from './providers/Log'
import Summary from './components/Summary'
import List from './components/List'
function App() {
  return (
    <Log>
      <Status>
        <main>
          <Summary />
          <List />
        </main>
      </Status>
    </Log>
  );
}

export default App;
