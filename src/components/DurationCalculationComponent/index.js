import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon, Text } from 'native-base';
import { styles } from './style';
import { calculateDuration } from '../../helpers/functions'
import theme from '../../config/theme';
import { duration } from 'moment';

class OrderCalculationComponent extends Component {
  render() {
    const { start_date, flow_rate, duration } = this.props
    const durationResponse = calculateDuration(start_date, flow_rate, duration);
    return (
      <View style={styles.albumContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>ENDTIME : </Text>
          <Text style={{ color: 'black' }}>{durationResponse ? durationResponse.endtime : ""}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>VOLUME : </Text>
          <Text style={{ color: 'black' }}>{durationResponse ? durationResponse.volume + " ML" : ""}</Text>
        </View>
      </View>
    );
  }
}
export default OrderCalculationComponent;
