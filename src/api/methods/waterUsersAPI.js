import Api from "..";
import { VIEW_WATER_USERS, SEARCH_METERS, ADD_METER_READING, VIEW_METER_READINGS, VIEW_USER_DETAILS, GET_CHARGE_CODES, ADD_OFFLINE_READING, COMPARE_AND_SAVE, ADD_WATER_ORDER, VIEW_USER_ORDER_HISTORY, VIEW_USAGE_INFORMATION, SEARCH_METERS_BY_USER, UNAPPROVED_WATER_ORDERS, DENY_WATER_ORDER, ACCEPT_WATER_ORDER, SEARCH_CHANNELS, CURRENT_WATER_ORDER, UPCOMING_WATER_ORDER, GET_NOTIFICATION, UPDATE_WATER_ORDER,SAVE_NOTIFICATION, SEARCH_USER_METERS} from "../ApiConstants";

export function viewWaterUsersAPI(body) {    
  return Api(
    VIEW_WATER_USERS,
    null,
    "post",
    body
  );
}
export function searchMetersAPI(body) {    
  return Api(
    SEARCH_METERS,
    null,
    "post",
    body
  );
}
export function addMeterReadingAPI(body) {    
  return Api(
    ADD_METER_READING,
    null,
    "post",
    body
  );
}
export function addOfflineReadingAPI(body) {  
  // console.log("api addOfflineReadingAPI : ", ADD_OFFLINE_READING + " body : " + JSON.stringify(body));
  return Api(
    ADD_OFFLINE_READING,
    null,
    "post",
    body
  );
}
export function compareAndSaveReadingAPI(body) {  
  // console.log("api compareAndSaveReadingAPI : ", COMPARE_AND_SAVE + " body : " + JSON.stringify(body));
  return Api(
    COMPARE_AND_SAVE,
    null,
    "post",
    body
  );
}
export function viewMeterReadingsAPI(body) {    
  return Api(
    VIEW_METER_READINGS,
    null,
    "post",
    body
  );
}
export function viewUserDetailsAPI(body) {    
  return Api(
    VIEW_USER_DETAILS,
    null,
    "post",
    body
  );
}
export function getChargeCodesDetailsAPI(body) {    
  return Api(
    GET_CHARGE_CODES,
    null,
    "post",
    body
  );
}
export function addWaterOrderAPI(body) {    
  return Api(
    ADD_WATER_ORDER,
    null,
    "post",
    body
  );
}
export function updateWaterOrderAPI(body) {    
  return Api(
    UPDATE_WATER_ORDER,
    null,
    "post",
    body
  );
}
export function viewUserOrderHistoryAPI(body) {    
  return Api(
    VIEW_USER_ORDER_HISTORY,
    null,
    "post",
    body
  );
}
export function viewUsageInformationAPI(body) {    
  return Api(
    VIEW_USAGE_INFORMATION,
    null,
    "post",
    body
  );
}
export function searchMetersByUserAPI(body) {    
  return Api(
    SEARCH_METERS_BY_USER,
    null,
    "post",
    body
  );
}
export function searchUserMeterAPI(body) {    
  return Api(
    SEARCH_USER_METERS,
    null,
    "post",
    body
  );
}
export function viewunapprovedWaterOrdersAPI(body) {    
  return Api(
    UNAPPROVED_WATER_ORDERS,
    null,
    "post",
    body
  );
}
export function denyWaterOrdersAPI(body) {    
  return Api(
    DENY_WATER_ORDER,
    null,
    "post",
    body
  );
}
export function acceptWaterOrdersAPI(body) {    
  return Api(
    ACCEPT_WATER_ORDER,
    null,
    "post",
    body
  );
}
export function searchChannelsAPI(body) {    
  return Api(
    SEARCH_CHANNELS,
    null,
    "post",
    body
  );
}

export function currentWaterOrderAPI(body) {    
  return Api(
    CURRENT_WATER_ORDER,
    null,
    "post",
    body
  );
}

export function upcomingWaterOrderAPI(body) {    
  return Api(
    UPCOMING_WATER_ORDER,
    null,
    "post",
    body
  );
}

export function viewNotificationAPI(body) {    
  return Api(
    GET_NOTIFICATION,
    null,
    "post",
    body
  );
}

export function saveNotificationAPI(body) {    
  return Api(
    SAVE_NOTIFICATION,
    null,
    "post",
    body
  );
}