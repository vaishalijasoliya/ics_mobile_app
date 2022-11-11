import React, { Component } from 'react';
import { View, StatusBar, AsyncStorage, Alert } from 'react-native';
import { Container, Header, Content, Left, Right, Body, Title, Button, Icon, Text, ListItem, List, Spinner, H1, Card, CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import theme from '../../config/theme';
import PushNotification from 'react-native-push-notification';
import { dateMonthOfTimestamp, formatDateHour } from '../../helpers/functions'
import { styles } from '../../config/style';
import { denyWaterOrdersAPI, acceptWaterOrdersAPI } from '../../api/methods/waterUsersAPI';

class UnapprovedWaterOrdersDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
        console.log('USERID DETAILS : ', this.props.userid)
        // PushNotification.configure({

        //     onRegister: function (token) {
        //       console.log("TOKEN:", token);
        //     },
        
        //     onNotification: function (notification) {
        //       console.log("NOTIFICATION:", notification);
        //         PushNotification.localNotification(notification);
        //     },
        //     permissions: {
        //         alert: false,
        //         badge: false,
        //         sound: false,
        //     },
        //     popInitialNotification: true,
        //     requestPermissions: true
        
        //   });
    }

    acceptWaterOrders = (orderid, userid) => {
        AsyncStorage.getItem("userId").then(userId => {
            var formData = new FormData();
            formData.append("orderid", orderid);
            formData.append("operatorid", userId);
            formData.append("userid", userid);
            this.setState({ loading: true })
            acceptWaterOrdersAPI(formData).then(response => {
                console.log('ACCEPT ORDER RESPONSE ', response.data)
                if (response.data.status == true) {
                    Alert.alert(
                        "",
                        response.data.message,
                        [{
                            text: "OK",
                            style: "cancel",
                            onPress: () => {
                                Actions.pop()
                                Actions.refresh({ key: Math.random() })
                            }
                        }],
                        { cancelable: true }
                    )
                    //PushNotification.localNotification({message: 'Order Approve successfully'});
                }
                else {
                    Alert.alert(
                        "",
                        response.data.message,
                        [{
                            text: "OK",
                            style: "cancel",
                            onPress: () => {
                                Actions.pop()
                                Actions.refresh({ key: Math.random() })
                            }
                        }],
                        { cancelable: true }
                    )
                    // PushNotification.localNotification({ message: 'Approved Order' })
                }
            })
            .finally(() => {
                this.setState({ loading: false })
            })
        })

    }

    denyWaterOrders = (orderid) => {
        AsyncStorage.getItem("userId").then(userId => {
            var formData = new FormData();
            formData.append("orderid", orderid);
            formData.append("operatorid", userId);
            this.setState({ loading: true })
            denyWaterOrdersAPI(formData)
                .then(response => {
                    console.log('DENY ORDER RESPONSE ', response.data)
                    if (response.data.status == true) {
                        Alert.alert(
                            "",
                            response.data.message,
                            [{
                                text: "OK",
                                style: "cancel", 
                                onPress: () => {
                                    Actions.pop()
                                    Actions.refresh({ key: Math.random() })
                                }
                            }],
                            { cancelable: true }
                        )
                        //PushNotification.localNotification({message: 'Order Denied successfully'});
                    }
                    else {
                        Alert.alert(
                            "",
                            response.data.message,
                            [{
                                text: "OK",
                                style: "cancel",
                                onPress: () => {
                                    Actions.pop()
                                    Actions.refresh({ key: Math.random() })
                                }
                            }],
                            { cancelable: true }
                        )
                    }
                })
                .finally(() => {
                    this.setState({ loading: false })
                })
        })
    }

    editOrders = (id,clientname,channel,metername,serialnumber,starttime,endtime,flowrate,totalvolume, duration, userid) => {
        Actions.jump('editwaterorders',{id:id,clientname:clientname,channel:channel,metername:metername,serialnumber:serialnumber,starttime:starttime,endtime:endtime,flowrate:flowrate,totalvolume:totalvolume, duration:duration, userid:userid });
    }

    render() {
        const { id, channel_name, meter_name, serial_number, startTime, endTime, flowRate, totalVolume, client_name, contact_name, email, image, duration, userid } = this.props
        return (
            <Container style={styles.containerMainDiscover} >
                <Header transparent>
                    <StatusBar backgroundColor='#222' barStyle='light-content' />
                    <Left>
                        <Button transparent style={{ paddingLeft: 15 }} onPress={() => Actions.pop()}>
                            <Icon name='arrow-back' type="MaterialIcons" style={{ color: "#000" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#000", alignSelf: "center" }}> New Order Details </Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content style={{ marginHorizontal: 5, backgroundColor: "#fff", }}>
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Client </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {client_name} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Contact Name </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {contact_name} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Email </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right", color:'blue' }}> {email} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Channel </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {channel_name} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Meter </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {meter_name} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Serial </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {serial_number} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Start Time </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right", color : "dodgerblue" }}> {startTime} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>End Time </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right", color : "dodgerblue" }}> {endTime} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>FlowRate </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {flowRate} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Duration </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {duration} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Total Volume </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {totalVolume} </Text>
                        </CardItem>
                        <View style={styles.statusContainer}>
                        <Button style={{borderRadius:10, elevation: 2, backgroundColor:'#fff', marginEnd:10}}>
                            <Icon type="AntDesign" name="check" style={{ color: 'green', padding: 5, }} onPress={() => this.acceptWaterOrders(id, userid)}  />
                        </Button>
                        <Button style={{borderRadius:10, elevation: 2, backgroundColor:'#fff', marginEnd:10}}>
                            <Icon type="AntDesign" name="delete" style={{ color: 'red', padding: 5, }} onPress={() => this.denyWaterOrders(id)} />
                        </Button>
                        <Button style={{borderRadius:10, elevation: 2, backgroundColor:'#fff'}}>
                            <Icon type="AntDesign" name="edit" style={{color: '#000', padding: 5,}} onPress={() => this.editOrders(id,client_name,channel_name,meter_name,serial_number,startTime,endTime,flowRate,totalVolume, duration, userid)}/>
                        </Button>
                    </View>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default UnapprovedWaterOrdersDetails;
