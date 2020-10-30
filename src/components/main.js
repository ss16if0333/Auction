import React, { Component } from 'react';
import { Platform, StyleSheet, Text,View, Button, ScrollView, TextInput, FlatList, ToastAndroid } from 'react-native';
import { Container, Header, Content, Badge, Icon,Item,Input } from 'native-base';
import axios from 'axios';
const host = '192.168.0.102'
export default class App extends Component {

  state = {
    data: [],
    name: '',
    bidValue:0,
    playerName : ''
  }

  onsubmit = async (id) => {
    let teamname = this.props.navigation.state.params.team;

    // console.log('submit');
    // console.log(this.state.name);
    var url = `http://${host}:4547/bid`;
    await axios.post(url, {
      teamname: teamname,
      topbid : this.state.bidValue,
      id : id
    })
      .then(function (response) {

        console.log('response',response);

      })
      .catch(function (error) {
        console.log('error', error);
      });

    // console.log(playerName)




  }


  fetchData = async () => {
    const response = await fetch(`http://${host}:4547/bidView`);
    const users = await response.json();
    this.setState({ data: users });
    // name={this.props.navigation.state.params.Name}
    // console.log(a);

  }
  componentDidMount() {
    this.fetchData();
  }

  componentWillUpdate() {
    this.fetchData();

  }

  componentWillMount() {
    this.fetchData();

  }

 


  render() {
    return (
      <ScrollView>
        <View >
        
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>

              <View style={{ backgroundColor: '#abc123', padding: 10, margin: 10 }}>
                <View>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>player name : {item.playername}</Text>
                  <Text style={{ color: '#fff' }}>initial bid : {item.initialbid}</Text>
                  <Text style={{ color: '#fff' }}> Team Name : {item.teamname}</Text>
                  <Text style={{ color: '#fff' }}>Top bid : {item.topbid}</Text>

                </View>
                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>

                <Item>
              <Input placeholder="Bid"
                onChangeText={(Bid) => this.setState({ bidValue: Bid })}
              />
            </Item>
              <Button
                title='submit'
                onPress={() => this.onsubmit(item.id)}
              />
            </View>
              </View>

            }

          />
        </View>
      </ScrollView>
    );
  }
}