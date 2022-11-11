import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon, Text } from 'native-base';
import { styles } from './style';
import { calculateVolume, calculateEndDate, calculateDuration } from '../../helpers/functions'
import theme from '../../config/theme';

class OrderCalculationComponent extends Component {  
  render() {
    const {start_date,flow_rate,volume, end_date} = this.props
    const response = calculateVolume(start_date,flow_rate,volume);
    const endTimeResponse = calculateEndDate(start_date,flow_rate,end_date);
    return (
        <View style={styles.albumContainer}>
          <View style={{ flexDirection : "row"}}>
            <Text style={{color:'black', fontWeight:'bold'}}>END TIME : </Text>
            <Text style={{color:'black'}}>{ response ? response.endtime : "" }</Text>
          </View>
          <View style={{ flexDirection : "row"}}>
            <Text style={{color:'black', fontWeight:'bold'}}>DURATION : </Text>
            <Text style={{color:'black'}}>{ response ? response.duration+' Hrs' : "" }</Text>
          </View>
      </View>
    );
  }
}
export default OrderCalculationComponent;
