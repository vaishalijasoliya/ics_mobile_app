import React, { Component } from 'react';
import { View, StatusBar, AsyncStorage, FlatList, Picker } from 'react-native';
import { Container, Header, Content, Left, Right, Body, Title, Button, Icon, Text, ListItem, List, Spinner, H1 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import theme from '../../config/theme';
import { styles } from '../../config/style';
import { EmptyComponent, UserUsageInformationComponent } from '../../components';
import {viewUsageInformationAPI, searchMetersByUserAPI} from '../../api/methods/waterUsersAPI';

export default class UsageInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usageInformationList: null,
      loading: false,
      message: null,
      meter_name: 'Select Meter',
      meter: null,
    };
  }

  componentDidMount(){
    this.getUsageInformation('');
    this.getMeterName();
  }

  getMeterName = () => {
    AsyncStorage.getItem("userId").then(userId => {
      var formData = new FormData();
      formData.append("userid", userId);
      searchMetersByUserAPI(formData)
      .then(data => {
        console.log("USER METER NAME : ", JSON.stringify(data.data.result))
        this.setState({ meter: data.data.result, meter_name: data.data.result[0].id })
      })
      .catch(e => {
        console.log("Meters Name Error : ", e)
      })
    })
  }


  getUsageInformation = (meterId) => {
    AsyncStorage.getItem("userId").then(userId => {
      console.log('User ID>> ', userId);
      this.state.loading == false && this.setState({ loading: true });
      var formData = new FormData();
      formData.append("userid", userId);
      formData.append("meterid", meterId);
      viewUsageInformationAPI(formData).then(usageInfo => {
        console.log('USAGE INFORMATION RESPONSE>> ', JSON.stringify(usageInfo.data.result))
        if (usageInfo.data.status == true) {
          this.setState({ usageInformationList: usageInfo.data.result, message: null })
        }
        else {
          this.setState({ usageInformationList: null, message: usageInfo.data.message })
        }
        this.setState({ loading: false })
      })
    })
  }

  renderLoader() {
    return <Spinner color="#173a65" />
  }

  onValueChange(meterId){   
      this.getUsageInformation(meterId)
      this.setState({ meter_name: meterId})
  }

  render() {
    const {loading, usageInformationList, message, meter_name, meter} = this.state

    let filteredItems = [];    
    if (meter != null && meter.length > 0) {
      filteredItems = meter;
    }
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
        <StatusBar backgroundColor='#222' barStyle='light-content'/>
          <Left>  
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
              <Icon name='arrow-back' type="MaterialIcons" style={{ color :"#000" }}  />
            </Button>                   
          </Left>
          <Body>
            <Title style={{ color: "#000", alignSelf: "center" }}> Usage Information </Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
        <View style={{width:'85%', height: 40, alignSelf:'center', marginTop:10, justifyContent:'center', borderWidth:0.5, borderColor:'#000'}}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" />}
                style={{ width: "90%", alignSelf:'center'}}
                placeholder=" - "
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={meter_name}
                label={meter_name}
                onValueChange={(t) => this.onValueChange(t)}
              >
                {/* <Picker.Item key={0} label='Select Meter' value='NIL' /> */}
              { 
              filteredItems.length > 0 && filteredItems.map(acct => {  
                return (  <Picker.Item key={acct.id} label={acct.meter_name} value={acct.id} />  )
              })
              }               
            </Picker>
          </View>
        {loading && this.renderLoader()}
          <View>
            {usageInformationList != null && <FlatList
              showsHorizontalScrollIndicator={false}
              data={usageInformationList}
              renderItem={({ item }) => <UserUsageInformationComponent
                color={true}
                radius={20}
                id={item.id}
                serial_number={item.serial_number ? item.serial_number : ''}
                meter_name={item.meter_name ? item.meter_name : ''}
                channel_name={item.channel_name ? item.channel_name : ''}
                meter_type={item.meter_type ? item.meter_type : ''}
                property={item.property ? item.property : ''}
                water_right={item.water_right ? item.water_right : ''}
                comments={item.comments ? item.comments : ''}
                meterimage={item.meterimage}
                isActive={item.isActive ? item.isActive : ''}
                createdAt={item.createdAt ? item.createdAt : ''}
                type={item.type ? item.type : ''}
                wr_number={item.wr_number ? item.wr_number : ''}
                wr_volume={item.wr_volume ? item.wr_volume : ''}
                usage={item.total ? item.total : ''}
                remaining={item.remaining ? item.remaining : ''}
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