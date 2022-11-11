import React, { Component } from 'react';
import { View, Text, AsyncStorage, FlatList, StatusBar } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title, Icon, Button, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../config/style';
import { ClientDetailsComponent, EmptyComponent } from '../../components';
import theme from '../../config/theme';
import { viewUserDetailsAPI } from '../../api/methods/waterUsersAPI';

export default class ClientDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientDeatilsList: null,
      loading: false,
      message: null,
    };
  }

  componentDidMount() {
    this.getClientDeatils();
  }

  getClientDeatils = () => {
    AsyncStorage.getItem("userId").then(userId => {
      console.log('User ID>> ', userId);
      this.state.loading == false && this.setState({ loading: true });
      var formData = new FormData();
      formData.append("userid", userId);
      viewUserDetailsAPI(formData).then(details => {
        console.log('CLIENT RESPONSE>> ', JSON.stringify(details.data.result))
        if (details.data.status == true) {
          this.setState({ clientDeatilsList: details.data.result, message: null})
        }
        else{
          this.setState({ clientDeatilsList: null, message: details.data.message })
        }
        this.setState({ loading: false })
      })
    })
  }

  renderLoader() {
    return <Spinner color="#173a65" />
  }

  render() {
    const { loading, clientDeatilsList, message } = this.state
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent hasSegment>
        <StatusBar backgroundColor='#222' barStyle='light-content'/>
          <Left>  
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' type="MaterialIcons" style={{ color :"#000" }}  />
            </Button>                   
          </Left>
          <Body>
            <Title style={{ color: "#000" }}> Client Details </Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          {loading && this.renderLoader()}
          <View>
            {clientDeatilsList != null && <FlatList
              showsHorizontalScrollIndicator={false}
              data={clientDeatilsList}
              renderItem={({ item }) => <ClientDetailsComponent
                color={true}
                radius={20}
                id={item.id}
                username={item.username}
                contact_name={item.contact_name}
                email={item.email}
                address={item.address}
                phone={item.phone}
                mobile={item.contact}
                stock_supply={item.stock_supply}
              />}
              keyExtractor={(item, index) => {
                return item.id.toString()
              }}
            />}
          </View>
          <View>
            {message != null && <EmptyComponent />}
          </View>
        </Content>
      </Container>
    );
  }
}
