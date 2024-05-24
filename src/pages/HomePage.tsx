import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);



  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>MOVIEFIX</Text>
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

     


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#333',
    
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginLeft:20,
  },
  tabBar: {
    backgroundColor: '#333',
    marginBottom:20 ,
  },
  tab: {
    paddingHorizontal: 20,
  },
  tabText: {
    color: 'white',
  },
  content: {
    
    padding: 20,
  },
  movieContainer: {
    marginBottom: 20,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieOverview: {
    fontSize: 16,
  },
});

export default HomePage;
