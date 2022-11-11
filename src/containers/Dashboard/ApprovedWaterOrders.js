import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  BackHandler,
  FlatList,
  AsyncStorage,
  StatusBar,
  Picker,
} from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Left,
  Right,
  Body,
  Title,
  Button,
  Icon,
  Spinner,
  Tab,
  Tabs,
} from "native-base";
import { Actions } from "react-native-router-flux";
import { styles } from "../../config/style";
import theme from "../../config/theme";
import {
  EmptyComponent,
  CurrentWaterListComponent,
  UpcomingWaterListComponent,
  UnapprovedWaterListComponent,
} from "../../components";
import {
  currentWaterOrderAPI,
  upcomingWaterOrderAPI,
  viewunapprovedWaterOrdersAPI,
  searchChannelsAPI,
} from "../../api/methods/waterUsersAPI";
import PushNotification from "react-native-push-notification";
import { TouchableOpacity } from "react-native";
import moment from "moment";

export default class ApprovedWaterOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activelist: true,
      message: [],
      currentWaterOrderList: null,
      upcomingOrderList: [],
      unApprovedWaterList: null,
      channelList: null,
      channel_name: undefined,
      channel_name_current: undefined,
      channel_name_upcoming: undefined,
    };
  }

  componentWillMount() {
    this.backHandler = BackHandler.addEventListener(
      "handleBackPress",
      this.handleBackPress
    );
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "handleBackPress",
      this.handleBackPress
    );
    this.getCurrentWaterOrder("");
    this.getUpcomingWaterOrder("");
    this.getUnapprovedWaterOrders("");
    this.getChannels();
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    Actions.pop();
    return true;
  };

  getChannels = () => {
    this.state.loading == false && this.setState({ loading: true });
    searchChannelsAPI().then((channel) => {
      console.log("CHANNEL RESPONSE ", channel.data);
      if (channel.data.status == true) {
        this.setState({
          channelList: channel.data.result,
          channel_name: channel.data.result[0].id,
          channel_name_current: channel.data.result[0].id,
          channel_name_upcoming: channel.data.result[0].id,
        });
      }
    });
  };

  getUnapprovedWaterOrders = (channelId) => {
    console.log("===============channelId=====================");
    console.log(channelId);
    console.log("===============channelId=====================");
    this.state.loading == false && this.setState({ loading: true });
    var formData = new FormData();
    formData.append("channelid", channelId);
    viewunapprovedWaterOrdersAPI(formData)
      .then((waterOrders) => {
        //console.log("UNAPPROVED WATER ORDERS : ", waterOrders.data.result)
        if (waterOrders.data.status == true) {
          this.setState({
            unApprovedWaterList: waterOrders.data.result,
            message: null,
          });
        } else {
          this.setState({
            unApprovedWaterList: null,
            message: waterOrders.data.message,
          });
        }
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log("UNAPPROVED WATER ORDERS Failed.", error);
      });
  };

  onValueChange(channelId, activePage) {
    console.log("Active Page : ", activePage);
    if (activePage == "New") {
      if (channelId !== 0) {
        this.getUnapprovedWaterOrders(channelId);
        this.setState({ channel_name: channelId });
      }
    }
    if (activePage == "Current") {
      if (channelId !== 0) {
        this.getCurrentWaterOrder(channelId);
        this.setState({ channel_name_current: channelId });
      }
    }
    if (activePage == "Upcoming") {
      if (channelId !== 0) {
        this.getUpcomingWaterOrder(channelId);
        this.setState({ channel_name_upcoming: channelId });
      }
    }
  }

  getCurrentWaterOrder = (channelId) => {
    this.state.loading == false && this.setState({ loading: true });
    AsyncStorage.getItem("userId")
      .then((userId) => {
        //console.log("UserId ", userId)
        var formData = new FormData();
        formData.append("operatorid", userId);
        formData.append("channelid", channelId);
        currentWaterOrderAPI(formData).then((currentorder) => {
          //console.log('Current Water Order ', JSON.stringify(currentorder.data.result))
          if (currentorder.data.status == true) {
            let currentList = [];
            let archiveCurrent = [];
            currentorder.data.result.today.map((item) => {
              console.log("==================item==================");
              console.log(item);
              console.log("====================================");
              //   if (item.state == "Pending") {
              //     notification.push(item);
              //   } else if (moment().diff(moment(item.date), "days") < 2) {
              //     notification.push(item);
              //   } else {
              //     archivenotification.push(item);
              //   }
            });

            this.setState({
              currentWaterOrderList: currentorder.data.result.today,
              message: null,
            });
          } else {
            this.setState({
              currentWaterOrderList: null,
              message: currentorder.data.result.today,
            });
          }
          this.setState({ loading: false });
        });
      })
      .catch((error) => {
        console.log("CURRENT WATER ORDERS Failed.", error);
      });
  };

  getUpcomingWaterOrder = (channelId) => {
    this.state.loading == false && this.setState({ loading: true });
    AsyncStorage.getItem("userId")
      .then((userId) => {
        //console.log("UserId ", userId)
        var formData = new FormData();
        formData.append("operatorid", userId);
        formData.append("channelid", channelId);
        upcomingWaterOrderAPI(formData).then((upcomingorder) => {
          // console.log('UPCOMING Water Order ', JSON.stringify(upcomingorder.data.result))
          if (upcomingorder.data.status == true) {
            this.setState({
              upcomingOrderList: upcomingorder.data.result,
              message: [],
            });
          } else {
            this.setState({
              upcomingOrderList: null,
              message: upcomingorder.data.result,
            });
          }
          this.setState({ loading: false });
        });
      })
      .catch((error) => {
        console.log("UPCOMING WATER ORDERS Failed.", error);
      });
  };

  renderLoader() {
    return <Spinner color="#173a65" />;
  }

  renderActiveArchiveList() {
    const { activelist } = this.state;
    return <></>;
    // return (
    //   <View
    //     style={{
    //       backgroundColor: "#fff",
    //       paddingTop: 5,
    //       paddingBottom: 3,
    //       flexDirection: "row",
    //       justifyContent: "space-evenly",
    //     }}
    //   >
    //     <TouchableOpacity
    //       onPress={() => {
    //         this.setState({ activelist: true });
    //       }}
    //       style={{
    //         flexDirection: "row",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <Icon
    //         type="Ionicons"
    //         name={activelist ? "checkmark-circle-outline" : "ellipse-outline"}
    //         size={25}
    //         color={"blue"}
    //       />
    //       <Text style={{ alignSelf: "center" }}>Current</Text>
    //     </TouchableOpacity>
    //     {/* <View style={{ width: "10%" }} /> */}
    //     <TouchableOpacity
    //       onPress={() => {
    //         this.setState({ activelist: false });
    //       }}
    //       style={{
    //         flexDirection: "row",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <Icon
    //         type="Ionicons"
    //         name={activelist ? "ellipse-outline" : "checkmark-circle-outline"}
    //         size={25}
    //         color={"blue"}
    //       />
    //       <Text style={{ alignSelf: "center" }}>Archive</Text>
    //     </TouchableOpacity>
    //   </View>
    // );
  }

  render() {
    const {
      currentWaterOrderList,
      upcomingOrderList,
      loading,
      message,
      activelist,
      unApprovedWaterList,
      channelList,
      channel_name,
      channel_name_current,
      channel_name_upcoming,
    } = this.state;
    let filteredItems = [];
    if (channelList != null) {
      filteredItems = channelList;
    }

    let upcomingItems = [];
    // upcomingItems = upcomingOrderList;
    var newUpcomingItems = [];

    upcomingItems.push(upcomingOrderList);
    console.log("===============upcomingOrderList=====================");
    console.log(JSON.stringify(upcomingOrderList));
    console.log("====================================");
    console.log(JSON.stringify(upcomingItems));
    console.log("====================================");
    if (upcomingOrderList && upcomingItems.length > 0) {
      var order = [];
      for (var i = 0; i < upcomingItems.length; i++) {
        newUpcomingItems.push(upcomingItems[i]);
        // console.log("Channel Upcoming : ", newUpcomingItems[i].channel)
        console.log("New Upcoming Items : ", newUpcomingItems[i]);
        var newOrdersItems = newUpcomingItems[i].upcoming;
        if (newOrdersItems !== undefined) {
          var Orders = newOrdersItems[0].orders;
          console.log("Item Orders Length  : ", Orders.length);
          //console.log('Orders : ', Orders)
          Orders.map((item, index) => {
            console.log("Item  : ", item.orders.length);
            order.push(item);
          });
        }
        // console.log("New Upcoming Order : ", newUpcomingItems.length)
        // console.log("New Upcoming Order : ", newUpcomingItems)
        // console.log('New order : ', JSON.stringify(newOrdersItems))
      }
    }

    return (
      <Container style={styles.containerMainDiscover}>
        <Header transparent>
          <StatusBar backgroundColor="#222" barStyle="light-content" />
          <Left>
            <Button
              transparent
              style={{ paddingLeft: 15 }}
              onPress={() => {
                Actions.pop();
              }}
            >
              <Icon
                name="arrow-back"
                type="MaterialIcons"
                style={{ color: "#000" }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#000" }}>Orders </Title>
          </Body>
          <Right />
        </Header>
        <Tabs>
          <Tab
            heading="New"
            tabStyle={{ backgroundColor: "#fff" }}
            textStyle={{ color: "#000", fontSize: 17 }}
            activeTabStyle={{ backgroundColor: theme.BLUE_COLOR }}
            activeTextStyle={{
              color: "#fff",
              fontWeight: "normal",
              fontSize: 17,
            }}
          >
            <View
              style={{
                width: "85%",
                height: 40,
                alignSelf: "center",
                marginTop: 10,
                justifyContent: "center",
                borderWidth: 0.5,
                borderColor: "#000",
              }}
            >
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" />}
                style={{ width: "90%", alignSelf: "center" }}
                placeholder=" - "
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={channel_name}
                onValueChange={(t) => this.onValueChange(t, "New")}
              >
                {filteredItems.map((acct) => {
                  return (
                    <Picker.Item
                      key={acct.id}
                      label={acct.channel_name}
                      value={acct.id}
                    />
                  );
                })}
              </Picker>
            </View>
            {loading && this.renderLoader()}
            {this.renderActiveArchiveList()}
            <View style={{ flexGrow: 1, paddingBottom: 50 }}>
              {unApprovedWaterList != null && (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={unApprovedWaterList}
                  renderItem={({ item }) => (
                    <UnapprovedWaterListComponent
                      id={item.id}
                      operatorid={item.operatorid ? item.operatorid : ""}
                      channel_name={item.channel_name ? item.channel_name : ""}
                      meter_name={item.meter_name ? item.meter_name : ""}
                      serial_number={
                        item.serial_number ? item.serial_number : ""
                      }
                      startTime={item.startTime ? item.startTime : ""}
                      endTime={item.endTime ? item.endTime : ""}
                      flowRate={item.flowRate ? item.flowRate : ""}
                      totalVolume={item.totalVolume ? item.totalVolume : ""}
                      client_name={item.username ? item.username : ""}
                      contact_name={item.contact_name ? item.contact_name : ""}
                      email={item.email ? item.email : ""}
                      image={item.meterimage}
                      duration={item.duration ? item.duration : ""}
                      userid={item.userid}
                    />
                  )}
                  keyExtractor={(item, index) => {
                    return item.id.toString();
                  }}
                />
              )}
              {unApprovedWaterList == null && (
                <View>
                  <EmptyComponent />
                </View>
              )}
            </View>
          </Tab>
          <Tab
            heading="Current"
            tabStyle={{ backgroundColor: "#fff" }}
            textStyle={{ color: "#000", fontSize: 17 }}
            activeTabStyle={{ backgroundColor: theme.BLUE_COLOR }}
            activeTextStyle={{
              color: "#fff",
              fontWeight: "normal",
              fontSize: 17,
            }}
          >
            <View
              style={{
                width: "85%",
                height: 40,
                alignSelf: "center",
                marginTop: 10,
                justifyContent: "center",
                borderWidth: 0.5,
                borderColor: "#000",
              }}
            >
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" />}
                style={{ width: "90%", alignSelf: "center" }}
                placeholder=" - "
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={channel_name_current}
                onValueChange={(t) => this.onValueChange(t, "Current")}
              >
                {filteredItems.map((acct) => {
                  return (
                    <Picker.Item
                      key={acct.id}
                      label={acct.channel_name}
                      value={acct.id}
                    />
                  );
                })}
              </Picker>
            </View>
            {loading && this.renderLoader()}
            {this.renderActiveArchiveList()}
            <View
              style={{
                flexGrow: 1,
                paddingBottom: 50,
                backgroundColor: "white",
              }}
            >
              {currentWaterOrderList != null && (
                <FlatList
                  contentContainerStyle={{ backgroundColor: "#fff" }}
                  showsHorizontalScrollIndicator={false}
                  data={currentWaterOrderList}
                  renderItem={({ item }) => (
                    <CurrentWaterListComponent
                      id={item.id}
                      startTime={item.start}
                      endTime={item.end}
                      flow_rate={item.flowRate}
                      date={item.date}
                      orders={item.orders}
                      startTime={item.start}
                      endTime={item.end}
                      flow_rate={item.flow_rate}
                      orders={item.orders}
                    />
                  )}
                  keyExtractor={(item, index) => {
                    return index.toString();
                  }}
                />
              )}
              {currentWaterOrderList == null && (
                <View>
                  <EmptyComponent />
                </View>
              )}
            </View>
          </Tab>
          <Tab
            heading="Upcoming"
            tabStyle={{ backgroundColor: "#fff" }}
            textStyle={{ color: "#000", fontSize: 17 }}
            activeTabStyle={{ backgroundColor: theme.BLUE_COLOR }}
            activeTextStyle={{
              color: "#fff",
              fontWeight: "normal",
              fontSize: 17,
            }}
          >
            <View
              style={{
                width: "85%",
                height: 40,
                alignSelf: "center",
                marginTop: 10,
                justifyContent: "center",
                borderWidth: 0.5,
                borderColor: "#000",
              }}
            >
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" />}
                style={{ width: "90%", alignSelf: "center" }}
                placeholder=" - "
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={channel_name_upcoming}
                onValueChange={(t) => this.onValueChange(t, "Upcoming")}
              >
                {filteredItems.map((acct) => {
                  return (
                    <Picker.Item
                      key={acct.id}
                      label={acct.channel_name}
                      value={acct.id}
                    />
                  );
                })}
              </Picker>
            </View>
            {loading && this.renderLoader()}
            {this.renderActiveArchiveList()}
            <View>
              {newUpcomingItems.length > 0 && (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={newUpcomingItems}
                  renderItem={({ item }) => (
                    <UpcomingWaterListComponent item={item} />
                  )}
                  keyExtractor={(item, index) => {
                    return index.toString();
                  }}
                />
              )}
              <View>{newUpcomingItems == "" && <EmptyComponent />}</View>
              {/* <View>
                                {newUpcomingItems == '' ? <EmptyComponent /> : 
                                    order == '' && <EmptyComponent /> 
                                }
                            </View> */}
            </View>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
