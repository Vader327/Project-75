import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableHighlight } from 'react-native';
import { Header } from 'react-native-elements';

export default class WriteStoryScreen extends React.Component {
  constructor(){
    super();
    this.state={
      submitFocus: false,
    }
  }
  render(){
    return (
      <View style={{height: '100%'}}>
        <Header
          containerStyle={{backgroundColor: '#03b898',}}
          centerComponent={{
            text: "Story Hub",
            style:{
              color: "#ffffff",
              fontSize: 24,
              fontWeight: '600',
            }}} />
          <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
            <View>
              <TextInput style={styles.input} placeholder="Story Title" />
              <TextInput style={styles.input} placeholder="Author" />            
              <TextInput style={styles.input} placeholder="Write your story" multiline={true}  />
            </View>
          </TouchableWithoutFeedback>

          <TouchableHighlight style={styles.submit} underlayColor='#03b898' onPress={()=>{}}
          onShowUnderlay={()=>{this.setState({submitFocus: true})}}
          onHideUnderlay={()=>{this.setState({submitFocus: false})}}>
            <Text style={this.state.submitFocus ? [styles.submitText, {color: '#ffffff'}] : styles.submitText}>
              Submit
            </Text>
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input:{
    borderBottomColor: '#03b898',
    borderBottomWidth: 3,
    width: 300,
    marginTop: 30,
    alignSelf: 'center',
    fontSize: 18,
  },
  submit:{
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderColor: '#03b898',
    borderWidth: 3,
    width: 120,
    borderRadius: 20,
    alignItems: 'center',
    padding: 7,
  },
  submitText:{
    fontSize: 18,
    color: '#03b898',
    fontWeight: '600',
  }
})