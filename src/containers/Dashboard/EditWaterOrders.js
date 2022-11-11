import React, { Component, Fragment } from 'react';
import { View, Keyboard, TouchableOpacity, Picker, AsyncStorage, Alert, StatusBar } from 'react-native';
import { Container, Header, Content, Label, Form, Item, Input, Left, Right, Body, Title, Button, Icon, Text, Spinner } from 'native-base';
import { styles } from '../../config/style';
import { styles1 } from '../UserDashboard/style';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import { updateWaterOrderAPI, searchUserMeterAPI } from '../../api/methods/waterUsersAPI';
import { upperCase, calculateEndDate, calculateVolume, calculateDuration } from '../../helpers';
import { OrderCalculationComponent, EndTimeCalculationComponent, DurationCalculationComponent } from '../../components';

class EditWaterOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start_date: this.props.starttime,
            end_date: this.props.endtime,
            meter: null,
            meter_name: '',
            activePage: 1,
            loading: false,
            DateText: '',
            newVolume: '',
            newFlowrate: '',
            newDuration: ''
        };
    }
    componentDidMount() {
        this.getMeterName();
        //console.log('End Date :', this.props.endtime)
        //console.log('Start Date :', this.props.starttime)
        // console.log('METER NAME :', this.props.metername)
        console.log('EDIT USERID :', this.props.userid)
    }

    getMeterName = () => {
        var formData = new FormData();
        formData.append("userid", this.props.userid);
        searchUserMeterAPI(formData)
            .then(data => {
                console.log("Meters Name SAVED : ", JSON.stringify(data.data.result))
                this.setState({ meter: data.data.result, meter_name: data.data.result[0].id })
            })
            .catch(e => {
                console.log("Meters Name Error : ", e)
            })
    }

    updateWaterOrder = (values, meter_name, start_date, end_date) => {

        console.log("VALUES : ", JSON.stringify(values) + "Meter: " + meter_name + ' start_date: ' + start_date + ' end_date:' + end_date)


        AsyncStorage.getItem("userId").then(userId => {
            const { duration, flow_rate, volume } = values
            //const {newDuration} = this.state
            if (meter_name != "" && meter_name != undefined) {
                var sDate = moment(start_date, 'DD/MM/YYYY hh:mm').format('YYYY-MM-DD hh:mm')
                var eDate = moment(end_date, 'DD/MM/YYYY hh:mm').format('YYYY-MM-DD hh:mm')
                var formData = new FormData();
                formData.append("orderid", this.props.id);
                formData.append("operatorid", userId);
                formData.append("userid", this.props.userid);
                formData.append("meter", meter_name);
                formData.append("flowRate", flow_rate);
                formData.append("startTime", sDate);
                formData.append("duration", duration);
                formData.append("endTime", eDate);
                formData.append("totalVolume", volume);
                formData.append("weather", "NIL");
                updateWaterOrderAPI(formData)
                    .then(response => {
                        console.log("Water Order UPDATE : ", response.data)
                        if (response.data.status == true) {
                            Alert.alert(
                                "",
                                response.data.message,
                                [{
                                    text: "OK",
                                    style: "cancel",
                                    onPress: () => {
                                        Actions.pop();
                                        Actions.refresh({ key: Math.random() })
                                    }
                                }],
                                { cancelable: true }
                            )
                        }
                        else {
                            Alert.alert(
                                "",
                                response.data.message,
                                [{
                                    text: "OK",
                                    style: "cancel",
                                }],
                                { cancelable: true }
                            )
                        }
                    })
                    .finally(() => {
                        this.setState({ loading: false })
                    })
            }
        })

    }
    handleCData = (newDuration, newFlowrate, newVolume) => {

        // ïf(newDuration==''){

        // }
        console.log('NewDuration : ', newDuration)
        console.log('newFlowrate : ', newFlowrate)
        console.log('newVolume : ', newVolume)
        this.setState({
            newDuration: newDuration,
            newFlowrate: newFlowrate,
            newVolume: newVolume
        })
        console.log('new State Duration : ', this.state.newDuration)
    }

    onValueChange2(value) {
        this.setState({
            meter_name: value
        });
        this.dismissKeypad()
    }

    renderLoader() {
        return <Spinner color="#fff" />
    }

    dismissKeypad() {
        Keyboard.dismiss();
    }
    setStartDate(newDate) {
        console.log('New Start Date : ', newDate)
        this.setState({
            start_date: moment(newDate, 'DD/MM/YYYY HH:mm')
        });
        Keyboard.dismiss();
    }
    setEndDate(newDate) {
        console.log('New End Date : ', newDate)
        this.setState({
            end_date: moment(newDate, 'DD/MM/YYYY HH:mm')
        });
        Keyboard.dismiss();
    }
    selectOne = (activePage) => () => this.setState({ activePage })

    render() {
        const { id, clientname, channel, metername, serialnumber, starttime, endtime, flowrate, totalvolume, duration } = this.props
        const { start_date, end_date, meter, meter_name, activePage, loading, DateText, newFlowrate, newDuration, newVolume } = this.state
        const endTimeResponse = calculateEndDate(start_date, newFlowrate, end_date)
        let filteredItems = [];
        if (meter != null && meter.length > 0) {
            filteredItems = meter;
        }
        return (
            <Container style={styles.containerMainDiscover} >
                <Header transparent hasSegment>
                    <StatusBar backgroundColor='#222' barStyle='light-content' />
                    <Left>
                        <Button transparent style={{ paddingLeft: 15 }} onPress={() => Actions.pop()}>
                            <Icon name='arrow-back' type="MaterialIcons" style={{ color: "#000" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#000" }}> Update Orders </Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content>
                    <View style={{ backgroundColor: "#fff", paddingHorizontal: 20, paddingVertical: 30, width: "100%" }}>
                        <Formik
                            initialValues={{ flow_rate: flowrate, duration: duration, volume: totalvolume }}
                            onSubmit={(values) => { this.updateWaterOrder(values, meter_name, start_date, end_date) }}
                        >
                            {({ values, handleReset, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                                <Fragment>
                                    <Form>
                                        {/* {calculateEndDate(start_date,values.flow_rate,end_date)} */}
                                        <Item inlineLabel >
                                            <Label onPress={() => this.dismissKeypad()} style={{ width: "40%" }}> Select Meter </Label>
                                            {
                                                filteredItems.length > 0 && <TouchableOpacity style={{ width: "100%" }} onPress={() => this.dismissKeypad()}>
                                                    <View>
                                                        <Picker
                                                            mode="dropdown"
                                                            iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" />}
                                                            style={{ width: "60%" }}
                                                            placeholder=" - "
                                                            placeholderStyle={{ color: "#bfc6ea" }}
                                                            placeholderIconColor="#007aff"
                                                            selectedValue={meter_name}
                                                            onValueChange={(t) => this.onValueChange2(t)}
                                                        >
                                                            {filteredItems.map(acct => {
                                                                return <Picker.Item key={acct.id} label={acct.meter_name} value={acct.id} />
                                                            })}
                                                        </Picker>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                        </Item>
                                        <Item inlineLabel>
                                            <Label onPress={() => this.dismissKeypad()}> Meter </Label>
                                            <Input
                                                value={metername}
                                                // value={meter_name==''? metername : meter_name}
                                                onChangeText={handleChange('meter_name')}
                                                onBlur={() => setFieldTouched('meter_name')}
                                                placeholder="Meter Name"
                                                placeholderTextColor="#ccc"
                                                style={{ color: "#000", textAlign: "right" }}
                                                autoCapitalize="none"
                                                selectionColor="#000"
                                                disabled={true}
                                            />
                                        </Item>
                                        {/* <Item inlineLabel>
                                            <Label onPress={() => this.dismissKeypad()}> Client </Label>
                                            <Input
                                                value={(values.client)}
                                                onChangeText={handleChange('client')}
                                                onBlur={() => setFieldTouched('client')}
                                                placeholder="Client"
                                                placeholderTextColor="#ccc"
                                                style={{ color: "#000", textAlign: "right" }}
                                                autoCapitalize="none"
                                                selectionColor="#000"
                                            />
                                        </Item> */}
                                        {/* <Item inlineLabel>
                                            <Label onPress={() => this.dismissKeypad()}> Channel </Label>
                                            <Input
                                                value={(values.channel)}
                                                onChangeText={handleChange('channel')}
                                                onBlur={() => setFieldTouched('channel')}
                                                placeholder="Channel"
                                                placeholderTextColor="#ccc"
                                                style={{ color: "#000", textAlign: "right" }}
                                                autoCapitalize="none"
                                                selectionColor="#000"
                                            />
                                        </Item>
                                        <Item inlineLabel>
                                            <Label onPress={() => this.dismissKeypad()}> Serial No. </Label>
                                            <Input
                                                value={(values.serial)}
                                                onChangeText={handleChange('serial')}
                                                onBlur={() => setFieldTouched('serial')}
                                                placeholder="Serial No."
                                                placeholderTextColor="#ccc"
                                                style={{ color: "#000", textAlign: "right" }}
                                                autoCapitalize="none"
                                                selectionColor="#000"
                                            />
                                        </Item> */}
                                        <Item inlineLabel>
                                            <Label onPress={() => this.dismissKeypad()}> Start Time </Label>
                                            <DatePicker
                                                style={{ width: 200 }}
                                                date={moment(start_date)}
                                                mode="datetime"
                                                //placeholder={end_date.toString().substr(4, 21)}
                                                format="DD/MM/YYYY HH:mm"
                                                //maxDate={new Date()}
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                is24Hour={true}
                                                customStyles={{
                                                    dateInput: {
                                                        marginLeft: 36,
                                                        borderColor: "#fff"
                                                    }
                                                }}
                                                showIcon={false}
                                                onDateChange={(d) => { this.setStartDate(d) }}
                                            //getDateStr={(e)=> this.formatDate(e)}
                                            />
                                        </Item>
                                        <Item inlineLabel>
                                            <Label onPress={() => this.dismissKeypad()}> Flowrate </Label>
                                            <Input
                                                value={(values.flow_rate)}
                                                onChangeText={handleChange('flow_rate')}
                                                // onChangeText={(e) => {
                                                //     handleChange("flow_rate")(e);
                                                //     this.handleCData(values.duration, e, values.volume);
                                                // }}
                                                onBlur={() => setFieldTouched('flow_rate')}
                                                placeholder="Flowrate"
                                                placeholderTextColor="#ccc"
                                                style={{ color: "#000", textAlign: "right" }}
                                                autoCapitalize="none"
                                                selectionColor="#000"
                                            />
                                        </Item>
                                        <View style={styles1.segmentContainer}>
                                            <Button style={activePage === 1 ? styles1.buttonActive : styles1.button} active={activePage === 1} onPress={this.selectOne(1)}>
                                                <Text>Duration</Text>
                                            </Button>
                                            <Button style={activePage === 2 ? styles1.buttonActive : styles1.button} active={activePage === 2} onPress={this.selectOne(2)}>
                                                <Text>End Time</Text>
                                            </Button>
                                            <Button style={activePage === 3 ? styles1.buttonActive : styles1.button} active={activePage === 3} onPress={this.selectOne(3)}>
                                                <Text>Volume</Text>
                                            </Button>
                                        </View>
                                        {activePage == 1 &&
                                        <Item inlineLabel>
                                            <Label onPress={() => this.dismissKeypad()}> Duration(Hr) </Label>
                                            <Input
                                                // value={endTimeResponse.duration=='' ? (values.duration) : endTimeResponse.duration}
                                                value={(values.duration)}
                                                onChangeText={handleChange('duration')}
                                                // onChangeText={(d) => {
                                                //     handleChange("duration")(d);
                                                //     this.handleCData(d, values.flow_rate, values.volume);
                                                //     console.log("New D : ")
                                                // }}
                                                onBlur={() => setFieldTouched('duration')}
                                                placeholder="Duration"
                                                placeholderTextColor="#ccc"
                                                style={{ color: "#000", textAlign: "right" }}
                                                autoCapitalize="none"
                                                selectionColor="#000"
                                            />
                                        </Item>
                                        }
                                        {activePage == 2 &&
                                        <Item inlineLabel>
                                            <Label onPress={() => this.dismissKeypad()}> End Time </Label>
                                            <DatePicker
                                                style={{ width: 250 }}
                                                date={moment(end_date)}
                                                mode="datetime"
                                                //placeholder={end_date.toString().substr(4, 21)}
                                                format="DD/MM/YYYY HH:mm"
                                                //maxDate={new Date()}
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                is24Hour={true}
                                                customStyles={{
                                                    dateInput: {
                                                        marginLeft: 36,
                                                        borderColor: "#fff"
                                                    }
                                                }}
                                                showIcon={false}
                                                onDateChange={(d) => { this.setEndDate(d) }}
                                            />
                                        </Item>
                                        }
                                        {activePage == 3 &&
                                        <Item inlineLabel>
                                            <Label onPress={() => this.dismissKeypad()}> Total Volume </Label>
                                            <Input
                                                value={(values.volume)}
                                                onChangeText={handleChange('volume')}
                                                // onChangeText={(e) => {
                                                //     handleChange("volume")(v);
                                                //     this.handleCData(values.duration, values.flow_rate, v);
                                                // }}
                                                onBlur={() => setFieldTouched('volume')}
                                                placeholder="Volume"
                                                placeholderTextColor="#ccc"
                                                style={{ color: "#000", textAlign: "right" }}
                                                autoCapitalize="none"
                                                selectionColor="#000"
                                            />
                                        </Item>
                                        }
                                        {activePage == 1 && calculateDuration(start_date, values.flow_rate, values.duration) &&
                                            <View style={{ padding: 8, marginTop: 20 }}>
                                                <DurationCalculationComponent start_date={start_date} flow_rate={values.flow_rate} duration={values.duration} />
                                            </View>
                                        }
                                        {activePage == 2 && calculateEndDate(start_date, values.flow_rate, end_date) &&
                                            <View style={{ padding: 8, marginTop: 20 }}>
                                                <EndTimeCalculationComponent start_date={start_date} flow_rate={values.flow_rate} end_date={end_date} />
                                            </View>
                                        }
                                        {activePage == 3 && calculateVolume(start_date, values.flow_rate, values.volume) &&
                                            <View style={{ padding: 8, marginTop: 20 }}>
                                                <OrderCalculationComponent start_date={start_date} flow_rate={values.flow_rate} volume={values.volume} />
                                            </View>
                                        }
                                        <Button full style={styles.submitButton} onPress={handleSubmit}>
                                            {loading && this.renderLoader()}
                                            <Text style={styles.linkText} >SAVE</Text>
                                        </Button>
                                    </Form>
                                </Fragment>
                            )}
                        </Formik>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default EditWaterOrders;
