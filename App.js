import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, View, Input, Button } from 'native-base';
import { createDrawerNavigator, createBottomTabNavigator,createStackNavigator, createSwitchNavigator, DrawerItems } from 'react-navigation'
import Login from './src/login/login'
import Register from './src/register/register'
import Home from './src/components/main'
import Add from './src/components/add'
const Tb=createBottomTabNavigator({
  Home : { screen : Home},
  Add:{screen : Add}
 })

const St = createStackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  Tb : {screen : Tb}

}, {
  initialRouteName: 'Login',

  navigationOptions: {
    style: {


    },
    headerStyle: {


    },
    headerTransparent: true
  }
});



// const St2=createStackNavigator({
//   Tb : {screen : Tb} ,
// },{
//   // initialRouteName: 'Tb',

//   navigationOptions: {
//     style: {


//     },
//     headerStyle: {


//     },
//     headerTransparent: true
//   }
// })

const Sw=createSwitchNavigator({
  St,
  // St2
})

export default class App extends Component {
  render() {
    return (
      <St />
    );
  }
}