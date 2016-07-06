import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';


export default class Counter extends Component {
  shouldComponentUpdate(){
    alert('!');
    return false;
  }

  render(){
    const store = this.props.store;
    return <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to React Native Reactive!
      </Text>
      <Text>Counter: {store.counter}</Text>
      <Text>Total clicks: {store.total}</Text>
      <Button onPress={store.increase}>+</Button>
      <Button onPress={store.decrease}>-</Button>
    </View>;


  }
}

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
