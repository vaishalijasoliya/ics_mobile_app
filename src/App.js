import React, { Component, useRef, useState, useEffect } from "react";
import {
  Platform,
  View,
  StatusBar,
  AsyncStorage,
  Alert,
  AppState,
} from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Root } from "native-base";
import SplashScreen from "react-native-splash-screen";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import ReduxThunk from "redux-thunk";
import reducers from "./redux/reducers";
import Router from "./Router";
import { Actions } from "react-native-router-flux";
import firebase from "react-native-firebase";
import { saveDeviceToken } from "../src/redux/actions/AuthActions";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

const App = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // const fcmToken =  firebase.messaging().getToken();
  // console.log(fcmToken, ":::::::::::::}}}}}}}}}}}}}}");

  const getToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    console.log(fcmToken, ":::::::::::::}}}}}}}}}}}}}}");
    if (fcmToken) {
      // user has a device token
      console.log("fcmToken+++++++++++========:", fcmToken);
      await AsyncStorage.setItem("fcmToken", fcmToken);
    }
  };

  //1
  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  };

  //3
  // const getToken = async () => {
  //   let fcmToken = await AsyncStorage.getItem("fcmToken");
  //   console.log(fcmToken, "fcmtoken::::::::::::::::::::");
  //   if (!fcmToken) {
  //     fcmToken = await firebase.messaging().getToken();
  //     console.log(fcmToken,'//////////////')
  //     if (fcmToken) {
  //       // user has a device token
  //       console.log("fcmToken+++++++++++========:", fcmToken);
  //       await AsyncStorage.setItem("fcmToken", fcmToken);
  //     }
  //   }
  //   console.log("fcmToken:::::::::::-----------", fcmToken);
  // };

  //2
  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  };

  const createNotificationListeners = async () => {
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

  useEffect(async () => {
    // getResponse();
    SplashScreen.hide();
    // await firebase.initializeApp({
    //   apiKey: "AIzaSyC5PmofJ9BsOwbrXOLGoRnh8dauyIJoLpo",
    //   projectId: "main-portal-ics",
    //   appId: "1:18312341361:android:a4622b749e6b2b6efe38d0",
    //   storageBucket: "main-portal-ics.appspot.com",
    //   messagingSenderId: "18312341361",
    //   databaseURL: "https://intelligentcanalsystems.firebaseio.com",
    // });com.google.gms:google-services

    console.log("App Test::::::::::::::::");
    console.log(firebase, "firebase:::::::::::::");

    const fcmToken = await firebase.messaging().getToken();
    console.log("____________------------------::::::::::::::::::::", fcmToken);

    AppState.addEventListener("change", async (nextAppState) => {
      console.log(nextAppState);
    });
    getToken();

    checkPermission();
    setTimeout(() => {
      createNotificationListeners(); //add this line
    }, 300);
    
    this.notificationListener;
    this.notificationOpenedListener;

    console.log("Test app:::::::::");

    console.log("Appstate", AppState.currentState);
    if (AppState.currentState == "active") {
      console.log("Appstate is active ......<><><><><><>");
      console.log("App has come to the foreground::::::::::----------");
      const FcmToken = await firebase.messaging().getToken();
      console.log("::::://///////.>>>>>>>", FcmToken);

      const userToken = await AsyncStorage.getItem("usertoken");
      console.log(userToken, "user:::::::::::::::token///////////////////");
      if (!!userToken) {
        console.log(userToken, "myusers::::::::::::>>>>>>>>>>><<<<<<<<<<<<");
        saveDeviceToken(
          fcmToken,
          JSON.parse(userToken)[0].id,
          JSON.parse(userToken)[0].role,
          "active",
          "inactive"
        );
      }

      // console.log(deviceFcmToken, "device token");
    }
    // AppState.addEventListener("change", async (nextAppState) => {
    //   console.log(nextAppState, "//////////||||||||||||||");
    //   if (AppState.currentState == "active") {
    //     console.log();
    //   }
    // });

    AppState.addEventListener("change", async (nextAppState) => {
      console.log(
        nextAppState,
        "//////////<<<<<<<<<<<<<<<<appstate>>>>>>>>>>>>>>/////////"
      );
      if (nextAppState === "active") {
        console.log("App has come to the foreground::::::::::----------");
        const FcmToken = await firebase.messaging().getToken();
        console.log("::::://///////.>>>>>>>", FcmToken);

        const userToken = await AsyncStorage.getItem("usertoken");
        console.log(userToken, "user:::::::::::::::token///////////////////");
        if (!!userToken) {
          console.log(userToken, "myusers::::::::::::>>>>>>>>>>><<<<<<<<<<<<");
          saveDeviceToken(
            fcmToken,
            JSON.parse(userToken)[0].id,
            JSON.parse(userToken)[0].role,
            "active",
            "inactive"
          );
        }

        try {
          
          const userToken = await AsyncStorage.getItem("usertoken");
          console.log(userToken, "user:::::::::::::::token///////////////////");
        } catch {
          console.log("can not get token");
        }
      } else if (nextAppState === "background" || nextAppState === "inactive") {
        console.log("App is working on background::::::::::-------");
        const userToken = await AsyncStorage.getItem("usertoken");
        console.log(userToken, "userToken:::::::::____________---------");
        console.log(userToken, "::::::::::::userId:::::::::::::");
        const fcmToken = await AsyncStorage.getItem("fcmToken");
        // let fcmToken = await AsyncStorage.getItem("fcmToken");
        console.log(fcmToken, ":::::::::::::::::::___________________fcm");

        if (!!userToken) {
          console.log(JSON.parse(userToken)[0], "usertoken:::::::::::::::");
          
          saveDeviceToken(
            fcmToken,
            JSON.parse(userToken)[0].id,
            JSON.parse(userToken)[0].role,
            "inactive",
            "active"
          );
        } else if (nextAppState === "inactive") {
          console.log("App is closed:::::::::-----------------");
        }
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("Appstate", appState.current);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#222" barStyle="light-content" />
      <Provider store={store}>
        <Root>
          <Router />
        </Root>
      </Provider>
    </View>
  );
};
export default App;
