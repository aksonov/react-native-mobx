import React from 'react';
import {Router, Scene} from 'react-native-mobx';
import {useStrict} from 'mobx';
//useStrict(true);

// view and model for Counter scene
import Counter from './components/Counter';
import store from './model/counter';

export default () =>
  <Router>
    <Scene key="launch" component={Counter} hideNavBar store={store}/>
  </Router>
