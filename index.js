import React from 'react';
import {
  Actions,
  DefaultRenderer,
  Modal,
  ActionConst,
  NavBar,
  Reducer,
  Router as OriginalRouter,
  Scene,
  Switch as OriginalSwitch,
  TabBar,
  getInitialState,
  Util,
} from 'react-native-router-flux';
import {observer} from "mobx-react/native"
import {autorunAsync, autorun} from 'mobx';
import {InteractionManager} from 'react-native';

const handlers = {};
const originalIterate = Actions.iterate;

function addHandler(root){
  if (!handlers[root.key] && root.props.state) {
    const state = root.props.state;
    state.listener = {
      onEnter: (props) => {
        console.log("RUN ACTION", root.key);
        Actions[root.key](props);
        //InteractionManager.runAfterInteractions(()=>Actions[root.key](props));
      },
      onExit: (props) => {
        Actions.pop();
      }
    };
    console.log(`add lister for ${root.key}`)
    handlers[root.key] = state.listener;
  }
}

Actions.iterate = (root: Scene, parentProps = {}, refsParam = {}, wrapBy) => {
  let type = root.props.type || (parentProps.tabs ? ActionConst.JUMP : root.props.state ? ActionConst.PUSH_OR_POP : ActionConst.PUSH);
  let list = root.props.children || [];
  if (!(list instanceof Array)) {
    list = [list];
  }
  addHandler(root);
  list.forEach(addHandler);
  
  return originalIterate({...root, props: {...root.props, type}}, parentProps, refsParam, wrapBy);
}

@observer
class Router extends React.Component {
  render() {
    const {navBar, ...newProps} = this.props;
    if (navBar) {
      newProps.navBar = observer(navBar);
    }
    return <OriginalRouter wrapBy={observer} {...newProps}/>
  }
}

class Switch extends React.Component {
  render() {
    const selector = props => {
      const navState = props.navigationState;
      const statem = props.statem;
      if (!statem) console.error('statem/selector should be defined.');
      let selectedKey = undefined;
      // support Statem - Harel statecharts machine!
      navState.children.forEach((el, i) => {
        if (!(el.default || el.state)) {
          console.error(`Either default or state should be defined for element=${el.key}`);
        }
        if (el.default) {
          selectedKey = el.sceneKey;
        } else {
          if (el.state.active) {
            selectedKey = el.sceneKey;
          }
        }
      });
      return selectedKey;
    }
    return <OriginalSwitch selector={selector} {...this.props}/>
  }
}

export {
  Actions,
  ActionConst,
  DefaultRenderer,
  Modal,
  NavBar,
  Reducer,
  Router,
  Scene,
  Switch,
  TabBar,
  getInitialState,
  Util,
};
