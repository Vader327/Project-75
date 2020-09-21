import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Image } from 'react-native';
import { Header } from 'react-native-elements';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
	constructor(){
		super();
		this.state={
			email: '',
			password: '',
		}
	}

	login=async(email, password)=>{
		if(email && password){
			try{
				const response = await firebase.auth().signInWithEmailAndPassword(email, password);
				if(response){
					this.props.navigation.navigate("Read Story");
				}
			}
			catch(error){
				switch(error.code){
					case 'auth/user-not-found':
						Alert.alert("User does not exist!");
						break;

					case 'auth/invalid-email':
						Alert.alert("Incorrect Email ID or Password!");
						break;

					case 'auth/wrong-password':
						Alert.alert("Incorrect Email ID or Password!");
						break;
										
					default:
						Alert.alert("Error");
						break;
				}
			}			
		}
		else{
			Alert.alert("Please enter your Email ID and Password!");
		}
	}

	signUp=async(email, password)=>{
		if(email && password){
			try{
				const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
				if(response){
					this.props.navigation.navigate("Read Story");
				}
			}
			catch(error){
				switch(error.code){
					case 'auth/weak-password':
						Alert.alert("Password is too weak!");
						break;
					
					case 'auth/email-already-in-use':
						Alert.alert("Email already in use!");
						break;
										
					default:
						Alert.alert("Error");
						break;
				}
			}			
		}
		else{
			Alert.alert("Please enter your Email ID and Password!");
		}
	}

	render(){
		return(
			<KeyboardAvoidingView behavior="position" enabled style={{backgroundColor: '#03b898', height: '100%'}}>
				<Header
        containerStyle={{backgroundColor: '#03b898', borderBottomWidth: 0}}
        centerComponent={{
          text: "Bedtime Stories",
          style:{
            color: "#ffffff",
            fontSize: 24,
            fontWeight: '600',
          }}} />

				<Image source={require('../assets/image.jpg')}
				style={styles.img} />

				<View style={{marginTop: 20,}}>
					<TextInput 
					style={styles.inputBox}
					placeholder="Email ID"
					keyboardType="email-address"
					onChangeText={(text)=>{this.setState({email: text})}} />

					<TextInput 
					style={styles.inputBox}
					placeholder="Password"
					secureTextEntry={true}
					onChangeText={(text)=>{this.setState({password: text})}} />
				</View>

				<TouchableOpacity style={styles.submitButton}
				onPress={()=>{this.login(this.state.email, this.state.password)}}>
					<Text style={styles.submitText}>Login</Text>
				</TouchableOpacity>

				<TouchableOpacity style={{marginTop: 10,}}
				onPress={()=>{this.signUp(this.state.email, this.state.password)}}>
					<Text style={styles.submitText}>No account? Sign Up</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	inputBox:{
		backgroundColor: '#00a688',
		color: '#ffffff',
		width: '90%',
		height: 50,
		marginTop: 30,
		borderRadius: 50,
		paddingHorizontal: 15,
    alignSelf: 'center',
    fontSize: 18,
	},
	submitButton:{
		backgroundColor:"#00a688",
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		width: 120,
		padding: 10,
		borderRadius: 50,
		marginTop: 20,
	},
	submitText:{
		fontSize: 20,
		textAlign: 'center',
		fontWeight: '600',
		color: 'white',
	},
	img:{
		width: 173,
		height: 179,
		borderRadius: 25,
		alignSelf: 'center',
		marginTop: 30,
	}
});