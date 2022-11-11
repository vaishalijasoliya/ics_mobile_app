import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon, Text } from 'native-base';
import { styles } from './style';
import { calculateEndDate } from '../../helpers/functions'
import theme from '../../config/theme';

class OrderCalculationComponent extends Component {  
  render() {
    const {start_date,flow_rate, end_date} = this.props
    const endTimeResponse = calculateEndDate(start_date,flow_rate,end_date);
    return (
        <View style={styles.albumContainer}>
          <View style={{ flexDirection : "row"}}>
            <Text style={{color:'black', fontWeight:'bold'}}>DURATION : </Text>
            <Text style={{color:'black'}}>{ endTimeResponse ? endTimeResponse.duration+" Hrs" : "" }</Text>
          </View>
            <View style={{ flexDirection : "row"}}>
            <Text style={{color:'black', fontWeight:'bold'}}>VOLUME : </Text>
            <Text style={{color:'black'}}>{ endTimeResponse ? endTimeResponse.volume+" ML" : "" }</Text>
          </View>  
      </View>
    );
  }
}
export default OrderCalculationComponent;
