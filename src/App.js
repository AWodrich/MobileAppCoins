import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import CryptoList from './components/CryptoList';
import CryptoContainer from './components/CryptoContainer';

console.ignoredYellowBox = ['Remote debugger'];

class App extends Component {
    state= { loggedIn: null, nextList: 'no' };

    componentWillMount() {
        // console.log('working?');

        // firebase initialisation in here
        // getting object from firebase => auth => users => web application
        firebase.initializeApp({
            apiKey: 'AIzaSyD4XniVG4ZQL4yTlBR_t5hKd9Tr28g03_8',
            authDomain: 'finalproject-7c924.firebaseapp.com',
            databaseURL: 'https://finalproject-7c924.firebaseio.com',
            projectId: 'finalproject-7c924',
            storageBucket: 'finalproject-7c924.appspot.com',
            messagingSenderId: '473131848097'
        });
        // if user is signed in argument user will be the object
        // if user is logged out, user will be undefined.
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderNextList(text) {
        console.log('in render you tube text', text);
        this.setState({ nextList: text})
    }


    renderContent() {
        switch(this.state.loggedIn) {
            case true:
                return (
                    <View>
                        <Header headerText="EasyCoins" />
                        <View style={{ flexDirection: 'row' }}>
                            <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                            </Button>
                            {this.state.nextList == 'yes' && <Button onPress={() => this.renderNextList('no')}>Home</Button>}
                            {this.state.nextList == 'no' && <Button onPress={() => this.renderNextList('yes')}>More</Button>}
                        </View>
                        {this.state.nextList == 'yes' && <CryptoContainer />}
                        {this.state.nextList == 'no' && <CryptoList />}
                    </View>
                );
            case false:
                return (
                    <View>
                        <Header headerText="Authentication" />
                        <LoginForm />
                    </View>
                );
            default:
                return (
                    <View style={{ top: 200 }}>
                        <Spinner size="large" />
                    </View>
                );
        }


        if (this.state.loggedIn) {
            return (
                <Button>
                    Log out
                </Button>
            );
        }

        return <LoginForm />;
    }

    render() {
        return (
            <View>
                {this.renderContent()}
            </View>
        )
    }
}

export default App;
