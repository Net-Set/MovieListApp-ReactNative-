import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, useColorScheme } from 'react-native';

const MovieDetailsPage = ({ genre }) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const colorScheme = useColorScheme(); // Get the current color scheme

  useEffect(() => {
    setMovies([]);
    setPage(1);
    fetchMovies(1, genre);
  }, [genre]);

  useEffect(() => {
    if (page > 1) fetchMovies(page, genre);
  }, [page]);

  const fetchMovies = (page, genre) => {
    setLoading(true);
    const endpoint =
      genre === 'All'
        ? `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2023&page=${page}&vote_count.gte=100`
        : `https://api.themoviedb.org/3/search/movie?api_key=2dca580c2a14b55200e784d157207b4d&query=${genre}&page=${page}`;

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setMovies((prevMovies) => (page === 1 ? data.results : [...prevMovies, ...data.results]));
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
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.movieContainer}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={[styles.movieTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>{item.title}</Text>
      <Text style={[styles.movieRating, { color: colorScheme === 'dark' ? '#dddddd' : '#666666' }]}>Rating: {item.vote_average}</Text>
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
    flex: 100,
    padding: 20,
  },
  content: {
    paddingBottom: 20,
  },
  movieContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#33333399',
    borderRadius: 10,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
      marginLeft:10,
  },
  movieImage: {
    width: '100%',
    height: 200,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'left',
    marginLeft:10,
  },
  movieRating: {
    fontSize: 10,
    marginBottom: 10,
    textAlign: 'left',
    marginLeft:10,
  },
});

export default MovieDetailsPage;
