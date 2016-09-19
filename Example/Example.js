import React, {Component} from 'react';
import {View} from 'react-native';
import {Router, Scene} from 'react-native-mobx';
import {useStrict} from 'mobx';
import {observer} from 'mobx-react/native';
useStrict(true);

// view and model for Counter scene
import Counter from './components/Counter';
import store from './model/counter';

const OCounter= observer(Counter);

@observer
export default class Example extends Component {
  render(){
    return <OCounter store={store}/>
  }
}
