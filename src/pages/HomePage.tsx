import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MovieDetailsPage from './MovieDetailsPage'; // Import the MovieDetailsPage

const HomePage: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>MOVIEFIX</Text>
      </View>

      {/* Tab bar */}
      <ScrollView horizontal={true} style={styles.tabBar}>
        <View style={styles.tabBarContent}>
          {['All', 'Action', 'Comedy', 'Horror', 'Drama', 'Sci-Fi'].map((genre) => (
            <TouchableOpacity
              key={genre}
              onPress={() => setSelectedGenre(genre)}
              style={[styles.tab, selectedGenre === genre && styles.activeTab]}
            >
              <Text style={[styles.tabText, selectedGenre === genre && styles.activeTabText]}>
                {genre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Movie Details Page */}
      <MovieDetailsPage genre={selectedGenre} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginLeft: 30,
  },
  tabBar: {
    backgroundColor: '#333',
  },
  tabBarContent: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 20,
  },
  tabText: {
    color: 'white',
  },
  activeTab: {
    backgroundColor: '#222',
    borderRadius: 5,
  },
  activeTabText: {
    color: 'white',
    padding: 10,
  },
});

export default HomePage;
