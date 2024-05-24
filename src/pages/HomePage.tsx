import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from "@material-tailwind/react";

const HomePage = () => {
  return (
    <View style={{ }}>
      {/* Header */}
      <View style={{ height: 60, backgroundColor: '#333', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text style={{ fontSize: 20,marginLeft:10,fontWeight:'bold', color: 'red' }}>MOVIEFIX</Text>
      </View>
      {/* Tab bar */}
      <ScrollView horizontal={true} style={{ backgroundColor: '#333' }}>
        <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => console.log("All clicked")} style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: 'white',width:40,backgroundColor:'#222',padding:10,borderRadius:5}}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Action clicked")} style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: 'white' }}>Action</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Comedy clicked")} style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: 'white' }}>Comedy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Horror clicked")} style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: 'white' }}>Horror</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Drama clicked")} style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: 'white' }}>Drama</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Sci-Fi clicked")} style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: 'white' }}>Sci-Fi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Content area */}
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18 }}>2012</Text>
          <Text style={{ fontSize: 16 }}>Title</Text>
          <Text style={{ fontSize: 16 }}>Title</Text>
          {/* Add more content here */}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePage;
