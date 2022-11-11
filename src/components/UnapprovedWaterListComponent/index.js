import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, Alert, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import PushNotification from 'react-native-push-notification';
import { dateMonthOfTimestamp } from '../../helpers/functions';
import { Content, Card, CardItem, Icon, Body, Spinner, Button } from 'native-base';

class UnapprovedWaterListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
        console.log('Upcoming props : ', JSON.stringify(this.props.item))
    }

    editOrders = (id,clientname,channel,metername,serialnumber,starttime,endtime,flowrate,totalvolume,duration,userid) => {
        Actions.jump('editwaterorders',{id:id,clientname:clientname,channel:channel,metername:metername,serialnumber:serialnumber,starttime:starttime,endtime:endtime,flowrate:flowrate,totalvolume:totalvolume,duration:duration, userid:userid });
    }

    renderLoader() {
        return <Spinner color="#fff" />
    }

    render() {
        const { channel_name, meter_name, serial_number, startTime, endTime, flowRate, totalVolume, client_name, contact_name, email, image, operatorid, id, duration, userid } = this.props
        return (
            <View key={id} style={styles.albumContainer}>
                <TouchableOpacity activeOpacity={0.6}
                onPress={()=> Actions.jump('unapprovedwaterordersdetails', {id:id,channel_name:channel_name, meter_name:meter_name, serial_number:serial_number, startTime:startTime, endTime:endTime, flowRate:flowRate, totalVolume:totalVolume, userid:userid, client_name:client_name, contact_name:contact_name, email:email, image:image, duration:duration})}>
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
                        <Button style={{borderRadius:10, elevation: 2, backgroundColor:'#fff'}}>
                            <Icon type="AntDesign" name="edit" style={{color: '#000',}} onPress={() => this.editOrders(id,client_name,channel_name,meter_name,serial_number,startTime,endTime,flowRate,totalVolume, duration, userid)}/>
                        </Button>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default UnapprovedWaterListComponent;
