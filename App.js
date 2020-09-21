import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ReadStoryScreen from './Screens/ReadStoryScreen';
import WriteStoryScreen from './Screens/WriteStoryScreen';
import LoginScreen from './Screens/LoginScreen';

const tabNavigator = createBottomTabNavigator({
  "Read Story": {screen: ReadStoryScreen},
  "Write Story": {screen: WriteStoryScreen}
},
{
  defaultNavigationOptions: ({navigation})=>({tabBarIcon: ({focused})=>{
    const routeName = navigation.state.routeName;

    if(routeName == 'Read Story'){
      return (<Image source={require('./assets/read.png')}
      style={focused ? {width: 30, height: 30} : {width: 23, height: 23}} />)
    }
    else if(routeName == 'Write Story'){
      return (<Image source={require('./assets/write.png')}
      style={focused ? {width: 33, height: 33} : {width: 24, height: 24}} />)
    }
  }}),
  tabBarOptions:{activeTintColor: "#03b898"}
})

const switchNavigator = createSwitchNavigator({
  Login: {screen: LoginScreen},
  "Tab Navigator": {screen: tabNavigator},
})

const AppContainer = createAppContainer(switchNavigator);

export default class App extends React.Component {
  render(){
    return (
      <AppContainer />
    );
  }
}