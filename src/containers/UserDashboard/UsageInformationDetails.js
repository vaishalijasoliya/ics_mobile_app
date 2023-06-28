import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Container, Header, Content, Left, Right, Body, Title, Button, Icon, Text, ListItem, List, Spinner, H1, Card, CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import theme from '../../config/theme';
import { dateMonthOfTimestamp } from '../../helpers/functions'
import { styles } from '../../config/style';

class UsageInformationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { id, serial_number, meter_name, channel_name, meter_type, property, water_right, comments,telementry,flow_rate,reading,usage_online, meterimage, wr_number, wr_volume } = this.props
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
                        <Title style={{ color: "#000", alignSelf: "center" }}> Usage Information Details </Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content style={{ marginHorizontal: 5, backgroundColor: "#fff", }}>
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Meter Name </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {meter_name} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Serial Number </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {serial_number} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Channel Name </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {channel_name} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Meter Type </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {meter_type} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Property </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {property} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Water Right </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {water_right} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Water right Number </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {wr_number} </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Water right Volume </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {wr_volume} ML </Text>
                        </CardItem>
                        {telementry == 1 ?<>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Reading </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {reading} ML </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Usage </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {!!reading ? reading +' ML' : "" }</Text>
                        </CardItem>
                          
                        <CardItem>
                            <Left>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: "left" }}>Flow Rate </Text>
                            </Left>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%", fontSize: 16, fontStyle: "italic", textAlign: "right" }}> {flow_rate} ML/day </Text>
                        </CardItem> 
                        </>
                        : <></>}
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default UsageInformationDetails;
