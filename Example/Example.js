import React from 'react';
import {Router, Scene} from 'react-native-mobx';
import {useStrict} from 'mobx';
useStrict(true);

// view and model for Counter scene
import Counter from './components/Counter';
import store from './model/counter';
import Test from './components/Test';

export default () =>
  <Router store={store}>
    <Scene key="launch" component={Counter} title="Counter"/>
    <Scene key="test" component={Test} title="Test"/>
  </Router>
