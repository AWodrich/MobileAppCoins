import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Card, Button, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;
        // to remove error message again after user made an error and tries again
        // i set the error message to empty
        this.setState({ error: '' , loading: true});

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                // register user if not known
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFailed.bind(this));
            });
    }

    onLoginFailed() {
        this.setState({
            loading: false,
            error: 'Authentication failed'
        })
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false
        })
    }

    renderButton() {
        if(this.state.loading) {
            return <Spinner size='small'/>;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
            Log in
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                    placeholder="user@gmail.com"
                    label="Email"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="password"
                        value={this.state.password}
                        label="password"
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}




export default LoginForm;
