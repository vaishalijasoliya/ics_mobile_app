import Api from "..";
import { REGISTER, LOGIN, SAVE_DEVICE_TOKEN } from "../ApiConstants";

export function signInAPI(body) {  
  // console.log("api signInAPI : ", LOGIN + " body : " + JSON.stringify(body));
  return Api(
      LOGIN,
      null,
      "post",
      body
  );
}

export function signUpAPI(body) {
  // console.log("api signUpAPI : ", REGISTER + " body : " + JSON.stringify(body));
  return Api(
    REGISTER,
    null,
    "post",
    body
  );
}

export function saveTokenAPI(body) {
  console.log(body,'apiresponces::::::::::::::::""""""""""""')
  return Api(
    SAVE_DEVICE_TOKEN,
    null,
    "post",
    body
  );
}