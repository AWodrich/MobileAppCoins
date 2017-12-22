import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import { CardSection, Card, Button } from './common';
// import Button from './Button';
import { urlBuyCoin } from '../Utils/Constants';


const CoinDetails = props => {
    console.log('props', props);
    if (!props.coin) {
        return null;
    }
    const { biggerImg, headerContentStyle, headerTextStyle, imageStyle, imageContainerStyle } = styles;
    const { name } = props;
    const priceUSD = props.coin.USD.PRICE;
    const priceEUR = props.coin.EUR.PRICE;
    const lastUpdate = props.coin.EUR.LASTUPDATE;
    const market = props.coin.EUR.MARKET;

    return (
        <Card>
            <CardSection coin={props}>
                <View style={imageContainerStyle}>
                    {name == 'Bitcoin' && <Image style={imageStyle} source={require('../../public/bitcoinImg.jpg')} />}
                    {name == 'Litecoin' && <Image style={imageStyle} source={require('../../public/litecoinImg.jpg')} />}
                    {name == 'Ethereum' && <Image style={imageStyle} source={require('../../public/ethereumImg.jpg')} />}
                </View>
                <View style={headerContentStyle}>
                    {name && <Text style={headerTextStyle}>Coin: {name} </Text>}
                    {priceUSD && <Text>Price: {priceUSD} ({priceEUR})</Text>}
                    {market && <Text>Market: {market}</Text>}
                    {lastUpdate && <Text>Last update: {lastUpdate}</Text>}
                </View>
            </CardSection>
            <CardSection>
                {name == 'Bitcoin' && <Image style={biggerImg} source={require('../../public/bitcoinImg.jpg')} />}
                {name == 'Litecoin' && <Image style={biggerImg} source={require('../../public/litecoinImg.jpg')} />}
                {name == 'Ethereum' && <Image style={biggerImg} source={require('../../public/ethereumImg.jpg')} />}
            </CardSection>
            <CardSection>
                <Button onPress={() => Linking.openURL(urlBuyCoin)}>
                Buy now
                </Button>
                <Button onPress={() => props.getNews({name})}>
                News about {name}
                </Button>
            </CardSection>
        </Card>
    );
};

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18
    },
    imageStyle: {
        height: 50,
        width: 50
    },
    imageContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    biggerImg: {
        height: 300,
        flex: 1,
        width: null
    }
};

export default CoinDetails;
