import React, { Component } from 'react';
import Routes from './components/Routes';
import HeaderBar from './components/HeaderBar';
import Notifications from './components/Notifications';

class App extends Component {
  constructor(props){
    super();
  }

  render() {
    return (
      <div className="App">
          <HeaderBar/>
          <Routes />
          <Notifications />
      </div>
    );
  }
}

export default App;