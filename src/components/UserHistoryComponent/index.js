import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { dateMonthOfTimestamp } from '../../helpers/functions'
import theme from '../../config/theme';
import { back } from 'react-native/Libraries/Animated/src/Easing';

export default class UserHistoryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        console.log("ITEM PENDING : ", this.props.pending)
        console.log("ITEM CURRENT : ", this.props.current)
        console.log("ITEM FINISH : ", this.props.finish)
        console.log("ITEM : ", this.props.item)
    }

    render() {
        const { pending, current, finish, item } = this.props

        return (
            <View key={item} style={styles.albumContainer}>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>List Pending</Text>
                </View>
                {pending != 0 && pending.map(function (item, index) {
                    return (
                        <TouchableOpacity activeOpacity={0.6} onPress={() => Actions.jump('userhistorydetails', { pendingOrder : item, index: index })}>
                            <View style={styles.verticalListComponentInner}>
                                <View style={styles.verticalListComponentRow}>
                                    {item.meterimage != "" ? <Image source={{ uri: item.meterimage }} style={{ borderRadius: 10, height: 63, width: "17%", resizeMode: 'cover', alignSelf: 'center' }} /> : <Image source={theme.ADD_RECORD} style={{ borderRadius: 10, height: 63, width: "18%", resizeMode: 'cover' }} />}
                                    <View style={styles.verticalListComponentColumn}>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitleOne}>Meter Name</Text>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitleOne}>Duration</Text>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitleOne}>Flowrate</Text>
                                    </View>
                                    <View style={styles.verticalListComponentColumn1}>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitle}>: {item.meter_name}</Text>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitle}>: {item.duration}</Text>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitle}>: {item.flowRate}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}

                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Current Orders</Text>
                </View>
                {current != 0 && current.map(function (item, index) {
                    return (
                        <TouchableOpacity activeOpacity={0.6} onPress={() => Actions.jump('userhistorycurrentdetails', { currentOrder : item, index: index })}>
                            <View style={styles.verticalListComponentInner}>
                                <View style={styles.verticalListComponentRow}>
                                    {item.meterimage != "" ? <Image source={{ uri: item.meterimage }} style={{ borderRadius: 10, height: 63, width: "17%", resizeMode: 'cover', alignSelf: 'center' }} /> : <Image source={theme.ADD_RECORD} style={{ borderRadius: 10, height: 63, width: "18%", resizeMode: 'cover' }} />}
                                    <View style={styles.verticalListComponentColumn}>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitleOne}>Meter Name</Text>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitleOne}>Duration</Text>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitleOne}>Flowrate</Text>
                                    </View>
                                    <View style={styles.verticalListComponentColumn1}>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitle}>: {item.meter_name}</Text>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitle}>: {item.duration}</Text>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitle}>: {item.flowRate}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}

                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Finished Orders</Text>
                </View>
                {finish != 0 && finish.map(function (item, index) {
                    return (
                        <TouchableOpacity activeOpacity={0.6} onPress={() => Actions.jump('userhistoryfinishdetails', { finishOrder : item, index: index })}>
                            <View style={styles.verticalListComponentInner}>
                                <View style={styles.verticalListComponentRow}>
                                    {item.meterimage != "" ? <Image source={{ uri: item.meterimage }} style={{ borderRadius: 10, height: 63, width: "17%", resizeMode: 'cover', alignSelf: 'center' }} /> : <Image source={theme.ADD_RECORD} style={{ borderRadius: 10, height: 63, width: "18%", resizeMode: 'cover' }} />}
                                    <View style={styles.verticalListComponentColumn}>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitleOne}>Meter Name</Text>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitleOne}>Duration</Text>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitleOne}>Flowrate</Text>
                                    </View>
                                    <View style={styles.verticalListComponentColumn1}>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitle}>: {item.meter_name}</Text>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitle}>: {item.duration}</Text>
                                        <Text note numberOfLines={1} ellipsizeMode='tail' style={styles.verticalListComponentTitle}>: {item.flowRate}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
}
