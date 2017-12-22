import React, { Component } from 'react';
import { Image, View, Text, ScrollView } from 'react-native';


class News extends Component {
    render() {
        console.log('this.props////', this.props)
        return this.props.news.map(article => {

            return(
                <ScrollView>
                    <View key={article.title} style={styles.containerStyle}>
                        <View>
                            <Text style={styles.title}>{article.title}</Text>
                            <Text style={styles.author}>Author: {article.author}</Text>
                            {article.urlToImage && <Image source={{ uri:article.urlToImage }} style={{ width: 40, height: 40}} />}
                            <Text>{article.description}</Text>
                            <Text>{article.url}</Text>
                            <Text>{article.publishedAt}</Text>
                        </View>
                    </View>
                </ScrollView>
            )
        })
    }
}

const styles = {
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'red',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        marginBottom: 15,
    },
    title: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 5,
        fontWeight: "bold",
    },
    author: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 20,
    },
    image: {
        width: 35,
        height: 35,
    },
    urlContainer: {
        display: "flex",
        borderTopColor: "#FAFAFA",
        borderTopWidth: 2,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    },
};

export default News;
