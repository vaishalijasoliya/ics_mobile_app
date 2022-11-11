import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { dateMonthOfTimestamp } from '../../helpers/functions'
import theme from '../../config/theme';

class UserUsageInformationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { id, serial_number, meter_name, channel_name, meter_type, property, water_right, comments, meterimage, isActive, createdAttype, wr_number, wr_volume, usage, remaining } = this.props
    return (
      <View key={id} style={styles.albumContainer}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => Actions.jump('usageinformationdetails', { id: id, serial_number: serial_number, meter_name: meter_name, meter_type: meter_type, property: property, water_right: water_right, comments: comments, meterimage: meterimage, wr_number: wr_number, wr_volume: wr_volume, channel_name: channel_name })}>
          <View style={styles.verticalListComponentInner}>
            <View style={styles.verticalListComponentRow}>
              {meterimage != "" ? <Image source={{ uri: meterimage }} style={{ borderRadius: 10, height: 70, width: "20%", alignSelf: 'center' }} resizeMode='cover' /> : <Image source={theme.ADD_RECORD} style={{ borderRadius: 10, height: 70, width: "20%", alignSelf:'center' }} resizeMode='cover' />}
              <View style={styles.verticalListComponentColumn}>
                <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitleOne}>Meter Name</Text>
                <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitleOne}>Water Right Number</Text>
                <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitleOne}>Seasonal Usage</Text>
                <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitleOne}>Remaining Allocation</Text>
              </View>
              <View style={styles.verticalListComponentColumn1}>
                <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitle}>: {meter_name}</Text>
                <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitle}>: {wr_number}</Text>
                <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitle}>: {usage}</Text>
                <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitle}>: {remaining}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default UserUsageInformationComponent;
