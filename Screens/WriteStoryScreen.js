import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableHighlight, Alert, KeyboardAvoidingView, ToastAndroid, Platform } from 'react-native';
import { Header } from 'react-native-elements';
import * as firebase from 'firebase';
import db from '../config';

export default class WriteStoryScreen extends React.Component {
  constructor(){
    super();
    this.state={
      submitFocus: false,
      title: '',
      author: '',
      story: "",
    }
  }

  submitStory=()=>{
    if(this.state.title.trim() !== '' && this.state.author.trim() !== '' && this.state.story.trim() !== ''){
      db.collection('stories').add({
        'title': this.state.title,
        'author': this.state.author,
        'story': this.state.story,
        'date': firebase.firestore.Timestamp.now().toDate(),
      })
      this.setState({title: '', author: '', story: ""});

      Platform.OS == "ios"
      ? Alert.alert("Thank you for submitting a story!")
      : ToastAndroid.show("Thank you for submitting a story!", ToastAndroid.SHORT);
    }
    if(this.state.title.trim() === '' && this.state.author.trim() === '' && this.state.story.trim() === ""){
      Platform.OS == "ios"
      ? Alert.alert("Please type something!")
      : ToastAndroid.show("Please type something!", ToastAndroid.SHORT);
    }
    else if(this.state.title.trim() === ''){
      Platform.OS == "ios"
      ? Alert.alert("Please enter a story title!")
      : ToastAndroid.show("Please enter a story title!", ToastAndroid.SHORT);
    }
    else if(this.state.author.trim() === ''){
      Platform.OS == "ios"
      ? Alert.alert("Please enter the author name!")
      : ToastAndroid.show("Please enter the author name!", ToastAndroid.SHORT);
    }
    else if(this.state.story.trim() === ""){
      Platform.OS == "ios"
      ? Alert.alert("Please enter your story!")
      : ToastAndroid.show("Please enter your story!", ToastAndroid.SHORT);
    }
  }

  render(){
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={{height: '100%', flex:1}}>
        <Header
        containerStyle={{backgroundColor: '#03b898',}}
        centerComponent={{
          text: "Bedtime Stories",
          style:{
            color: "#ffffff",
            fontSize: 24,
            fontWeight: '600',
        }}} />

        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
        <View style={{height:'100%'}}>
          <TextInput style={styles.input} placeholder="Story Title"
          value={this.state.title} onChangeText={(text)=>{this.setState({title: text})}} />

          <TextInput style={styles.input} placeholder="Author"
          value={this.state.author} onChangeText={(text)=>{this.setState({author: text})}} />            

          <TextInput style={styles.input} placeholder="Write your story" multiline={true}
          value={this.state.story} onChangeText={(text)=>{this.setState({story: text})}} />         
        </View>
        </TouchableWithoutFeedback>		

        <TouchableHighlight style={styles.submit} underlayColor='#03b898' onPress={this.submitStory}
        onShowUnderlay={()=>{this.setState({submitFocus: true})}}
        onHideUnderlay={()=>{this.setState({submitFocus: false})}}>
          <Text style={this.state.submitFocus?[styles.submitText,{color:'#ffffff'}]:styles.submitText}>Submit</Text>
        </TouchableHighlight>

      </KeyboardAvoidingView>   
    );
  }
}

const styles = StyleSheet.create({
  input:{
    borderBottomColor: '#03b898',
    borderBottomWidth: 3,
    width: '90%',
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