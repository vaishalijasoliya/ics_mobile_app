/* API constants */
// PRODUCTION
export const PORTAL_BASE_URL =
  "https://portal.intelligentcanalsystems.com/service/";
export const MOIRA_BASE_URL =
  "https://moira.intelligentcanalsystems.com/service/";
export const MALLAWA_BASE_URL =
  "https://mallawa.intelligentcanalsystems.com/service/"; 
// export const BASE_URL = PORTAL_BASE_URL;
//export const BASE_URL = MALLAWA_BASE_URL;
export const BASE_URL = MALLAWA_BASE_URL;
export const SHOWORDER = BASE_URL == MALLAWA_BASE_URL ? false : true;
//export const BASE_URL = "https://portal.intelligentcanalsystems.com/service/";

// 'https://portal.intelligentcanalsystems.com/service/';

// TESTING
// export const BASE_URL = 'http://server1.dayopeters.com/ICSweb/service/';

export const REGISTER = "register_operator";

export const LOGIN = "signin_operator";

export const VIEW_WATER_USERS = "view_water_users";

export const SEARCH_METERS = "search_meter_connections";

export const ADD_METER_READING = "add_meter_reading";

export const VIEW_METER_READINGS = "view_meter_readings";

export const VIEW_USER_DETAILS = "view_user_detail";

export const GET_CHARGE_CODES = "get_charge_codes";

export const ADD_WATER_ORDER = "add_water_order";

// export const ADD_OFFLINE_READING = 'add_offline_rawdata';
export const ADD_OFFLINE_READING = "add_offline_reading";

export const COMPARE_AND_SAVE = "compare_and_save";

export const VIEW_USER_ORDER_HISTORY = "view_user_orders";

export const VIEW_USAGE_INFORMATION = "usage_informationby_meter";

export const SEARCH_METERS_BY_USER = "user_meter_connections";

export const SEARCH_USER_METERS = "user_meter_connection";

export const UNAPPROVED_WATER_ORDERS = "unapproved_water_orders";

export const DENY_WATER_ORDER = "deny_water_order";

export const ACCEPT_WATER_ORDER = "accept_water_order";

export const SEARCH_CHANNELS = "available_channels";

export const SAVE_DEVICE_TOKEN = "save_device_token";

export const CURRENT_WATER_ORDER = "current_water_order";
// export const CURRENT_WATER_ORDER = 'graph_values?status=0&channel';

export const UPCOMING_WATER_ORDER = "upcoming_water_order";
// export const UPCOMING_WATER_ORDER = 'graph_values?status=1&channel';

export const GET_NOTIFICATION = "get_notifications";

export const SAVE_NOTIFICATION = "save_notifications";

export const UPDATE_WATER_ORDER = "update_water_order";

export const GET_ALL_CHANNEL = "get_all_channels";
