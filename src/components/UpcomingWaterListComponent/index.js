import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { Actions } from 'react-native-router-flux';

export default class UpcomingWaterListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
}

  componentDidMount() {
    //  console.log('Upcoming Order props : ', JSON.stringify(this.props.orders))
    // console.log('Upcoming props : ', JSON.stringify(this.props))
  }

  render() {
    const { item } = this.props
    console.log('item', item);

    // const order = []
    // for (let i = 0; i < orders.length; i++) {
    //   order.push(orders[i].orders);

    //   var j;
    //   for (j = 0; j < order[i].length; j++) {
    //     console.log('Upcoming order : ', order[i][j].meter_name)
    //     order.push(order[i][j]);
    //   }
    // }

    return (
      <View style={styles.albumContainer}>
        {/* <Text>{"Channel " + item.channel}</Text> */}
        {item.upcoming != null && item.upcoming.map(function (upcoming, index) {
          return (
            <View>
              <View>
                {upcoming.orders.map(function (order, index) {
                  return (
                    <View>
                      {/* {item.channel !== '' && 
                         <View style={styles.divider}>
                          <Text>{order.start + " - " + order.end}</Text>
                          <Text>{"Required Flow = " + order.flow_rate}</Text>
                          <Text>{upcoming.day}</Text>
                        </View> 
                      } */}
                      {item.channel == '' && order.flow_rate !== 0 &&
                        <View style={styles.divider}>
                          <Text>{order.start + " - " + order.end}</Text>
                          <Text>{"Required Flow = " + order.flow_rate}</Text>
                          <Text>{upcoming.day}</Text>
                        </View>
                      }
                      {order.orders.map(function (item, index) {
                        return (
                          <TouchableOpacity activeOpacity={0.6} onPress={() => Actions.jump('upcomingorderdetails', { upcomingOrder: item, index: index })}>
                            <View style={styles.verticalListComponentInner}>
                              <View style={styles.verticalListComponentRow}>
                                <View style={styles.verticalListComponentColumn}>
                                  <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitle}>Client</Text>
                                  <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitle}>Channel</Text>
                                  <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitle}>Meter</Text>
                                  <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitle}>flowrate</Text>
                                </View>
                                <View style={styles.verticalListComponentColumn1}>
                                  <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitleOne}>: {item.username}</Text>
                                  <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitleOne}>: {item.channel_name}</Text>
                                  <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitleOne}>: {item.meter_name}</Text>
                                  <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitleOne}>: {item.flowRate}</Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )
                      })}
                    </View>
                  )
                })}
              </View>
            </View>
          )
        })}
        {/* <TouchableOpacity activeOpacity={0.6} onPress={()=> Actions.jump('upcomingorderdetails', {client_name:client_name, channel_name:channel_name, meter_name:meter_name, serial_number:serial_number, startTime:startTime, endTime:endTime, flowRate:flowRate, totalVolume:totalVolume, contact_name:contact_name, email:email, image:image})}>
          <View style={styles.verticalListComponentInner}>
            <View style={styles.verticalListComponentRow}>
              <View style={styles.verticalListComponentColumn}>
                <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitle}>Client</Text>
                <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitle}>Channel</Text>
                <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitle}>Meter</Text>
              </View>
              <View style={styles.verticalListComponentColumn1}>
                <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitleOne}>: {client_name}</Text>
                <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitleOne}>: {channel_name}</Text>
                <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitleOne}>: {meter_name}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }
}