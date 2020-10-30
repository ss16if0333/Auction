import React, { Component } from 'react';
import {

} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';
import { createDrawerNavigator, createStackNavigator, createSwitchNavigator, DrawerItems, ToastAndroid } from 'react-navigation'
import { host } from '../action'
import axios from 'axios'
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      playerName: '',
      initialBid: 0,
      response: 0
    }
    

    this.Submit = this.Submit.bind(this)
  }

  Submit = async () => {
    let team= this.props.navigation.state.params.team;

    var url = `http://${host}:4547/add`;
    await axios.post(url, {
        playerName: this.state.playerName,
        initialBid : this.state.initialBid,
        // teamName:team,
     })
     .then(function (response) {
       console.log('response',response);
 
     
    
     })
     .catch(function (error) {
       console.log('error',error);
     });

  }
//   componentDidMount(){
//     let a= this.props.navigation.state.params.team;
//     console.log(a);
//   }
  render() {
    return (
      <Container style={{ paddingTop: 50 }}>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Player name"
                onChangeText={(playerName) => this.setState({ playerName: playerName })}
              />
            </Item>
            <Item last>
              <Input placeholder="Initial Bid"
                onChangeText={(initialBid) => this.setState({ initialBid: initialBid })}
                

              />
            </Item>
            <Container style={{ paddingTop: 15, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Content >
                <Button bordered style={{ width: 160, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
                  onPress={() => this.Submit()}
                >
                  <Text style={{ textAlign: 'center' }}>Submit</Text>
                </Button>
              </Content>

             
            </Container>
          </Form>
        </Content>
      </Container>
    );
  }
}