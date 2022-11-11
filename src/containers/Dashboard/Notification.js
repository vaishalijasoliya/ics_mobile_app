import React, { Component } from "react";
import {
  View,
  StatusBar,
  FlatList,
  AsyncStorage,
  BackHandler,
} from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button,
  Icon,
  Title,
  Spinner,
} from "native-base";
import { NotificationComponent, EmptyComponent } from "../../components";
import { Actions } from "react-native-router-flux";
import { viewNotificationAPI } from "../../api/methods/waterUsersAPI";
import moment from "moment";

class Notification extends Component {
  constructor(props) {
    super(props);
    //*****/
    // Active list = 0 order which are pending or are not older then 2 days
    // Active list = 1 order which are not pending or are older then 2 days
    //**** */
    this.state = {
      notificationList: null,
      archivenotificationList: null,
      loading: false,
      activelist: true,
      message: null,
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "handleBackPress",
      this.handleBackPress
    );
    this.getNotification();
  }
  componentWillMount() {
    this.backHandler = BackHandler.addEventListener(
      "handleBackPress",
      this.handleBackPress
    );
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  handleBackPress = () => {
    Actions.pop();
    return true;
  };

  getNotification = () => {
    this.state.loading == false && this.setState({ loading: true });
    AsyncStorage.getItem("usertoken").then((res) => {
      var userObj = JSON.parse(res);
      var formData = new FormData();
      formData.append("userid", userObj[0].id);
      formData.append("senderrole", userObj[0].role);
      viewNotificationAPI(formData)
        .then((res) => {
          console.log("Notification Response ", res.data);
          if (res.data.status == true) {
            try {
              let notification = [];
              let archivenotification = [];
              res.data.result.map((item) => {
                if (item.state == "Pending") {
                  notification.push(item);
                } else if (moment().diff(moment(item.date), "days") < 2) {
                  notification.push(item);
                } else {
                  archivenotification.push(item);
                }
              });
              this.setState({
                notificationList: notification,
                archivenotificationList: archivenotification,
                message: null,
              });
            } catch (error) {
              console.warn("ERROR");
              this.setState({
                notificationList: res.data.result,
                archivenotificationList: res.data.result,
                message: null,
              });
            }
          } else {
            this.setState({
              notificationList: null,
              message: res.data.message,
            });
          }
          this.setState({ loading: false });
        })
        .catch((error) => {
          console.log("User Notification Failed.", error);
        });
    });
  };

  renderLoader() {
    return <Spinner color="#173a65" />;
  }

  render() {
    const {
      notificationList,
      archivenotificationList,
      loading,
      message,
      activelist,
    } = this.state;
    return (
      <Container>
        <Header transparent>
          <StatusBar backgroundColor="#222" barStyle="dark-content" />
          <Left>
            <Button
              transparent
              style={{ paddingLeft: 15 }}
              onPress={() => Actions.pop()}
            >
              <Icon
                name="arrow-back"
                type="MaterialIcons"
                style={{ color: "#000" }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#000" }}> Notification </Title>
          </Body>
          <Right>
            <Button
              transparent
              style={{ paddingLeft: 15 }}
              onPress={() => {
                this.setState({ activelist: !activelist });
              }}
            >
              <Icon
                name={activelist ? "archive" : "unarchive"}
                type="MaterialIcons"
                style={{ color: "#000" }}
              />
            </Button>
          </Right>
        </Header>
        <Content>
          {loading && this.renderLoader()}
          <View>
            {(notificationList != null || archivenotificationList != null) && (
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={activelist ? notificationList : archivenotificationList}
                ListEmptyComponent={() => {
                  return <EmptyComponent />;
                }}
                renderItem={({ item }) => (
                  <NotificationComponent
                    id={item.id}
                    title={item.title}
                    message={item.message}
                    date={item.date}
                    status={item.status}
                  />
                )}
                keyExtractor={(item, index) => {
                  return item.id.toString();
                }}
              />
            )}
          </View>
          <View>{message != null && <EmptyComponent />}</View>
        </Content>
      </Container>
    );
  }
}

export default Notification;
