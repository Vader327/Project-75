import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import db from '../config';

export default class ReadStoryScreen extends React.Component {
  constructor(){
    super();
    this.state={
      allStories: [],
      dataSource: [],
      search: "",
      lastVisibleStory: null,
    }
  }

  retriveStories=async()=>{
    var storiesRef = await db.collection('stories').startAfter(this.state.lastVisibleStory).limit(7).get();
    storiesRef.docs.map((doc)=>{
      this.setState({
        allStories: [...this.state.allStories, doc.data()],
        lastVisibleStory: doc
      })
    });
  }

  filterSearch=(searchText)=>{
    var results = this.state.allStories.filter((story)=>{
      return story.title.toUpperCase().indexOf(searchText.toUpperCase()) > -1;
    });
    this.setState({dataSource: results, search: searchText}); 
  }

  getAllStories=async()=>{
    var allStories = [];
    var storiesRef = await db.collection('stories').get();
    storiesRef.docs.map((doc)=>{
      allStories.push(doc.data())
    });
    this.setState({allStories: allStories})
  }

  componentDidMount=async()=>{
    var storiesRef = await db.collection('stories').limit(7).get();
    storiesRef.docs.map((doc)=>{
      this.setState({
        allStories: [...this.state.allStories, doc.data()],
        lastVisibleStory: doc,
      })
    });
  }

  render(){
    return (
      <View style={{backgroundColor: '#03b898', height:'100%'}}>
        <Header
        containerStyle={{backgroundColor: '#03b898', borderBottomWidth: 0}}
        centerComponent={{
          text: "Bedtime Stories",
          style:{
            color: "#ffffff",
            fontSize: 24,
            fontWeight: '600',
          }}} />
          
        <SearchBar placeholder="Search for Stories" round lightTheme
        containerStyle={{backgroundColor:'#03b898',borderBottomColor:'transparent',borderTopColor:'transparent'}}
        inputContainerStyle={{backgroundColor:'#ffffff', borderRadius: 50}}
        inputStyle={{color:'#000000'}}
        onChangeText={(text)=>{this.filterSearch(text)}} value={this.state.search} />

        <FlatList keyExtractor={(item, index)=>index.toString()}
        onEndReached={this.retriveStories}
        onEndReachedThreshold={0.7}
        data={this.state.search=="" ? this.state.allStories : this.state.dataSource}
        ListFooterComponent={()=>(
        <TouchableOpacity style={styles.submit} onPress={this.getAllStories}>
          <Text style={styles.submitText}>Refresh</Text>
        </TouchableOpacity>
        )}
        renderItem={({item, index})=>(
          <View style={styles.container} key={index.toString()}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>Author: {item.author}</Text>
          </View>
        )} />      
      </View>    
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#ffffff',
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 7,
    paddingLeft: 10,
  },
  title:{
    marginTop: 5,
    fontWeight: '500',
    fontSize: 20,
  },
  author:{
    marginTop: 5,
    marginBottom: 5,
    fontSize: 15,
  },
  submit:{
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    width: 120,
    borderRadius: 20,
    alignItems: 'center',
    padding: 7,
    marginTop: 20,
    marginBottom: 20,
  },
  submitText:{
    fontSize: 18,
    color: '#03b898',
    fontWeight: '600',
  }
})