// @flow
import React, { Component } from 'react';

import Test from '@components/Test';
import { testDB } from '@data/utils';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  constructor() {
    super();

    testDB();
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <Test />
      </div>
    );
  }
}
