import React, { Component } from 'react';
import { View,Image,TouchableOpacity, Linking} from 'react-native';
import { Text, Thumbnail, Card, CardItem, Icon, Left, Body, Right, Toast } from 'native-base';
import {styles} from './style';
import theme from '../../config/theme';

export default class ClientDetailsComponent extends Component {
    render() {
        const {id, username, contact_name, email, address, phone, stock_supply, mobile} = this.props
        return (
            <View style={styles.albumContainer}>
                <View style={{ backgroundColor : "white" }} >
                  <Card >
                    {/*  User Name */}
                    <CardItem>
                      <Left>                  
                        <Text style={{ fontWeight : 'bold', fontSize : 16, textAlign : "left"}}>User Name </Text>
                      </Left>              
                        <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%",fontSize : 16, fontStyle:"italic", textAlign : "right"}}> {username} </Text>              
                    </CardItem>
                    {/*  Contact Name */}
                    <CardItem>
                      <Left>                  
                        <Text style={{ fontWeight : 'bold', fontSize : 16, textAlign : "left"}}>Contact Name </Text>
                      </Left>              
                        <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%",fontSize : 16,fontStyle:"italic", textAlign : "right"}}> { contact_name } </Text>              
                    </CardItem>
                    {/*  Full Address  */}
                    <CardItem>
                      <Left>                  
                        <Text style={{ fontWeight : 'bold', fontSize : 16, textAlign : "left"}}>Full Address </Text>
                      </Left>              
                        <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%",fontSize : 16, fontStyle:"italic", textAlign : "right"}}> { address } </Text>              
                    </CardItem>
                    {/*  Phone  */}
                    <CardItem>
                      <Left>
                        <Text style={{ fontWeight : 'bold', fontSize : 16, textAlign : "left"}}>Phone </Text>
                      </Left> 
                        <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize : 16, fontStyle:"italic", color : "green",textAlign : "right"}}> { phone }</Text>  
                    </CardItem>   
                    <CardItem>
                      <Left>
                        <Text style={{ fontWeight : 'bold', fontSize : 16, textAlign : "left"}}>Mobile </Text>
                      </Left> 
                        <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize : 16, fontStyle:"italic", color : "green",textAlign : "right"}}> { mobile }</Text>  
                    </CardItem>           
                    {/* Email */}
                    <CardItem>
                      <Left>
                        <Text style={{ fontWeight : 'bold', fontSize : 16, textAlign : "left"}}>Email </Text>
                      </Left>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize : 16, fontStyle:"italic", color : "dodgerblue", textAlign : "right"}}>{ email }</Text>   
                    </CardItem>
                    {/* Stock Supply */}
                    <CardItem>
                      <Left>
                        <Text style={{ fontWeight : 'bold', fontSize : 16, textAlign : "left"}}>Stock {`&`} Domestic </Text>
                      </Left>
                      <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize : 16, fontStyle:"italic", textAlign : "right"}}>{ stock_supply==1?'Yes':'No'}</Text>              
                    </CardItem>
                   
                  </Card>
                </View>               
            </View>
          );
    }
}