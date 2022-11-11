import React, { Component } from 'react';
import {View, AsyncStorage, PanResponder, Text} from "react-native";
import { Actions } from 'react-native-router-flux';
class Auth extends Component {   
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      role : null
    };
  }
  componentDidMount = async () => { 

    try{
      await AsyncStorage.getItem("usertoken").then(res => { 
        console.log("USERTOKEN>> ", res)
        if(res !== null){
          console.log("IF");
          var userObj = JSON.parse(res);
          console.log("USERTKN obj : ", userObj[0].role)
            this.setState({isLogin: true, role : userObj[0].role});
          } else {
            console.log("ELSE");
            this.setState({isLogin: false});
          }
      }) 
    }  
    catch(err){

    }
    //AsyncStorage.clear(); 
  } 
  goTOLogin(){
    Actions.jump('login'); // Login Screen
  }
  goToHome(role){      
    console.log("ROLE : ", role)
    if(role == 'user'){
      console.log("USER LOGGED IN");
      //  jump to user dashboard
      Actions.jump('userHome'); 
    }
    else if(role == 'operator'){
      console.log("OPERATOR LOGGED IN");
      //  jump to operator dashboard
      Actions.jump('home'); 
    }
    else {
      console.log("NEITHER OPERATOR NOR CLIENT");
      // User is neither a Client nor an operator
    }
    
    
  }
  
  render() {  
    const { isLogin, role } = this.state 
    return (
        <View>    
          <Text>Hello</Text>         
          { isLogin ? this.goToHome(role) : this.goTOLogin() }
        </View>
    );
  }
}
export default Auth;