## Package is obsolete with latest react-native-router-flux v4 - RNRF allows now wrapping all scenes and navbar by passing `wrapBy` param (equal to MobX `observer`) to `<Router>`

# react-native-mobx
React Native Reactive programming using [RNRF](https://github.com/aksonov/react-native-router-flux) and [MobX](https://mobxjs.github.io/mobx/)

## What is it?
Thin wrapper around Mobx allows to use all power of reactive programming but leave your React Native Components 'framework free' i.e doesn't depend from MobX, Redux, etc.


## How to use it?
This component is just thin wrapper around [RNRF](https://github.com/aksonov/react-native-router-flux), so check its docs, install it and then install this module and import it instead of RNRF.

Example of reactive model counter:

![demo](https://cloud.githubusercontent.com/assets/1321329/15446716/b4639f86-1f29-11e6-960d-5ba0c6f8fc47.gif)

Example.js:
```jsx
import React from 'react';
import {Router, Scene} from 'react-native-mobx';

// view and model for Counter scene
import Counter from './components/Counter';
import store from './model/counter';

export default () =>
  <Router store={store}>
    <Scene key="launch" component={Counter} hideNavBar/>
  </Router>
```

counter.js (model)
```jsx
import {reaction, observable, observe, computed, autorun} from 'mobx';
import autobind from 'autobind-decorator'

@autobind
class CounterStore {
  @observable counter = 0;
  total = 0;

  constructor(){
    reaction(()=>this.counter, ()=>this.total++);
  }


  increase(){
    this.counter++;
  }

  decrease(){
    this.counter--;
  }
}

export default  new CounterStore();
```

Counter.js (view)
```jsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Button from 'react-native-button';

const Counter = ({store}) =>
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to React Native Reactive!
    </Text>
    <Text>Counter: {store.counter}</Text>
    <Text>Total clicks: {store.total}</Text>
    <Button onPress={store.increase}>+</Button>
    <Button onPress={store.decrease}>-</Button>
  </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Counter;

```
