import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Container, Header, Content, Left, Right, Body, Title, Button, Icon, Text, ListItem, List, Spinner, H1, Card, CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import theme from '../../config/theme';
import { dateMonthOfTimestamp } from '../../helpers/functions'
import { styles } from '../../config/style';

class UserHistoryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        console.log('Order Details : ', this.props.pendingOrder)
    }

    render() {
        const { pendingOrder } = this.props
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
                        <Title style={{ color: "#000", alignSelf: "center" }}> History Details </Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content style={{ marginHorizontal: 5, backgroundColor: "#fff",}}>
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Meter Name </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {pendingOrder.meter_name} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>FlowRate </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {pendingOrder.flowRate} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Duration </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {pendingOrder.duration} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Total Volume </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {pendingOrder.totalVolume} </Text>
                        </CardItem>
                        {/* <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Weather </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {weather} </Text>
                        </CardItem> */}
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Start Time </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right",color : "dodgerblue"}}> {pendingOrder.startTime} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>End Time </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right",color : "dodgerblue"}}> {pendingOrder.endTime} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Order Date </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right", color : "dodgerblue" }}> {pendingOrder.orderedDate} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Channel Name </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {pendingOrder.channel_name} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Meter type </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {pendingOrder.type} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Water Right Number </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {pendingOrder.wr_number} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Water Right Volume </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {pendingOrder.wr_volume} </Text>
                        </CardItem>
                        {/* <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Status </Text>
                            </Left>
                            { isActive == '0' ? <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right", color : "red" }}> Pending </Text> : <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right", color : "green" }}> Approved </Text> }
                        </CardItem> */}
                        </Card>
                    </Content>
            </Container>
        );
    }
}

export default UserHistoryDetails;
