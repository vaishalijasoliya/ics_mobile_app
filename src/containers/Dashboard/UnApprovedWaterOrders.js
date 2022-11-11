import React, { Component } from 'react';
import { View, Text, Image, BackHandler, FlatList, AsyncStorage, StatusBar, Picker } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Left, Right, Body, Title, Button, Icon, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import theme from '../../config/theme';
import { styles } from '../../config/style';
import { EmptyComponent, UnapprovedWaterListComponent } from '../../components';
import { viewunapprovedWaterOrdersAPI, searchChannelsAPI } from '../../api/methods/waterUsersAPI'

class UnApprovedWaterOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            message: null,
            unApprovedWaterList: null,
            channelList: null,
            channel_name: undefined
        };
    }

    componentDidMount() {
        this.getUnapprovedWaterOrders('');
        this.getChannels();
    }

    getChannels = () => {
        this.state.loading == false && this.setState({ loading: true });
        searchChannelsAPI()
            .then(channel => {
                console.log('CHANNEL RESPONSE ', channel.data)
                if (channel.data.status == true) {
                    this.setState({ channelList: channel.data.result, channel_name: channel.data.result[0].id })
                }
            })
    }

    getUnapprovedWaterOrders = (channelId) => {
        this.state.loading == false && this.setState({ loading: true });
        var formData = new FormData();
        formData.append("channelid", channelId);
        viewunapprovedWaterOrdersAPI(formData)
            .then(waterOrders => {
                console.log("UNAPPROVED WATER ORDERS : ", waterOrders.data.result)
                if (waterOrders.data.status == true) {
                    this.setState({ unApprovedWaterList: waterOrders.data.result, message: null })
                }
                else {
                    this.setState({ unApprovedWaterList: null, message: waterOrders.data.message })
                }
                this.setState({ loading: false })
            })
            .catch(error => { console.log("UNAPPROVED WATER ORDERS Failed.", error) });
    }

    onValueChange(channelId) {
        if (channelId !== 0) {
            this.getUnapprovedWaterOrders(channelId)
            this.setState({ channel_name: channelId })
        }

    }

    renderLoader() {
        return <Spinner color="#173a65" />
    }

    render() {
        const { unApprovedWaterList, loading, message, channelList, channel_name } = this.state
        let filteredItems = [];
        if (channelList != null && channel_name.length > 0) {
            filteredItems = channelList;
        }
        return (
            <Container style={styles.containerMainDiscover} >
                <Header transparent>
                    <StatusBar backgroundColor='#222' barStyle='light-content' />
                    <Left>
                        <Button transparent style={{ paddingLeft: 15 }} onPress={() => { Actions.pop() }}>
                            <Icon name='arrow-back' type="MaterialIcons" style={{ color: "#000" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#000" }}> New Orders </Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <View style={{ width: '85%', height: 40, alignSelf: 'center', marginTop: 10, justifyContent: 'center', borderWidth: 0.5, borderColor: '#000' }}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" />}
                            style={{ width: "90%", alignSelf: 'center', borderColor: '#000', borderWidth: 1 }}
                            placeholder=" - "
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={channel_name}
                            onValueChange={(t) => this.onValueChange(t)}
                        >
                            {filteredItems.map(acct => {
                                return <Picker.Item key={acct.id} label={acct.channel_name} value={acct.id} />;
                            })}
                        </Picker>
                    </View>
                    {loading && this.renderLoader()}
                    <View>
                        {unApprovedWaterList != null && <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={unApprovedWaterList}
                            renderItem={({ item }) => <UnapprovedWaterListComponent
                                id={item.id}
                                operatorid={item.operatorid ? item.operatorid : ''}
                                channel_name={item.channel_name ? item.channel_name : ''}
                                meter_name={item.meter_name ? item.meter_name : ''}
                                serial_number={item.serial_number ? item.serial_number : ''}
                                startTime={item.startTime}
                                endTime={item.endTime}
                                flowRate={item.flowRate ? item.flowRate : ''}
                                totalVolume={item.totalVolume ? item.totalVolume : ''}
                                client_name={item.username ? item.username : ''}
                                contact_name={item.contact_name ? item.contact_name : ''}
                                email={item.email ? item.email : ''}
                                image={item.meterimage}
                                duration={item.duration ? item.duration : ''}
                            />}
                            keyExtractor={(item, index) => {
                                return item.id.toString()
                            }}
                        />}
                    </View>
                    <View>
                        {message != null && <EmptyComponent />}
                    </View>
                </Content>
            </Container>
        );
    }
}

export default UnApprovedWaterOrders;
