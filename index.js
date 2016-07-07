import React from 'react';
import {
  Actions,
  DefaultRenderer,
  Modal,
  NavBar,
  Reducer,
  Router as OriginalRouter,
  Scene,
  Switch,
  TabBar,
  getInitialState,
  Util,
} from 'react-native-router-flux';
import {observer} from "mobx-react/native"
import {autorunAsync} from 'mobx';

const handlers = {};
const originalIterate = Actions.iterate;

function addHandler(root){
  if (!handlers[root.key] && root.props.state) {
    const state = root.props.state;
    handlers[root.key] = autorunAsync(()=> {
      if (state.active) {
        if (state.props && state.props.pop){
          console.log("RUN POP ACTION");
          Actions.pop();
        } else {
          console.log("RUN ACTION", root.key);
          Actions[root.key](state.props);
        }
      }
    });
  }
}

Actions.iterate = (root: Scene, parentProps = {}, refsParam = {}, wrapBy) => {
    let list = root.props.children || [];
    if (!(list instanceof Array)) {
      list = [list];
    }
    addHandler(root);
    list.forEach(addHandler);
    
  return originalIterate(root, parentProps, refsParam, wrapBy);
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


export {
  Actions,
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
