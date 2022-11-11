import React, { Component } from 'react';
import { View, StatusBar, AsyncStorage, FlatList, Picker, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Left, Right, Body, Title, Button, Icon, Text, ListItem, List, Spinner, H1 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import theme from '../../config/theme';
import { styles } from '../../config/style';
import { UserHistoryComponent, EmptyComponent } from '../../components';
import { viewUserOrderHistoryAPI, searchMetersByUserAPI } from '../../api/methods/waterUsersAPI'

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userHistoryList: [],
      // userHistoryList: null,
      loading: false,
      message: null,
      meter_name: 0,
      meter: null,
    };
  }

  componentDidMount() {
    this.getUserHistory('');
    this.getMeterName();
  }

  getMeterName = () => {
    AsyncStorage.getItem("userId").then(userId => {
      var formData = new FormData();
      formData.append("userid", userId);
      searchMetersByUserAPI(formData)
        .then(data => {
          console.log("HISTORY USER METER NAME : ", JSON.stringify(data.data.result))
          this.setState({ meter: data.data.result, meter_name: data.data.result[0].id })
        })
        .catch(e => {
          console.log("Meters Name Error : ", e)
        })
    })
  }

  onValueChange2(meterId) {
    if (meterId !== 0) {
      this.getUserHistory(meterId)
      this.setState({ meter_name: meterId })
    }

  }

  getUserHistory = (meterId) => {
    AsyncStorage.getItem("userId").then(userId => {
      console.log('User ID>> ', userId);
      this.state.loading == false && this.setState({ loading: true });
      var formData = new FormData();
      formData.append("userid", userId);
      formData.append("meterid", meterId);
      viewUserOrderHistoryAPI(formData).then(history => {
        console.log('USER HISTORY RESPONSE>> ', JSON.stringify(history.data.result))
        if (history.data.status == true) {
          this.setState({ userHistoryList: history.data.result, message: null })
        }
        else {
          this.setState({ userHistoryList: [], message: history.data.message })
        }
        this.setState({ loading: false })
      })
    })
  }

  renderLoader() {
    return <Spinner color="#173a65" />
  }

  addOrder() {
    // alert('hoello')
    Actions.push('orderform')
  }

  render() {
    const { userHistoryList, loading, message, meter, meter_name } = this.state
    let filteredItems = [];
    if (meter != null) {
      filteredItems = meter;
    }

    let historyItems = [];
    historyItems.push(userHistoryList);
    console.log("History Length: ", historyItems.length)
    if (historyItems.length > 0) {
      var newHistoryItems = [];
      for (var i = 0; i < historyItems.length; i++) {
        newHistoryItems.push(historyItems[i]);
        console.log("New History Item: ", newHistoryItems[i])
        console.log("New History LENGTH: ", newHistoryItems.length)
      }
    }


    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <StatusBar backgroundColor='#222' barStyle='light-content' />
          <Left>
            <Button transparent style={{ paddingLeft: 15 }} onPress={() => Actions.pop()}>
              <Icon name='arrow-back' type="MaterialIcons" style={{ color: "#000" }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#000", alignSelf: "center" }}> Orders </Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <View style={{flex: 1 }}>

          <View style={{ flex: 0.7}}>
            <Button style={{ backgroundColor: theme.BLUE_COLOR, alignSelf: 'center', marginTop:20}} onPress={() => this.addOrder()}>
              <Text>Add new order</Text>
            </Button>
          </View>
          <View style={{ flex:3}}>
            <View style={{ width: '85%', height: 40, alignSelf: 'center', marginBottom: 10, justifyContent: 'center', borderWidth: 0.5, borderColor: '#000' }}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" />}
              style={{ width: "100%", alignSelf: 'center' }}
              placeholder=" - "
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={meter_name}
              onValueChange={(t) => this.onValueChange2(t)}
            >
              {filteredItems.map(acct => {
                return <Picker.Item key={acct.id} label={acct.meter_name} value={acct.id} />;
              })}
            </Picker>
          </View>
          {loading && this.renderLoader()}
          <View style={{flex: 1}}>
            {newHistoryItems != 0 && <FlatList
              showsHorizontalScrollIndicator={false}
              data={newHistoryItems}
              renderItem={({ item }) => <UserHistoryComponent
                color={true}
                radius={20}
                item = {item}
                pending = {item.pending}
                current = {item.current}
                finish = {item.finish}
              />}
              keyExtractor={(item, index) => {
                return index.toString()
              }}
            />}
          </View>
          <View>
            {message != null && <EmptyComponent />}
          </View>
          </View>

          {/* <View style={{ width: '85%', height: 40, alignSelf: 'center', marginTop: 10, justifyContent: 'center', borderWidth: 0.5, borderColor: '#000' }}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" />}
              style={{ width: "90%", alignSelf: 'center' }}
              placeholder=" - "
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={meter_name}
              onValueChange={(t) => this.onValueChange2(t)}
            >
              {filteredItems.map(acct => {
                return <Picker.Item key={acct.id} label={acct.meter_name} value={acct.id} />;
              })}
            </Picker>
          </View>
          {loading && this.renderLoader()}
          <View>
            {userHistoryList != null && <FlatList
              showsHorizontalScrollIndicator={false}
              data={userHistoryList}
              renderItem={({ item }) => <UserHistoryComponent
                color={true}
                radius={20}
                id={item.id}
                flowRate={item.flowRate ? item.flowRate : ''}
                duration={item.duration ? item.duration : ''}
                startTime={item.startTime ? item.startTime : ''}
                endTime={item.endTime ? item.endTime : ''}
                totalVolume={item.totalVolume ? item.totalVolume : ''}
                weather={item.weather ? item.weather : ''}
                orderedDate={item.orderedDate ? item.orderedDate : ''}
                meter_name={item.meter_name ? item.meter_name : ''}
                image={item.meterimage}
                channel_name={item.channel_name ? item.channel_name : ''}
                type={item.type ? item.type : ''}
                wr_number={item.wr_number ? item.wr_number : ''}
                wr_volume={item.wr_volume ? item.wr_volume : ''}
                isActive={item.isActive}
              />}
              keyExtractor={(item, index) => {
                return item.id.toString()
              }}
            />}
          </View>
          <View>
            {message != null && <EmptyComponent />}
          </View> */}

        </View>
      </Container>
    );
  }
}