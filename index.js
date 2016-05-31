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

function Router(props){
  const {navBar, ...newProps} = props;
  if (navBar){
    newProps.navBar = observer(navBar);
  }
  return <OriginalRouter wrapBy={observer} {...newProps}/>
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
