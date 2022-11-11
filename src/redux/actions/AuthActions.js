import { AsyncStorage, Alert, Platform } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  signInAPI,
  signUpAPI,
  saveTokenAPI,
} from "../../api/methods/authorizationAPI";
import PushNotification from "react-native-push-notification";
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  USER_ACTIVE,
} from "./types";
// import firebase from 'react-native-firebase';

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

/*  login user action */
export const loginUser = (request) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    signInAPI(request)
      .then((user) => loginUserResponse(dispatch, user.data))
      .catch((error) =>
        loginUserFail(
          dispatch,
          "Authentication Failed. Something went wrong. Please try again."
        )
      );
  };
};

const loginUserFail = (dispatch, error) => {
  console.log("loginUserFail:", error);
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: error,
  });
};

const loginUserSuccess = async(dispatch, user) => {
  console.log("loginUserSuccess > user : ", user);
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });
  try {
    AsyncStorage.getItem("fcmToken").then( async(fcmToken) => {
      console.log("fcmToken device token:", fcmToken);
      // console.log()
      // const appStatus = "active"
      // const pushStatus = "inactive"
      const userToken = await AsyncStorage.getItem('usertoken')
      console.log(userToken,'usersstoken:::::::::::::::::::')
      console.log(':::::>>>>>>>>user  are loged in<<<<<<<<<::::::::::')

      saveDeviceToken(
        fcmToken,
        JSON.parse(userToken)[0].id,
        JSON.parse(userToken)[0].role,
        "active",
        "inactive"
      );
    });
    // const enabled = firebase.messaging().hasPermission();
    // if (enabled) {
    //   fcmToken = firebase.messaging().getToken();
    //  console.log('Enable:', enabled);
    //  console.log('fcmToken device token:', firebase.messaging().getToken());

    // if (!fcmToken) {
    //   fcmToken = firebase.messaging().getToken();
    //   if (fcmToken) {
    //     // user has a device token
    //     console.log('fcmToken device token:', fcmToken);
    //     saveDeviceToken(fcmToken,user[0].id,user[0].role );
    //     AsyncStorage.setItem('fcmToken', fcmToken);
    //   }
    // }
    // else {
    //   firebase.messaging().requestPermission();
    // }
    // PushNotification.configure({
    //   onRegister: function (token) {
    //     console.log("TOKEN:", token);
    //     saveDeviceToken(token.token,user[0].id,user[0].role );
    //   }
    // })
  } catch (e) {
    console.log("TOKEN ERROR ", e);
  }
  AsyncStorage.setItem("usertoken", JSON.stringify(user)).then((res) => {
    console.log("set usertoken", user);
    console.log("set userId", user[0].id);
    // Actions.jump('home');
    // setTimeout(() => {
    //   AsyncStorage.clear();
    //   Actions.drawerClose();
    //   Actions.auth();
    //   Alert.alert(
    //     'Your Session is expired.',
    //     'Please Sign In Again.',
    //     [{
    //       text: 'Ok',
    //       onPress: () => { console.log('go for the sign in') },
    //       style: 'cancel'
    //     },
    //    ], { cancelable: false }
    //   )
    // }, 600000)
    // 600000 = 10 min
  });

  AsyncStorage.setItem("userId", user[0].id);

  setTimeout(() => {
    console.log("Auth 1");
    Actions.authcontroller();
  }, 3000);
};

export const saveDeviceToken = (
  deviceToken,
  userId,
  userRole,
  appStatus,
  pushStatus
) => {
  var formData = new FormData();
  formData.append("token", deviceToken);
  formData.append("userid", userId);
  formData.append("role", userRole);
  formData.append("app_status", appStatus);
  formData.append("push_status", pushStatus);
  console.log(formData, "::::::::::formData::::::::::");
  saveTokenAPI(formData).then((res) => {
    console.log("RESPONSE DVICE TOKEN", res.data.result);
    console.log("RESPONSE DVICE TOKEN", "");
  });
};

const loginUserResponse = (dispatch, user) => {
  console.log("inside loginUserResponse > user : ", user);
  if (user.status == true || user.status == "true") {
    console.log("inside loginUserResponse If");
    loginUserSuccess(dispatch, user.result);
  } else {
    console.log("inside loginUserResponse Else", user.result);
    loginUserFail(dispatch, user.result);
  }
};

/*  register user action */
export const registerUser = (request) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_USER });
    signUpAPI(request)
      .then((user) => registerUserResponse(dispatch, user.data))
      .catch((error) =>
        registerUserFail(
          dispatch,
          "Registration Failed. Something went wrong. Please try again."
        )
      );
  };
};

const registerUserFail = (dispatch, error) => {
  // console.log("registerUserFail:", error);
  dispatch({
    type: REGISTER_USER_FAIL,
    payload: error,
  });
};

const registerUserSuccess = (dispatch, user) => {
  // console.log("registerUserSuccess > user : ", user);
  dispatch({
    type: REGISTER_USER_SUCCESS,
    payload: user,
  });
  Actions.jump("login");
};

const registerUserResponse = (dispatch, user) => {
  console.log("inside registerUserResponse > user : ", user);
  if (user.status == true || user.status == "true") {
    console.log("inside registerUserResponse If");
    registerUserSuccess(dispatch, user.result);
  } else {
    console.log("inside registerUserResponse Else", user.result);
    registerUserFail(dispatch, user.result);
  }
};

export const userIsActive = (isactive) => {
  return {
    type: USER_ACTIVE,
    payload: isactive,
  };
};
