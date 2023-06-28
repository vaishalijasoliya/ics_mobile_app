import React, { Component } from 'react';
import { View,Image,TouchableHighlight, TouchableOpacity} from 'react-native';
import { Text} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from './style';
import theme from  '../../config/theme';
export default class MetersDetailsComponent extends Component {
  render() {
    const { id,username,telementry,contact_name,serial_number,meter_name,channel_name,property,usage_online,flow_rate,reading,meternumber,metertype,wr_number,image,createdAt, lastphoto } = this.props
    return (
    <View key={id} style={styles.albumContainer}>
      <TouchableOpacity activeOpacity={0.6} onPress={()=>  Actions.jump('viewmeterreading',{ meter_id:id, username:username,flow_rate :flow_rate,usage_online:usage_online,reading :reading ,  contact_name:contact_name, serial_number:serial_number, meter_name:meter_name, channel_name:channel_name, property:property,meternumber:meternumber,metertype:metertype,wr_number:wr_number,telementry:telementry,image:image,createdAt:createdAt, lastphoto:lastphoto }) }>       
        <View style={styles.verticalListComponentInner}>
          <View style={styles.verticalListComponentRow}>
            {/* <Image source={{uri: image}} style={{borderRadius:10,height:63, width:"18%", resizeMode:'cover'}}/>   */}
            { lastphoto!="" ? <Image source={{ uri : lastphoto }} style={{borderRadius:10,height:telementry == 1 ? 77 : 63, width:"18%", resizeMode:'cover'}}/> : <Image source={theme.ADD_RECORD} style={{borderRadius:10,height: telementry == 1 ? 77 : 63, width:"18%", resizeMode:'cover'}}/>}  
            <View style={styles.verticalListComponentColumn}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListComponentTitleOne}>Meter</Text>              
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListComponentTitle}>Serial Number</Text>              
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListComponentTitle}>Channel</Text>              
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListComponentTitle}>Client</Text>   
              {telementry == 1 ?  <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListComponentTitle}>Flow</Text> : <></>}
                         
            </View>
            <View style={styles.verticalListComponentColumn}>              
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListTitleOne}> : {meter_name}</Text>
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListComponentTitle}> : {serial_number}</Text>              
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListComponentTitle}> : {channel_name}</Text>
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListComponentTitle}> : {username}</Text> 
              {telementry == 1 ? <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListComponentTitle}> : {flow_rate == 0 ? "NULL" : flow_rate + ' ML/day'}</Text> : <></>}             
            </View>
          </View>              
        </View>        
      </TouchableOpacity>      
    </View>
    );
  }
}
