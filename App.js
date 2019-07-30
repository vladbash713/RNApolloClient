/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  StatusBar,
  View
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import ExchangeRateView from './view';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://48p1r2roz4.sse.codesandbox.io'}),
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client = {client}>
      <StatusBar barStyle="dark-content" />
      <View style = {styles.container}>
        <ExchangeRateView/>
      </View>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  
  container: { 
    flex: 1,
    backgroundColor: "#2E3B4B",
  },
});

export default App;
