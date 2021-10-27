//Nicky Gundersen                                            chainalysis_test
//Price.js
//Price.js is a react componenet to be used on index.js, the component makes two api calls to crypto exchanges
//and determines which has the cheaper coin, passed by props in index.js. it is returned as a table row, consisting
// of 5 cells

import React from "react";
import "./price.css";

export default class Price extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      coinbase: [],
      binance: [],
    };
  }
  componentDidMount() {
    Promise.all([
      fetch(
        "https://api.coinbase.com/v2/prices/" + this.props.crypto + "-USD/buy"
      ),
      fetch(
        "https://api.binance.com/api/v3/ticker/price?symbol=" +
          this.props.crypto +
          "USDT"
      ),
    ])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(
        ([res1, res2]) => {
          this.setState({
            isLoaded: true,
            coinbase: res1.data.amount,
            binance: res2.price,
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, coinbase, binance } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      var buyExchange,
        sellExchange = "";
      var coinbasePrice,
        binancePrice = "";

      if (binance < coinbase) {
        buyExchange = "Binance";
        sellExchange = "Coinbase";
        binancePrice = "cheaper-price";
      } else {
        buyExchange = "Coinbase";
        sellExchange = "Binance";
        coinbasePrice = "cheaper-price";
      }

      return (
        //return table row for table in index
        <>
          <div className="resp-table-row"></div>
          <div className="table-body-cell">{this.props.crypto}</div>
          <div className="table-body-cell">
            <span className={coinbasePrice}>$ {parseFloat(coinbase)}</span>
          </div>
          <div className="table-body-cell">
            <span className={binancePrice}>$ {parseFloat(binance)}</span>
          </div>
          <div className="table-body-cell">{buyExchange}</div>
          <div className="table-body-cell">{sellExchange}</div>
        </>
      );
    }
  }
}
