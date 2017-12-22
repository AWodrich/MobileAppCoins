import React, { Component } from 'react';
import { Text ,View, ScrollView } from 'react-native';
import axios from 'axios';
import CoinDetails from './CoinDetails';
import { apiCryptos } from '../Utils/Constants';
import News from './News';
import LoginForm from './LoginForm';

class CryptoList extends Component {
    state = { coins: [], news: [], error: '', showNews: false };
    componentWillMount() {
        axios.get(apiCryptos)
            .then(response => (this.setState({ coins: response.data.DISPLAY })))
            .catch(err => console.log(err));
    }

    getNews(name) {
        console.log('in get news function,name',name.name.toLowerCase());
        name = name.name.toLowerCase();
        axios.get('https://newsapi.org/v2/everything?q='+ name +'&apiKey=0703978634a24617b6b3afbbaae78f2d')
            .then(news => (
                // this.setState({ news: news.data })
                this.showNews(news.data)
            ))
            .catch(err => error = 'No news')
    }

    showNews(news) {
        this.setState({ showNews: true, news: news })
    }

    // showNews(){
    //     console.log('this.state in displayNews', news);
    //     if(news.length == 0 || !news) {
    //         return null
    //     }
    //     return news.articles.map((article, index) => {
    //         return(
    //             <View>
    //                 <News
    //                     author={article.author}
    //                     title={article.title}
    //                 />
    //             </View>
    //         )
    //     })
    // }

    renderCoins() {
        const btc = this.state.coins.BTC;
        const eth = this.state.coins.ETH;
        const ltc = this.state.coins.LTC;

        return (
            <View>
                <CoinDetails getNews={this.getNews.bind(this)} coin={btc} name="Bitcoin" />
                <CoinDetails getNews={this.getNews.bind(this)} coin={eth} name="Ethereum" />
                <CoinDetails getNews={this.getNews.bind(this)} coin={ltc} name="Litecoin" />
            </View>
        );
    }

    render() {
        console.log('state', this.state);
        return (
            <ScrollView style={{ height: 500 }}>
                {this.state.showNews && <News news={this.state.news.articles} />}
                {!this.state.showNews && this.renderCoins()}
            </ScrollView>
        );
    }
}

export default CryptoList;
