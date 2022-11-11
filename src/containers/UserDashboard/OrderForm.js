import React, { Component, Fragment } from 'react';
import { View, Keyboard, TouchableOpacity, Picker, AsyncStorage, Alert, StatusBar, TextInput } from 'react-native';
import { Container, Header, Content, Label, Form, Item, Input, Left, Right, Body, Title, Button, Icon, Text, Spinner } from 'native-base';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import { styles } from '../../config/style';
import { styles1 } from './style';
import theme from '../../config/theme';
import PushNotification from 'react-native-push-notification';
import { upperCase, calculateEndDate, calculateVolume, calculateDuration } from '../../helpers';
import { searchUserMeterAPI, addWaterOrderAPI, searchMetersByUserAPI } from '../../api/methods/waterUsersAPI';
import { OrderCalculationComponent, EndTimeCalculationComponent, DurationCalculationComponent } from '../../components';

const durationSchema = yup.object().shape({
  duration: yup
    .number()
    .required('Required!'),
  flow_rate: yup
    .number()
    .required('Required!'),

})

const volumeSchema = yup.object().shape({
  volume: yup
    .number()
    .required('Required!'),
  flow_rate: yup
    .number()
    .required('Required!'),
})

const defaultSchema = yup.object().shape({
  flow_rate: yup
    .number()
    .required('Required!'),
})



export default class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: new Date(),
      // end_date: null,
      end_date: new Date(),
      meter: null,
      meter_name: undefined,
      activePage: 1,
      loading: false,
      DateText: '',
      EndDateText: '',
      showDatePicker: false,
      buy_or_sell: 'Buy'
    };
  }
  componentDidMount() {
    this.getMeterName();
    // PushNotification.configure({

    //   onRegister: function (token) {
    //     console.log("TOKEN:", token);
    //   },

    //   onNotification: function (notification) {
    //     console.log("NOTIFICATION:", notification);
    //     PushNotification.localNotification(notification);
    //   },
    //   permissions: {
    //     alert: false,
    //     badge: false,
    //     sound: false,
    //   },
    //   popInitialNotification: true,
    //   requestPermissions: true

    // });
  }

  selectOne = (activePage) => () => this.setState({ activePage })

  getMeterName = () => {
    AsyncStorage.getItem("userId").then(userId => {
      var formData = new FormData();
      formData.append("userid", userId);
      searchUserMeterAPI(formData)
        .then(data => {
          console.log("Meters Name SAVED : ", JSON.stringify(data.data.result))
          this.setState({ meter: data.data.result, meter_name: data.data.result[0].id })
        })
        .catch(e => {
          console.log("Meters Name Error : ", e)
        })
    })
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hr = d.getHours(),
      min = d.getMinutes(),
      sec = d.getSeconds();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    if (hr < 10)
      hr = "0" + hr;
    if (min < 10)
      min = "0" + min;
    if (sec < 10)
      sec = "0" + sec;
    // 2020-10-09 04:27:00
    return year + '-' + month + '-' + day + ' ' + hr + ':' + min + ':' + sec;

  }

  checkValidation(activePage) {
    if (activePage == 1) {
      return durationSchema;
    }
    if (activePage == 3) {
      return volumeSchema;
    }
    if (activePage == 2) {
      return defaultSchema;
    }
  }

  addWaterOrder = (values, meter_name, start_date, end_date, activePage) => {
    console.log("VALUES : ", JSON.stringify(values) + "Meter: " + meter_name + ' start_date: ' + start_date + ' end_date:' + end_date)
    AsyncStorage.getItem("userId").then(userId => {
      console.log('Water User Id', userId)

      const { flow_rate, duration, volume } = values
      if (meter_name != "" && meter_name != undefined) {
        const sDate = moment(start_date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm') 
        const eDate = moment(end_date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm')
        const durationResponse = calculateDuration(start_date, values.flow_rate, values.duration);
        const endTimeResponse = calculateEndDate(start_date, values.flow_rate, end_date);
        const response = calculateVolume(start_date, values.flow_rate, values.volume);
        var formData = new FormData();
        formData.append("userid", userId);
        formData.append("meter", meter_name);
        formData.append("startTime", sDate);
        formData.append("flowRate", flow_rate);
        if (activePage === 1) {
          formData.append("duration", duration);
          formData.append("endTime", durationResponse.endtime);
          formData.append("totalVolume", durationResponse.volume);
        } else if(activePage === 2) {
          formData.append("duration",  endTimeResponse.duration);
          formData.append("endTime", eDate);
          formData.append("totalVolume", endTimeResponse.volume);
        } else if(activePage === 3) {
          formData.append("duration", response.duration);
          formData.append("endTime", response.endtime);
          formData.append("totalVolume", volume);
        }  
          // formData.append("status", buy_or_sell);
        formData.append("weather", "");
        console.log('FormData>> ', formData)
        this.setState({ loading: true })
        addWaterOrderAPI(formData)
          .then(response => {
            console.log("Water Order SAVED : ", response.data)
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
              //PushNotification.localNotification({ message: 'Order requested successfully' });
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

  onValueChange2(value) {
    this.setState({
      meter_name: value
    });
    this.dismissKeypad()
  }
  changeBuyOrSell(value) {
    console.log("BUYORSELL : ", value)
    this.setState({
      buy_or_sell : value
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

    console.log("SET START DATE 0.1  ", typeof newDate + ' ' + newDate)
    this.setState({
      start_date: newDate,
      // start_date: moment(newDate, 'YYYY/MM/DD HH:mm').format('YYYY/MM/DD HH:mm') 
    });

    Keyboard.dismiss();
  }
  setEndDate(newDate) {
    console.log("End New Date : ", newDate)
    this.setState({
      // end_date: moment(newDate, 'YYYY/MM/DD HH:mm').format('YYYY/MM/DD HH:mm'),
      end_date: newDate,
      // EndDateText: moment(newDate, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY HH:mm')
    });
    Keyboard.dismiss();
  }

  render() {
    const { start_date, end_date, meter, meter_name, activePage, loading, DateText, EndDateText, buy_or_sell } = this.state

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
            <Title style={{ color: "#000" }}> Water Order Form </Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <View style={{ backgroundColor: "#fff", paddingHorizontal: 20, paddingVertical: 30, width: "100%" }}>
            <Formik
              initialValues={{ flow_rate: '', duration: '', volume: '' }}
              onSubmit={(values) => { this.addWaterOrder(values, meter_name, start_date, end_date, activePage, buy_or_sell) }}
              validationSchema={this.checkValidation(activePage)}
            >
              {({ values, handleReset, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <Fragment>
                  <Form>
                    <Item inlineLabel >
                      <Label onPress={() => this.dismissKeypad()} style={{ width: "40%" }}> Meter Name </Label>
                      {
                        filteredItems.length > 0 && 
                        <TouchableOpacity style={{ width: "100%" }} onPress={() => this.dismissKeypad()}>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" />}
                            style={{ width: "65%" }}
                            placeholder=" - "
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={meter_name}
                            onValueChange={(t) => this.onValueChange2(t)}
                          >
                            {filteredItems.map(acct => {
                              return <Picker.Item key={acct.id} label={acct.meter_name} value={acct.id} />;
                            })}
                          </Picker>
                        </TouchableOpacity>
                      }
                    </Item>
                    <Item inlineLabel>
                      <Label onPress={() => this.dismissKeypad()}> Start Time </Label>
                      <DatePicker
                        style={{ width: 200 }}
                        date={start_date}
                        mode="datetime"
                        //placeholder={start_date.toString().substr(4, 21)}
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
                      <Label onPress={() => this.dismissKeypad()}> Flowrate(ML)</Label>
                      <Input
                        value={(values.flow_rate)}
                        onChangeText={handleChange('flow_rate')}
                        onBlur={() => setFieldTouched('flow_rate')}
                        placeholder="Flowrate"
                        placeholderTextColor="#ccc"
                        style={{ color: "#000", textAlign: "right" }}
                        autoCapitalize="none"
                        selectionColor="#000"
                      />
                      {touched.flow_rate && errors.flow_rate &&
                        <Text style={{ color: "red", position: "absolute", bottom: 0, right: 10 }} >{errors.flow_rate}</Text>}
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
                    {activePage === 1 &&
                      <Item inlineLabel>
                        <Label onPress={() => this.dismissKeypad()}> Duration(Hr) </Label>
                        <Input
                          value={(values.duration)}
                          onChangeText={handleChange('duration')}
                          onBlur={() => setFieldTouched('duration')}
                          placeholder="Duration"
                          placeholderTextColor="#ccc"
                          style={{ color: "#000", textAlign: "right" }}
                          autoCapitalize="none"
                          selectionColor="#000"
                        />
                        {touched.duration && errors.duration &&
                          <Text style={{ color: "red", position: "absolute", bottom: 0, right: 10 }} >{errors.duration}</Text>}
                      </Item>
                    }
                    {activePage === 2 &&
                      <Item inlineLabel>
                        <Label onPress={() => this.dismissKeypad()}> End Time </Label>
                        <DatePicker
                          style={{ width: 200 }}
                          // date={end_date ? end_date : null}
                          date={end_date}
                          mode="datetime"
                          //placeholder={end_date.toString().substr(4, 21)}
                          format="DD/MM/YYYY HH:mm"
                          //maxDate={new Date()}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          //hideText={true}
                          is24Hour={true}
                          customStyles={{
                            dateInput: {
                              marginLeft: 36,
                              borderColor: "#fff"
                            }
                          }}
                          showIcon={false}
                          onDateChange={(d) => { this.setEndDate(d) }}
                          // getDateStr={(e)=> {
                          //   console.log("END DATE STRING : ", e)
                          //   console.log("END DATE STRING 2 : ", e.getTime())
                          // }}
                        />
                      </Item>
                    }
                    {activePage === 3 &&
                      <Item inlineLabel>
                        <Label onPress={() => this.dismissKeypad()}> Volume </Label>
                        <Input
                          value={(values.volume)}
                          onChangeText={handleChange('volume')}
                          onBlur={() => setFieldTouched('volume')}
                          placeholder="Volume"
                          placeholderTextColor="#ccc"
                          style={{ color: "#000", textAlign: "right" }}
                          autoCapitalize="none"
                          selectionColor="#000"
                        />
                        {touched.volume && errors.volume &&
                          <Text style={{ color: "red", position: "absolute", bottom: 0, right: 10 }} >{errors.volume}</Text>}
                      </Item>
                    }
                    {activePage === 1 && calculateDuration(start_date, values.flow_rate, values.duration) &&
                      <View style={{ padding: 8, marginTop: 20 }}>
                        <DurationCalculationComponent start_date={start_date} flow_rate={values.flow_rate} duration={values.duration} />
                      </View>
                    }
                    {activePage === 2 && calculateEndDate(start_date, values.flow_rate, end_date) &&
                      <View style={{ padding: 8, marginTop: 20 }}>
                        <EndTimeCalculationComponent start_date={start_date} flow_rate={values.flow_rate} end_date={end_date} />
                      </View>
                    }
                    {activePage === 3 && calculateVolume(start_date, values.flow_rate, values.volume) &&
                      <View style={{ padding: 8, marginTop: 20 }}>
                        <OrderCalculationComponent start_date={start_date} flow_rate={values.flow_rate} volume={values.volume} />
                      </View>
                    }
                    {/* <Item inlineLabel >
                      <Label onPress={() => this.dismissKeypad()} style={{ width: "40%" }}> Buy or Sell </Label>
                      <TouchableOpacity style={{ width: "100%" }} onPress={() => this.dismissKeypad()}>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" />}
                            style={{ width: "60%", marginLeft: 10}}
                            placeholder=" - "
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={buy_or_sell}
                            onValueChange={(t) => this.changeBuyOrSell(t)}
                          >
                             <Picker.Item label="Buy" value="0" />
                             <Picker.Item label="Sell" value="1" />  
                          </Picker>
                        </TouchableOpacity>
                    </Item> */}
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
