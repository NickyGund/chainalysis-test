import React from 'react';
import ReactDOM from 'react-dom';
import Price from './components/Price';
import './index.css';


class PricesList extends React.Component{
  renderPricesList(){
    return(
      <>
      <Price 
      crypto={"BTC"}>
      </Price>
      <Price
        crypto={"ETH"}
      ></Price>
      </>
    )
  }
  
  render(){
   return(
     <div className="main">
      <div className="resp-table">
    <div className="resp-header">Which exchange has a better deal?</div>
    <div className="resp-table-header"></div>
    <div className="table-header-cells">Crypto</div>
    <div className="table-header-cells">Coinbase</div>
    <div className="table-header-cells">Binance</div>
    <div className="table-header-cells">Cheaper Exchange</div>
    <div className="resp-table-body"></div>
    {this.renderPricesList()}
    </div>
    </div>
    
   )
  }

}

class Page extends React.Component{
  render(){
    return(
       <PricesList></PricesList>
    )
  }

}

ReactDOM.render(<Page />, document.getElementById("root"));