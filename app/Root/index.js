// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

type Props = {};

export default class Root extends Component<Props> {
  render() {
    return (
      <Router>
        <App />
      </Router>
    );
  }
}
