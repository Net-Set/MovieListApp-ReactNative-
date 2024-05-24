import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, useColorScheme } from 'react-native';

const MovieDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const colorScheme = useColorScheme(); // Get the current color scheme

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = () => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2023&page=${page}&vote_count.gte=100`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(prevMovies => [...prevMovies, ...data.results]);
        setLoading(false);
        setIsFetchingMore(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setIsFetchingMore(false);
      });
  };

  const handleLoadMore = () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.movieContainer}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={[styles.movieTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>{item.title}</Text>
      <Text style={[styles.movieOverview, { color: colorScheme === 'dark' ? '#dddddd' : '#666666' }]} numberOfLines={3}>{item.overview}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#f4f4f4' }]}>
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.content}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    paddingBottom: 20,
  },
  movieContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    margin: 10,
    textAlign: 'center',
  },
});

export default MovieDetailsPage;
