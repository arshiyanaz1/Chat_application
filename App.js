import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from "react-native";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import chatItems from './src/Redux/reducers/chatReducer';
import DrawerNavigator from './src/navigation/DrawerNavigator';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const store = createStore(chatItems, applyMiddleware(thunk))

const App = () => {
  return (
    <Provider store={store}>
      <DrawerNavigator></DrawerNavigator>
    </Provider>
  );
};



export default App;
