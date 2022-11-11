import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Spinner } from 'native-base';

class AuthController extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        console.log('Auth 2')
        AsyncStorage.getItem("usertoken").then(res => {
            console.log('Auth 3')
            console.log('Get UserToken>> ', res)
        })
        this.checkAuth();
    }

    checkAuth = () => {
        console.log('Auth 4')
        AsyncStorage.getItem("usertoken").then(userToken => {
            console.log('Get UserToken>> ', userToken)
            console.log('Auth 5')
            if (userToken != null) {
                try {
                    AsyncStorage.getItem("userId").then(userId => {
                        console.log('Auth 9', userId)
                        if (userId == null) {
                            Actions.jump('login')
                        }
                        else {
                            console.log('Auth 10>> ', userToken)
                            var userObj = JSON.parse(userToken);
                            this.goToHome(userObj[0].role)
                        }
                    })
                }
                catch (e) {
                    console.log('Auth 8', e)
                }
                // console.log('Auth 6')

            }
            else {
                console.log('Auth 7')
                this.goTOLogin();
            }
        })
    }

    goTOLogin = () => {
        Actions.jump('login');
    }

    goToHome = (role) => {
        if (role == 'user') {
            Actions.userHome()
        }
        else {
            Actions.home();
        }
    }
    renderLoader() {
        return <Spinner color="#000" size={45} />
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                    {this.renderLoader()}
                </View>
            </View>
        );
    }
}

export default AuthController;
