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
import { UserNotificationComponent, EmptyComponent } from "../../components";
import { Actions } from "react-native-router-flux";
import { viewNotificationAPI } from "../../api/methods/waterUsersAPI";

class UserNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationList: null,
      archivenotificationList: null,
      loading: false,
      activelist: true,
      message: null,
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
    this.getNotification();
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
      console.log("User ID snd Role ", userObj[0].id + " " + userObj[0].role);
      var formData = new FormData();
      formData.append("userid", userObj[0].id);
      formData.append("senderrole", userObj[0].role);
      viewNotificationAPI(formData)
        .then((res) => {
          let notification = [];
          let archivenotification = [];
          if (res.data.status == true) {
            this.setState({ notificationList: res.data.result, message: null });
          } else {
            this.setState({
              notificationList: null,
              message: res.data.message,
            });
          }
          this.setState({ loading: false });
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
          console.log("Notification Response ", res.data);
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
      loading,
      message,
      activelist,
      archivenotificationList,
    } = this.state;
    return (
      <Container>
        <Header transparent>
          <StatusBar backgroundColor="#222" barStyle="light-content" />
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
                renderItem={({ item }) => (
                  <UserNotificationComponent
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

export default UserNotifications;
