import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { Actions } from 'react-native-router-flux';
import { Item, List, ListItem } from 'native-base';
import { duration } from 'moment';
import moment from 'moment';


class CurrentWaterListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        const { startTime, endTime, flow_rate, orders } = this.props
        // const order = []
        // orders.forEach(item => {
        //     var object = {}
        //     // object['duration'] = item.duration
        //     // object['meter_name'] = item.meter_name
        //     order.push(object)
        //     console.log('Start Current meter : ', order)
        // })
        // console.log('Props',this.props);
        const order = []
        const date =  new Date();
        const todayDate =  moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD') 
        for (let i = 0; i < orders.length; i++) {
            order.push(orders[i]);
        }
        // console.log('Current Order >> ', order)
        return (
            <View style={styles.albumContainer}>
                <View style={styles.divider}>
                    <Text>{startTime + " - " + endTime}</Text>
                    <Text>{"Required Flow = " + flow_rate}</Text>
                    <Text>{todayDate}</Text>
                </View>
                {/* <Text>{order[0].duration}</Text> */}
                {order.length > 0 && order.map(function (item, index) {
                    return <TouchableOpacity activeOpacity={0.6} onPress={() => Actions.jump('currentorderdetails', { currentOrder : item, index: index })}>
                    <View style={styles.verticalListComponentInner}>
                        <View style={styles.verticalListComponentRow}>
                            <View style={styles.verticalListComponentColumn}>
                                <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitle}>Client</Text>
                                <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitle}>Channel</Text>
                                <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitle}>Meter</Text>
                                <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitle}>Flowrate</Text>
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
                })}
                {/* <List style={styles.divider}>
                    <ListItem itemDivider>
                        <Text>{startTime+" - "+endTime}</Text>
                    </ListItem>
                    <ListItem itemDivider>
                    <Text>{flow_rate}</Text>
                    </ListItem>
                </List> */}
                {/* <TouchableOpacity activeOpacity={0.6} onPress={() => Actions.jump('currentorderdetails', { client_name: client_name, channel_name: channel_name, meter_name: meter_name, serial_number: serial_number, startTime: startTime, endTime: endTime, flowRate: flowRate, totalVolume: totalVolume, contact_name: contact_name, email: email, image: image })}>
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

export default CurrentWaterListComponent;
