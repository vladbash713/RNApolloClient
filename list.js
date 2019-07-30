import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import numeral from "numeral";
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

const ExchangeRateQuery = gql`
  query rates($currency: String!) {
    rates(currency: $currency) {
      currency
      rate
    }
  }
`;

export default ({ currency: currentCurrency, onCurrencyChange }) => (
  <Query query={ExchangeRateQuery} variables={{ currency: currentCurrency }}>
    {({ loading, error, data }) => {
      if (loading) return <ActivityIndicator color={"#287b97"} />;
      if (error) return <Text>{`Error: ${error}`}</Text>;

      return (
        <View style={styles.container}>
          {data.rates
            .filter(
              ({ currency }) =>
                currency !== currentCurrency &&
                ["USD", "BTC", "LTC", "EUR", "JPY", "ETH"].includes(currency)
            )
            .map(({ currency, rate }, idx, rateArr) => (
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => onCurrencyChange(currency)}
                style={[
                  styles.currencyWrapper,
                  idx === rateArr.length - 1 && { borderBottomWidth: 0 }
                ]}
                key={currency}
              >
                <Text style={styles.currency}>{currency}</Text>
                <Text style={styles.currency}>
                  {rate > 1 ? numeral(rate).format("0,0.00") : rate}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      );
    }}
  </Query>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20
  },
  currencyWrapper: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#287b97"
  },
  currency: {
    fontSize: 14,
    fontWeight: "100",
    color: Colors.gray,
    letterSpacing: 4
  }
});
