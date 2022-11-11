import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';

export default class NotificationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { id, title, message, date, status } = this.props
    return (
      <View style={styles.albumContainer}>
        <List>
          <ListItem avatar>
            {/* <Left>
                <Thumbnail source={{ uri: 'Image URL' }} />
              </Left> */}
            <Body>
              <Text>{title}</Text>
              <Text note>{message}</Text>
              <Text note>{date}</Text>
            </Body>
            <Right>
              {status == 'Approved' &&
                <Text style={status == 'Approved' && styles.approve} note>{status}</Text>
              }
              {status == 'Denied' &&
                <Text style={status == 'Denied' && styles.deny} note>{status}</Text>
              }
              {status == 'Pending' &&
                <Text style={status == 'Pending' && styles.pending} note>{status}</Text>
              }
            </Right>
          </ListItem>
        </List>
      </View>
    );
  }
}