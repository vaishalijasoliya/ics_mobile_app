import React, { Component } from 'react';
import { ImageBackground, View, Dimensions, Image, Alert, BackHandler, FlatList, AsyncStorage, SafeAreaView, StatusBar } from 'react-native';
import { Container, Header, Content, Left, Right, Body, Title, Button, Icon, Text, ListItem, List, Spinner, H1 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import theme from '../../config/theme';
import { styles } from '../../config/style';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backClickCount: 0
    };
  }

  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  handleBackPress = () => {
    Actions.drawerClose()
    this.setState({ backClickCount: this.state.backClickCount + 1 })
    console.log("ICS navigation state : ", (this.props.navigation) + this.state.backClickCount)
    if (this.state.backClickCount > 1) {
      this.setState({ backClickCount: 0 })
      Alert.alert(
        'Exit App',
        'Exiting the application?', [{
          text: 'Cancel',
          onPress: () => { console.log('Cancel SignIn Exit Pressed') },
          style: 'cancel'
        }, {
          text: 'OK',
          onPress: () => { BackHandler.exitApp() }
        },], {
        cancelable: false
      }
      )
    }
    return true;
  }

  render() {
    return (
      <Container style={{flex: 1}} >
        <ImageBackground source={theme.HOME_SCREEN} style={{flex: 1}} resizeMode='stretch' >
        <Header transparent>
            <StatusBar backgroundColor='#222' barStyle='light-content' />
            <Left>
              <Button transparent onPress={() => { Actions.drawerOpen() }} >
                <Icon name='menu' type="SimpleLineIcons" style={{ color: "#fff" }} />
              </Button>
            </Left>
            <Body>
              {/* <Title style={{ color: "#000", alignSelf: "center" }}> Home </Title> */}
            </Body>
            <Right>
              {/* <Button transparent onPress={() => { alert('Notification') }} >
                <Icon name='bell' type="EvilIcons" style={{ color: "#fff", fontSize: 25 }} />
              </Button> */}
            </Right>
          </Header>
        </ImageBackground>
      </Container>
    );
  }
}