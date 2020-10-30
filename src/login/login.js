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
      teamName: '',
      password: '',
      response: 0,
      confirmPasswd : null
    }
    

    this.Login = this.Login.bind(this)
  }

  Login = async () => {
    console.log(" it is the changed password for the old password",this.state.confirmPasswd)
    var resp;
    var data;
    var url = `http://${host}:4547/login`;
    await axios.post(url, {
      teamName: this.state.teamName,
      password: this.state.password
    })
      .then(function (response) {
        console.log('response', response.data.code);
          resp=response.data.code;
          data =response.config.data;
          console.log(response);

      })
      .catch(function (error) {
        console.log('error', error);
      });

      if (resp == 1) {
           
    await    this.props.navigation.navigate('Tb',
        {
          
          team:this.state.teamName,
        }
        );
  
        console.log('success');
  
      }
      else if (resp == 0) {
        // this.props.navigation.navigate('Home');

        console.log('invalid')
      }

  }
  render() {
    return (
      <Container style={{ paddingTop: 50 }}>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Username"
                onChangeText={(teamName) => this.setState({ teamName: teamName })}
              />
            </Item>
            <Item last>
              <Input placeholder="Password"
                onChangeText={(password) => this.setState({ password: password })}
                secureTextEntry

              />
            </Item>
            <Container style={{ paddingTop: 15, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Content >
                <Button bordered style={{ width: 160, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
                  onPress={() => this.Login()}
                >
                  <Text style={{ textAlign: 'center' }}>Login</Text>
                </Button>
              </Content>

              <Content style={{ paddingTop: 20 }}>
                <Text onPress={() => { this.props.navigation.navigate('Register'); }}>Click to Register</Text>
              </Content>
            </Container>
          </Form>
        </Content>
      </Container>
    );
  }
}