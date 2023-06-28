/* PAGE TO VIEW ALL METERS  */
import React, { Component, Fragment } from "react";
import { StyleSheet, View, Dimensions, Image, Alert, BackHandler, FlatList, AsyncStorage, SafeAreaView, StatusBar } from 'react-native';
import { Container, Header, Content, Card, CardItem, Form, Item, Input, Left, Right, Body, Title, Button, Icon, Text, ListItem, List, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import theme from '../../config/theme';
import { styles } from '../../config/style';
import { searchMetersAPI, getAllChannelAPI } from '../../api/methods/waterUsersAPI'
import { MetersDetailsComponent, EmptyComponent } from '../../components';
import DropDownPicker from 'react-native-dropdown-picker';
import { TabView, TabBar } from 'react-native-tab-view';

export default class Meters extends Component {
  constructor(props) {
    super(props);
    this.setOpen = this.setOpen.bind(this)
    this.setValue = this.setValue.bind(this)
    this.setItems = this.setItems.bind(this)
    this.state = {
      loading: true,
      message: null,
      onlineMessage: null,
      metersList: null,
      metersAllList: null,
      metersFilterList: null,
      metersOnlineList: null,
      textstring: "",
      open: false,
      value: 'Channel',
      items: [],
      index: 0,
      routes: [
        { key: '1', title: 'All' },
        { key: '2', title: 'Live' },
      ],
    };
  }
  componentWillMount() {
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    this.searchMeter({ text: "" });
    this.getAllChannel()
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  handleBackPress = () => {
    Actions.pop();
    return true;
  }
  renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#053159', height: 3 }}
      style={{
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'space-between',
      }}
      activeColor={'#053159'}
      inactiveColor="grey"
      labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
      contentContainerStyle={{ width: '100%', justifyContent: 'space-evenly' }}
      tabStyle={{ borderRadius: 9 }}
    />
  );

  filterData(text, channel, metersFilterList) {
    var filteredData = metersFilterList
    if (!text || text == '') {
    } else {
      filteredData = metersFilterList.filter((item) => {
        let searchValue = item.meter_name.toLowerCase();
        return searchValue.includes(text.toString().toLowerCase())
      })
    }
    if (!!filteredData && filteredData.length > 0) {
      if (channel != 'Channel') {
        const newMeterList = filteredData.filter(o => o.channel_name == channel)
        if (!!newMeterList && newMeterList.length > 0) {
          this.setState({ metersList: newMeterList, message: null })
          this.onlineChanegeData(newMeterList)
        } else {
          this.setState({ metersList: null, message: "No Record Found" })
        }
      } else {
        this.setState({ metersList: filteredData, message: null })
        this.onlineChanegeData(filteredData)
      }
    } else {
      this.setState({ metersList: null, message: "No Record Found" })
      this.setState({ metersOnlineList: null, onlineMessage: "No Record Found" })
    }
  }

  onlineChanegeData(data) {
    const onlineMeter = data.filter(o => o.telementry == 1)
    if (!!onlineMeter && onlineMeter.length > 0) {
      console.log(onlineMeter,'onlineMeterSSerach')
      this.setState({ metersOnlineList: onlineMeter, onlineMessage: null })
    } else {
      this.setState({ metersOnlineList: null, onlineMessage: "No Record Found" })
    }
  }
  searchMeter(values) {
    console.log("VALUES :", values.text)
    this.state.loading == false && this.setState({ loading: true });
    AsyncStorage.getItem('usertoken').then(res => {
      var formData = new FormData();
      formData.append("operatorid", res);
      formData.append("text", values.text);
      searchMetersAPI(formData)
        .then(meters => {
          console.log("meters : ", meters.data.message)
          if (meters.data.status == true && meters.data.result.length > 0) {
            this.setState({ metersList: meters.data.result, message: null })
            this.setState({ metersAllList: meters.data.result, message: null })
            this.onlineChanegeData(meters.data.result)
          }
          else {
            console.log("meters else : ", meters.data.message)
            this.setState({ metersList: null, message: meters.data.message })
            this.setState({ metersOnlineList: null, onlineMessage: meters.data.message })
            this.setState({ metersAllList: null, message: meters.data.message })
          }
          this.setState({ loading: false })
        })
        .catch(error => { console.log("Meters listing Failed.", error) });
    })
  }

  getAllChannel() {
    getAllChannelAPI()
      .then(channel => {
        console.log("channel : ", channel.data.result)
        if (channel.data.result.length > 0) {
          const items = [{ label: 'Channel', value: 'Channel' }]
          for (let index = 0; index < channel.data.result.length; index++) {
            const element = channel.data.result[index];
            const object = { label: element.channel_name, value: element.channel_name }
            items.push(object)
          }
          console.log(items, 'itemDefined')
          this.setState({ items: items })
        }
      })
      .catch(error => { console.log("Meters listing Failed.", error) });
  }
  setOpen(open) {
    this.setState({
      open
    });
  }
  _renderScene(route, index, loading, renderLoader, metersList, offlinemessage, metersOnlineList, onlineMessage) {
    var listOfmeter = metersList
    var message = offlinemessage
    if (index == 1) {
      listOfmeter = metersOnlineList
      message = onlineMessage
    }
    return (<Content>
      {loading && renderLoader}
      <View>
        {listOfmeter != null && <FlatList
          showsHorizontalScrollIndicator={false}
          data={listOfmeter}
          renderItem={({ item }) => <MetersDetailsComponent
            id={item.id}
            serial_number={item.serial_number}
            meter_name={item.meter_name}
            channel_name={item.channel_name}
            username={item.username}
            property={item.property}
            meternumber={item.meternumber}
            metertype={item.metertype}
            wr_number={item.wr_number}
            image={item.image}
            usage_online = {item.usage}
            flow_rate={item.flow_rate}
            reading={item.reading}
            telementry = {item.telementry}
            createdAt={item.createdAt}
            lastphoto={item.lastphoto}
          />}
          keyExtractor={(item, index) => {
            return item.id.toString()
          }}
        />}
      </View>
      <View>
        {!!message ? <EmptyComponent /> : <></>}
      </View>
    </Content>);
  };

  setValue(callback) {
    this.setState(state => ({
      value: callback(state.value)
    }));
  }
  setItems(callback) {
    this.setState(state => ({
      items: callback(state.items)
    }));
  }

  refreshCurrentPage = async () => {
    Actions.refresh({ key: Math.random() })
  }
  renderLoader() {
    return <Spinner color="#173a65" />
  }
  render() {
    const { metersList, message, onlineMessage, metersOnlineList, loading, textstring, metersAllList, metersFilterList, open, value, items, index, routes } = this.state
    console.log(items, 'itemsCheck');
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <StatusBar backgroundColor='#222' barStyle='light-content' />
          <Left>
            <Button transparent style={{ paddingLeft: 15 }} onPress={() => {
              Actions.refresh({ key: Math.random() })
              Actions.pop()
            }}>
              <Icon name='arrow-back' type="MaterialIcons" style={{ color: "#000" }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#000" }}> Meters </Title>
          </Body>
          <Right>
            <Icon name='refresh' type="MaterialIcons" style={{ color: "#000", paddingRight: 15 }} onPress={() => this.refreshCurrentPage()} />
          </Right>
        </Header>
        <View style={{ marginHorizontal: 20 }}>
          <Formik
            initialValues={{ text: "" }}
            onSubmit={values => this.searchMeter(values)}
            validationSchema={yup.object().shape({
              text: yup
                .string()
                .trim()
                .required('Please fill to search!')
            })}
          >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
              <Fragment>
                <Form>
                  <Item searchBar rounded style={{ height: 40 }}>
                    <Input
                      value={textstring}
                      onChangeText={(text) => {
                        this.setState({ textstring: text });
                        if (typeof text !== 'object') {
                          this.filterData(text, value, metersAllList)
                          // this.onlineChanegeData(metersOnlineList)
                        }
                      }}
                      // onChangeText={handleChange('text')}
                      // onBlur={() => setFieldTouched('text')}
                      placeholder="Search meter"
                      placeholderTextColor="#ccc"
                      style={{ color: "#000", paddingLeft: 40 }}
                      autoCapitalize="none"
                      selectionColor="#000"
                    />
                    <Icon name="magnifier" type="SimpleLineIcons" style={{ color: "#000", paddingRight: 10 }} />
                  </Item>
                </Form>
              </Fragment>
            )}
          </Formik>
        </View>
        <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            onChangeValue={(value) => {
              if (typeof value != 'object') {
                this.filterData(textstring, value, metersAllList)
                // if(!! metersAllList && metersAllList.length > 0){
                //   this.onlineChanegeData(metersOnlineList)
                // }
              }
            }}
            style={{ color: "#000" }}
            setOpen={this.setOpen}
            setValue={this.setValue}
            setItems={this.setItems}
          />
          <View style={{ alignItems: 'center' }}>
            <Image
              source={theme.LOGO_APP}
              resizeMode="contain"
              style={{ width: 290, height: 100 }}
            />
          </View>
          <TabView
            navigationState={{ index, routes }}
            onIndexChange={index => {
              this.setState({ index })
            }}
            renderTabBar={this.renderTabBar}
            renderScene={route => this._renderScene(route.route, index, loading, this.renderLoader(), metersList, message, metersOnlineList, onlineMessage)}
          />
        </View>
      </Container>
    );
  }
}