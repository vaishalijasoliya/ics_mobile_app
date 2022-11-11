import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  AsyncStorage,
  Platform,
} from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Input,
  Item,
  Footer,
  Left,
  Right,
  Body,
  Title,
  Button,
  Icon,
  Text,
  Card,
  CardItem,
  Thumbnail,
  ListItem,
  List,
  Spinner,
} from "native-base";
import { Actions } from "react-native-router-flux";
import NetInfo from "@react-native-community/netinfo";
import theme from "../../config/theme";
import { styles } from "../../config/style";
import { connect } from "react-redux";
import { loginUser, loginLocalUser } from "../../redux/actions";
import { SHOWORDER } from "../../api/ApiConstants";
import { saveDeviceToken } from "../../redux/actions/AuthActions";
import firebase from "react-native-firebase";


class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
    console.log("I am MAIN constructor");
  }
  static getDerivedStateFromProps(props, state) {
    console.log("I am MAIN derived props");
    // let udata = null;
    if (props.user != null) {
      // udata = user[0].role;
      console.log("USERDATA if : ", props.user);
      state.user = props.user;
    } else {
      AsyncStorage.getItem("usertoken").then((usertoken) => {
        console.log("Auth A", usertoken);
        if (usertoken == null) {
          console.log("Auth c", usertoken);
        } else {
          console.log("Auth B>> ", usertoken);
          var userdetail = JSON.parse(usertoken);

          // udata = JSON.parse(usertoken);
          console.log("Auth D", userdetail);
          state.user = userdetail;
        }
      });
    }
  }

  // componentDidMount() {
  //  AsyncStorage.getItem("usertoken").then(res => {
  //    //onsole.log("Drawer token>> ", res)
  //    var userObj = JSON.parse(res);
  //    this.setState({ userRole: userObj[0].role, userId: userObj[0].id})
  //  })

  //  AsyncStorage.getItem("userId").then(userid => {
  //   console.log('userid>> ', userid)
  // })

  // }

  componentDidMount() {
    console.log('componentDidMount from main.js')
    //this.createNotificationListeners();
  }

   async createNotificationListeners(){
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      console.log('onNotification:');
      
        const localNotification = new firebase.notifications.Notification({
          sound: 'sampleaudio',
          show_in_foreground: true,
        })
        .setSound('sampleaudio.wav')
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
        .android.setSmallIcon('@mipmap/ic_launcher') // create this icon in Android Studio
        .android.setColor('#000000') // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
    });

    const channel = new firebase.notifications.Android.Channel('fcm_FirebaseNotifiction_default_channel', 'ICS', firebase.notifications.Android.Importance.High)
      .setDescription('Demo app description')
      .setSound('sampleaudio.wav');
    firebase.notifications().android.createChannel(channel);

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      console.log('onNotificationOpened:');
      Alert.alert(title, body, [
      {text: 'OK', onPress: () => {
         AsyncStorage.getItem("usertoken").then(userToken => {
            var userObj = JSON.parse(userToken);
            console.log("App Role>> ", userObj[0].role)
            if(userObj[0].role == 'operator'){
              Actions.notification();
            }
            else if(userObj[0].role == 'user'){
              Actions.usernotification();
            }
        })
      }},
      ],
      {cancelable: false})
       //Actions.usernotification();
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
          const { title, body } = notificationOpen.notification;
          console.log('getInitialNotification:');
          Alert.alert(title, body, [
          {text: 'OK', onPress: () => {
            AsyncStorage.getItem("usertoken").then(userToken => {
            var userObj = JSON.parse(userToken);
            console.log("App Role>> ", userObj[0].role)
            if(userObj[0].role == 'operator'){
              Actions.notification();
            }
            else if(userObj[0].role == 'user'){
              Actions.usernotification();
            }
        })
      }},
      ],
      {cancelable: false})
      //Actions.usernotification();
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log("JSON.stringify:", JSON.stringify(message));
    });
  }

  addMeterReading() {
    NetInfo.fetch().then((state) => {
      console.log("Is connected?", state.isConnected);
      if (state.isConnected) {
        Actions.jump("addmeterreading");
        setTimeout(() => {
          Actions.drawerClose();
        }, 400);
      } else {
        // Actions.jump('addreadingoffline');
        Actions.jump("offlineconnections");
        setTimeout(() => {
          Actions.drawerClose();
        }, 400);
      }
    });
  }
  viewUsers() {
    Actions.jump("users");
    setTimeout(() => {
      Actions.drawerClose();
    }, 400);
  }
  viewMeters() {
    Actions.jump("meters");
    setTimeout(() => {
      Actions.drawerClose();
    }, 400);
  }
  viewOfflineReadings() {
    Actions.jump("viewofflinereadings");
    setTimeout(() => {
      Actions.drawerClose();
    }, 400);
  }
  viewUnapprovedWaterOrders() {
    Actions.jump("unApprovedwaterorders");
    setTimeout(() => {
      Actions.drawerClose();
    }, 400);
  }
  viewapprovedWaterOrders() {
    Actions.jump("approvedwaterorders");
    setTimeout(() => {
      Actions.drawerClose();
    }, 400);
  }
  viewUserNotification() {
    Actions.jump("usernotification");
    setTimeout(() => {
      Actions.drawerClose();
      Actions.refresh({ key: Math.random() });
    }, 400);
  }
  viewNotification() {
    Actions.jump("notification");
    setTimeout(() => {
      Actions.drawerClose();
      Actions.refresh({ key: Math.random() });
    }, 400);
  }
  viewOrderForm() {
    Actions.jump("orderform");
    setTimeout(() => {
      Actions.drawerClose();
    }, 400);
  }
  viewClientDetails() {
    Actions.jump("clientdetails");
    setTimeout(() => {
      Actions.drawerClose();
      Actions.refresh({ key: Math.random() });
    }, 400);
  }
  viewUsageInfo() {
    Actions.jump("usageinformation");
    setTimeout(() => {
      Actions.drawerClose();
      Actions.refresh({ key: Math.random() });
    }, 400);
  }
  viewHistory() {
    // Actions.jump('history');
    Actions.jump("history");
    setTimeout(() => {
      Actions.drawerClose();
      Actions.refresh({ key: Math.random() });
    }, 400);
  }
  logout = async () => {
    const userToken = await AsyncStorage.getItem("usertoken");
    console.log(userToken, "userToken:::::::::____________---------");
    const fcmToken = await AsyncStorage.getItem("fcmToken");
    console.log(fcmToken, "fcmToken:::::::::::::::::::::_______-----------");
    saveDeviceToken(
      null,
      JSON.parse(userToken)[0].id,
      JSON.parse(userToken)[0].role,
      "inactive",
      "inactive"
    );
    // AsyncStorage.removeItem("fcmToken");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("usertoken");
    const myFcm = await AsyncStorage.getItem("fcmToken");
    console.log(myFcm, "fcmToken:::::::::::::::::::::_______-----------");
    Actions.drawerClose();
    setTimeout(() => {
      Actions.auth();
    }, 600);
  };
  render() {
    // const { user } = this.props
    const { user } = this.state;
    console.log("RENDER MAIN : ", user);
    return (
      <View style={{ backgroundColor: "transparent", flex: 1 }}>
        <SafeAreaView>
          {user != null && (
            <ScrollView style={styles.drawerScollView}>
              <List>
                <ListItem noBorder>
                  <Button
                    transparent
                    onPress={() => {
                      Actions.drawerClose();
                    }}
                    style={{ marginTop: 10 }}
                  >
                    <Icon
                      name="close"
                      type="EvilIcons"
                      style={{ color: "#fff" }}
                    />
                  </Button>
                </ListItem>
                <ListItem iconLeft noBorder>
                  <Image
                    source={theme.LOGO_APP_WHITE}
                    resizeMode="contain"
                    style={{ width: 200, height: 100, marginLeft: 20 }}
                  />
                </ListItem>
                {user[0].role == "operator" && (
                  <ListItem iconLeft noBorder>
                    <Button transparent onPress={() => this.addMeterReading()}>
                      <Icon
                        name="speedometer"
                        type="SimpleLineIcons"
                        style={{ color: "#fff" }}
                      />
                      <Text
                        style={{ color: theme.WHITE_COLOR, fontWeight: "bold" }}
                      >
                        {" "}
                        Add Reading{" "}
                      </Text>
                    </Button>
                  </ListItem>
                )}
                {user[0].role == "operator" && (
                  <ListItem iconLeft noBorder>
                    <Button transparent onPress={() => this.viewUsers()}>
                      <Icon
                        name="user"
                        type="SimpleLineIcons"
                        style={{ color: "#fff" }}
                      />
                      <Text
                        style={{ color: theme.WHITE_COLOR, fontWeight: "bold" }}
                      >
                        {" "}
                        Users
                      </Text>
                    </Button>
                  </ListItem>
                )}
                {user[0].role == "operator" && (
                  <ListItem iconLeft noBorder>
                    <Button transparent onPress={() => this.viewMeters()}>
                      <Icon
                        name="speedometer"
                        type="SimpleLineIcons"
                        style={{ color: "#fff" }}
                      />
                      <Text
                        style={{ color: theme.WHITE_COLOR, fontWeight: "bold" }}
                      >
                        {" "}
                        Meters
                      </Text>
                    </Button>
                  </ListItem>
                )}
                {user[0].role == "operator" && (
                  <ListItem iconLeft noBorder>
                    <Button
                      transparent
                      onPress={() => this.viewOfflineReadings()}
                    >
                      <Icon
                        name="notebook"
                        type="SimpleLineIcons"
                        style={{ color: "#fff" }}
                      />
                      <Text
                        style={{ color: theme.WHITE_COLOR, fontWeight: "bold" }}
                      >
                        {" "}
                        Offline Readings
                      </Text>
                    </Button>
                  </ListItem>
                )}
                {/* {user[0].role == 'operator' &&
                  <ListItem iconLeft noBorder>
                    <Button transparent onPress={() => this.viewUnapprovedWaterOrders()}>
                      <Icon name='new-message' type='Entypo' style={{ color: "#fff" }} />
                      <Text style={{ color: theme.WHITE_COLOR, fontWeight: "bold", }} > New Orders</Text>
                    </Button>
                  </ListItem>
                } */}
                {user[0].role == "operator" && (
                  <ListItem iconLeft noBorder>
                    <Button
                      transparent
                      disabled={!SHOWORDER}
                      onPress={() => this.viewapprovedWaterOrders()}
                    >
                      <Icon
                        name="new-message"
                        type="Entypo"
                        style={{ color: SHOWORDER ? "#fff" : theme.GREY_COLOR }}
                      />
                      <Text
                        style={{
                          color: SHOWORDER
                            ? theme.WHITE_COLOR
                            : theme.GREY_COLOR,
                          fontWeight: "bold",
                        }}
                      >
                        Orders
                      </Text>
                    </Button>
                  </ListItem>
                )}
                {user[0].role == "operator" && (
                  <ListItem iconLeft noBorder>
                    <Button transparent onPress={() => this.viewNotification()}>
                      <Icon
                        name="notifications-none"
                        type="MaterialIcons"
                        style={{ color: "#fff" }}
                      />
                      <Text
                        style={{ color: theme.WHITE_COLOR, fontWeight: "bold" }}
                      >
                        {" "}
                        Notification
                      </Text>
                    </Button>
                  </ListItem>
                )}
                {/* {user[0].role == 'user' &&
                  <ListItem iconLeft noBorder>
                    <Button transparent onPress={() => this.viewOrderForm()}>
                      <Icon name='form' type="AntDesign" style={{ color: "#fff" }} />
                      <Text style={{ color: theme.WHITE_COLOR, fontWeight: "bold", }} > Water Order Form</Text>
                    </Button>
                  </ListItem>
                } */}
                {user[0].role == "user" && (
                  <ListItem iconLeft noBorder>
                    <Button
                      transparent
                      disabled={!SHOWORDER}
                      onPress={() => this.viewHistory()}
                    >
                      <Icon
                        name="form"
                        type="AntDesign"
                        style={{ color: SHOWORDER ? "#fff" : theme.GREY_COLOR }}
                      />
                      <Text
                        style={{
                          color: SHOWORDER
                            ? theme.WHITE_COLOR
                            : theme.GREY_COLOR,
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        Orders
                      </Text>
                    </Button>
                  </ListItem>
                )}
                {user[0].role == "user" && (
                  <ListItem iconLeft noBorder>
                    <Button
                      transparent
                      onPress={() => this.viewClientDetails()}
                    >
                      <Icon
                        name="account-circle"
                        type="MaterialIcons"
                        style={{ color: "#fff" }}
                      />
                      <Text
                        style={{ color: theme.WHITE_COLOR, fontWeight: "bold" }}
                      >
                        Client Details
                      </Text>
                    </Button>
                  </ListItem>
                )}
                {user[0].role == "user" && (
                  <ListItem iconLeft noBorder>
                    <Button transparent onPress={() => this.viewUsageInfo()}>
                      <Icon
                        name="data-usage"
                        type="MaterialIcons"
                        style={{ color: "#fff" }}
                      />
                      <Text
                        style={{ color: theme.WHITE_COLOR, fontWeight: "bold" }}
                      >
                        {" "}
                        Usage Information
                      </Text>
                    </Button>
                  </ListItem>
                )}
                {user[0].role == "user" && (
                  <ListItem iconLeft noBorder>
                    <Button
                      transparent
                      onPress={() => this.viewUserNotification()}
                    >
                      <Icon
                        name="notifications-none"
                        type="MaterialIcons"
                        style={{ color: "#fff" }}
                      />
                      <Text
                        style={{ color: theme.WHITE_COLOR, fontWeight: "bold" }}
                      >
                        {" "}
                        Notification
                      </Text>
                    </Button>
                  </ListItem>
                )}
                <ListItem iconLeft noBorder>
                  <Button
                    transparent
                    onPress={() =>
                      Alert.alert(
                        "Are You Sure?",
                        "",
                        [
                          {
                            text: "No",
                            onPress: () => {
                              console.log("SignIn Cancel Pressed");
                            },
                            style: "cancel",
                          },
                          {
                            text: "Yes",
                            onPress: () => {
                              this.logout();
                            },
                          },
                        ],
                        { cancelable: false }
                      )
                    }
                  >
                    <Icon
                      name="logout"
                      type="SimpleLineIcons"
                      style={{ color: "#fff" }}
                    />
                    <Text
                      style={{ color: theme.WHITE_COLOR, fontWeight: "bold" }}
                    >
                      {" "}
                      Sign-out{" "}
                    </Text>
                  </Button>
                </ListItem>
              </List>
            </ScrollView>
          )}
        </SafeAreaView>
      </View>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};
export default connect(mapStateToProps, { loginUser, loginLocalUser })(Main);
