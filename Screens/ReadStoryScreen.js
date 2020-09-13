import React from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';

export default class ReadStoryScreen extends React.Component {
  render(){
    return (
      <View>
        <Header
          containerStyle={{backgroundColor: '#03b898',}}
          centerComponent={{
            text: "Story Hub",
            style:{
              color: "#ffffff",
              fontSize: 24,
              fontWeight: '600',
            }}} />
      </View>    
    );
  }
}