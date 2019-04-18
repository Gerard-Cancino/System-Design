import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MyRoute from './Route.js';

// npm run dev to create main.js
class App extends Component {
  render() {
    return (
      <MyRoute />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
