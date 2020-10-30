import React, { Component } from 'react';
import {

} from 'react-native'
import { Container, Header, Content, Form, Item, Input,Button,Text } from 'native-base';
import {createDrawerNavigator,createStackNavigator,createSwitchNavigator,DrawerItems} from 'react-navigation'
import {host} from '../action'
import axios from 'axios'
export default class Register extends Component {
  constructor(){
    super();
    this.state={
      teamName:'',
      password:'',

    }
    this.Register=this.Register.bind(this)
  }

  Register=async()=>{
    var url = `http://${host}:4547/register`;
   await axios.post(url, {
      teamName: this.state.teamName,
      password : this.state.password
    })
    .then(function (response) {
      console.log('response',response);

    
   
    })
    .catch(function (error) {
      console.log('error',error);
    });
}
  render() {
    return (
      <Container style={{paddingTop : 50}}>
      <Content>
        <Form>
          <Item>
            <Input placeholder="Username" 
            onChangeText={(teamName)=>this.setState({teamName : teamName})}
            />
          </Item>
          <Item last>
            <Input placeholder="Password" 
               onChangeText={(password)=>this.setState({password : password})}
               secureTextEntry

            />
          </Item>
          <Container style={{paddingTop : 15,justifyContent : 'center',alignContent : 'center',alignItems:'center' }}>
          <Content >
          <Button bordered style={{width : 160,justifyContent : 'center',alignContent : 'center',alignItems:'center'}}
          onPress={()=>this.Register()}
          >
          <Text style={{textAlign:'center'}}>Register</Text>
        </Button>
        </Content>

        <Content style={{paddingTop: 20}}>
          <Text onPress={()=>{  this.props.navigation.navigate('Login');}}>Click to login</Text>
        </Content>
        </Container>
        </Form>
      </Content>
    </Container>
    );
  }
}