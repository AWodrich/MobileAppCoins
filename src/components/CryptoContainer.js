import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import axios from 'axios';
import { apiAllCryptos } from '../Utils/Constants';
import { CoinCard, Spinner } from './common';


class CryptoContainer extends Component {
    state = {error: '', coins: [], isFetching: true}

    componentDidMount(){
        console.log('troubles?');
        axios.get(`${apiAllCryptos}/v1/ticker/?limit=10`)
            .then(coins => {
                console.log('coins?', coins);
                this.setState({ coins: coins.data, isFetching: false })
            })
            .catch(err => {
                this.setState({ error: 'Something went wrong'})
            })
    }

    renderCoins() {
        // if(!this.state.coins || this.state.coins.length == 0) {
        //     return null
        // }
        console.log('render coins', this.state.coins);
        return this.state.coins.map((coin, index) => {
            return (
                <CoinCard
                    key={index}
                    coin_name={coin.name}
                    symbol={coin.symbol}
                    price_usd={coin.price_usd}
                    percent_change_24h={coin.percent_change_24h}
                    percent_change_7d={coin.percent_change_7d}
                />
            );
        })
    }

    render() {

        if(this.state.isFetching) {
            return (
                <View>
                    <Spinner />
                </View>
            )
        }
        return(
            <ScrollView style={{ paddingBottom: 100, paddingTop: 55 }}>
            <Text>{this.state.error}</Text>
                <View>
                    {this.renderCoins()}
                </View>
            </ScrollView>
        );
    }
}

export default CryptoContainer;
