import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Image, WebView,
} from 'react-native';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createHttpLink } from 'apollo-link-http';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ReduxCache, apolloReducer } from 'apollo-cache-redux';
import ReduxLink from 'apollo-link-redux';
import { onError } from 'apollo-link-error';
import AppWithNavigationState, { navigationReducer, navigationMiddleware } from './navigation';
import IP from './ip';

<<<<<<< HEAD
import LogReg from './screens/navigators/LogReg';
import MainHeader from './components/MainHeader';
import MainTabNavigator from './screens/navigators/MainTabNavigator';
import ShirtEditor from './screens/ShirtEditor/ShirtEditor';
import Mytshirts from './screens/MyTshirts/Mytshirts';
import Grid from './styles/grid';

const URL = '172.16.100.207:8080/graphql'; // set your comp's url here
=======
const URL = `${IP}:8080`; // set your comp's url here
>>>>>>> master
export const store = createStore(
  combineReducers({
    apollo: apolloReducer,
    nav: navigationReducer,
  }),
  {}, // initial state
  composeWithDevTools(applyMiddleware(navigationMiddleware)),
);
const cache = new ReduxCache({ store });
const reduxLink = new ReduxLink(store);
const errorLink = onError((errors) => {
  console.log(errors);
});
const httpLink = createHttpLink({ uri: `http://${URL}/graphql` });
const link = ApolloLink.from([reduxLink, errorLink, httpLink]);
export const client = new ApolloClient({
  link,
  cache,
});

<<<<<<< HEAD
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
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
*/
=======
const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  </ApolloProvider>
);

export default App;
>>>>>>> master
