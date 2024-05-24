import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Simulating an API call with setTimeout, replace this with your fetch API call
    setTimeout(() => {
      const fetchedMovies = [
        {
          "id": 940721,
          "title": "Godzilla Minus One",
          "overview": "Postwar Japan is at its lowest point when a new crisis emerges in the form of a giant monster, baptized in the horrific power of the atomic bomb.",
          "poster_path": "/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg"
        },
        {
          "id": 1094844,
          "title": "Ape vs. Mecha Ape",
          "overview": "Recognizing the destructive power of its captive giant Ape, the military makes its own battle-ready A.I., Mecha Ape. But its first practical test goes horribly wrong, leaving the military no choice but to release the imprisoned giant ape to stop the colossal robot before it destroys downtown Chicago.",
          "poster_path": "/dJaIw8OgACelojyV6YuVsOhtTLO.jpg"
        },
        {
          "id": 872585,
          "title": "Oppenheimer",
          "overview": "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
          "poster_path": "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
        }
        // Add more movies here...
      ];
      setMovies(fetchedMovies);
      setLoading(false);
    }, 2000);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.movieContainer}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.movieOverview}>{item.overview}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.content}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  content: {
    paddingBottom: 20,
  },
  movieContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
  },
  movieImage: {
    width: '100%',
    height: 200,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  movieOverview: {
    fontSize: 14,
    color: '#666',
    margin: 10,
    textAlign: 'center',
  },
});

export default App;
