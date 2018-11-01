import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Image, WebView,
} from 'react-native';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createHttpLink } from 'apollo-link-http';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { ReduxCache, apolloReducer } from 'apollo-cache-redux';
import ReduxLink from 'apollo-link-redux';
import { onError } from 'apollo-link-error';

import LogReg from './screens/navigators/LogReg';

import MainTabNavigator from './screens/navigators/MainTabNavigator';

<<<<<<< HEAD
<<<<<<< HEAD
const URL = '192.168.1.140:8080'; // set your comp's url here
const store = createStore(
=======
const URL = '192.168.1.45:8080'; // set your comp's url here
=======
const URL = '192.168.1.141:8080'; // set your comp's url here
>>>>>>> master
export const store = createStore(
>>>>>>> 382a439016d9a6ef85de4bb7223fc6d558127cf3
  combineReducers({
    apollo: apolloReducer,
  }),
  {}, // initial state
  composeWithDevTools(),
);
console.log(store.getState());
const cache = new ReduxCache({ store });
const reduxLink = new ReduxLink(store);
const errorLink = onError((errors) => {
  console.log(errors);
});
const httpLink = createHttpLink({ uri: `http://${URL}` });
const link = ApolloLink.from([reduxLink, errorLink, httpLink]);
export const client = new ApolloClient({
  link,
  cache,
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
    };
  }

  loggedHandler = () => {
    this.setState({
      logged: true,
    });
  };

  render() {
    const { logged } = this.state;
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          {!logged ? (
            <LogReg screenProps={{ handler: this.loggedHandler }} />
          ) : (
            <MainTabNavigator />
          )}
        </Provider>
      </ApolloProvider>
    );
  }
}
