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
import MainHeader from './components/MainHeader';
import MainTabNavigator from './screens/navigators/MainTabNavigator';
import ShirtEditor from './screens/ShirtEditor/ShirtEditor';
import Mytshirts from './screens/MyTshirts/Mytshirts';
import Grid from './styles/grid';

const URL = '10.226.112.58:8080'; // set your comp's url here
export const store = createStore(
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
      logged: true,
      userId: 1,
      username: 'esberfes',
    };
  }

  loggedHandler = () => {
    this.setState({
      logged: true,
    });
  };

  userHandler = (userId, username) => {
    this.setState({
      userId,
      username,
    });
  };

  render() {
    const { logged, userId, username } = this.state;
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          {!logged ? (
            <View style={Grid.grid}>
              <View style={{ flex: 0.2 }}>
                <MainHeader />
              </View>
              <View style={{ flex: 0.8 }}>
                <LogReg
                  screenProps={{ handler: this.loggedHandler, userHandler: this.userHandler }}
                />
              </View>
            </View>
          ) : (
            <MainTabNavigator screenProps={{ userId, username }} />
          )}
        </Provider>
      </ApolloProvider>
    );
  }
}
// <MainTabNavigator />
//            <Mytshirts screenProps={{ userId, username }} />
//           <ShirtEditor />
/*           {!logged ? (
            <View style={Grid.grid}>
              <View style={{ flex: 0.2 }}>
                <MainHeader />
              </View>
              <View style={{ flex: 0.8 }}>
                <LogReg
                  screenProps={{ handler: this.loggedHandler, userHandler: this.userHandler }}
                />
              </View>
            </View>
          ) : (
            <MainTabNavigator screenProps={{ userId, username }} />
          )}
        </Provider>
      </ApolloProvider>
    );
  }
}
*/
