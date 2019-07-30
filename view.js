import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import ExchangeRateList from "./list";

class ExchangeRateView extends React.Component {
  state = { currency: "USD" }
  onCurrencyChange = (currency) => this.setState(() => ({currency}));

  render () {
    const {currency} = this.state;

    return (
      <View style = {styles.container}>
        <Text style = {styles.heading}>
          {`1${this.state.currency}`}
        </Text>
        <ExchangeRateList
          currency = {currency}
          onCurrencyChange = {this.onCurrencyChange}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  heading: {
    fontSize: 18,
    fontWeight: "200",
    color: Colors.white,
    letterSpacing: 6
  }
});

export default ExchangeRateView