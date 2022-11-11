import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Scene, Router, Modal } from 'react-native-router-flux';
import { Icon } from 'native-base';
import { Auth, AuthController, Login, Home, Users, Meters, SearchUsers, UserProfile, MeterProfile, AddReading, AddReadingOffline, AddMeterReading, ViewMeterReading, ViewOfflineReadings, OfflineMeterConnections, UserHome, OrderForm, UserNotifications, ClientDetails, UsageInformation, History, Notification, UserHistoryDetails, UsageInformationDetails, UnApprovedWaterOrders, UnapprovedWaterOrdersDetails, ApprovedWaterOrders, CurrentOrderDetails, UpcomingOrderDetails, EditWaterOrders, UserHistoryCurrentDetails, UserHistoryFinishDetails } from './containers';
import { styles } from './config/style';
import Main from './containers/Dashboard/Main';

const SCREEN_WIDTH = Dimensions.get("window").width;
const MenuIcon = () => {
  return (
    <View style={styles.menuIcon}>
      <View style={styles.menuIconSubview}>
        <Icon name='navicon' type="FontAwesome" style={{ color: "red" }} />
      </View>
    </View>
  )
}

const RouterComponent = () => {
  return (
    <Router>
      <Scene hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={Login} hideNavBar />
        </Scene>
        <Scene key="drawer"
          drawer
          contentComponent={Main}
          drawerIcon={MenuIcon}
          drawerWidth={(SCREEN_WIDTH * 75) / 100}
          style={{ backgroundColor: "#222" }}
          drawerPosition="left"
        >
          <Scene key="home" component={Home} hideNavBar={true} />
          <Scene key="addmeterreading" component={AddMeterReading} hideNavBar={true} />
          <Scene key="offlineconnections" component={OfflineMeterConnections} hideNavBar={true} />
          <Scene key="users" component={Users} hideNavBar={true} />
          <Scene key="meters" component={Meters} hideNavBar={true} />
          <Scene key="viewofflinereadings" component={ViewOfflineReadings} hideNavBar={true} />
          <Scene key='unApprovedwaterorders' component={UnApprovedWaterOrders} hideNavBar={true} />
          <Scene key="notification" component={Notification} hideNavBar={true} />

          <Scene key="userHome" component={UserHome} hideNavBar={true} />
          {/* <Scene key="orderform" component={OrderForm} hideNavBar={true} /> */}
          <Scene key="clientdetails" component={ClientDetails} hideNavBar={true} />
          <Scene key="usageinformation" component={UsageInformation} hideNavBar={true} />
          <Scene key="usernotification" component={UserNotifications} hideNavBar={true} />
          <Scene key="history" component={History} hideNavBar={true} />
        </Scene>
        {/* <Scene key="register" component={Registration} hideNavBar={true} />    */}
        <Scene key="addreading" component={AddReading} hideNavBar={true} />
        <Scene key="userprofile" component={UserProfile} hideNavBar={true} />
        <Scene key="meterprofile" component={MeterProfile} hideNavBar={true} />
        <Scene key="searchusers" component={SearchUsers} hideNavBar={true} />
        <Scene key="addreadingoffline" component={AddReadingOffline} hideNavBar={true} />
        <Scene key="viewmeterreading" component={ViewMeterReading} hideNavBar={true} />
        <Scene key="userhistorydetails" component={UserHistoryDetails} hideNavBar={true}/>
        <Scene key="userhistorycurrentdetails" component={UserHistoryCurrentDetails} hideNavBar={true}/>
        <Scene key="userhistoryfinishdetails" component={UserHistoryFinishDetails} hideNavBar={true}/>
        <Scene key='usageinformationdetails' component={UsageInformationDetails} hideNavBar={true}/>
        <Scene key='unapprovedwaterordersdetails' component={UnapprovedWaterOrdersDetails} hideNavBar={true} />
        <Scene key='approvedwaterorders' component={ApprovedWaterOrders} hideNavBar={true} />
        <Scene key='currentorderdetails' component={CurrentOrderDetails} hideNavBar={true} />
        <Scene key='upcomingorderdetails' component={UpcomingOrderDetails} hideNavBar={true} />
        <Scene key="orderform" component={OrderForm} hideNavBar={true} />
        <Scene key='editwaterorders' component={EditWaterOrders} hideNavBar={true} />
        {/* <Scene key="checkauth" initial={true} component={Auth} hideNavBar  />   */}
        <Scene key="authcontroller" initial={true} component={AuthController} hideNavBar />
      </Scene>
    </Router>
  );
};
export default RouterComponent;