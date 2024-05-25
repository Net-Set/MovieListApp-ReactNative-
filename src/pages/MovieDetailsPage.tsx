import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, useColorScheme, TouchableOpacity } from 'react-native';
import { BackHandler } from 'react-native';
import { Linking } from 'react-native';

const MovieDetailsPage = ({ genre }) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [year, setYear] = useState(2012); // Default year
  const colorScheme = useColorScheme();

  useEffect(() => {
    setMovies([]);
    setPage(1);
    fetchMovies(year, 1, genre);
  }, [genre, year]);

  useEffect(() => {
    if (page > 1) fetchMovies(year, page, genre);
  }, [page]);

  useEffect(() => {
    // Update year to 2012 whenever a new genre is selected
    setYear(2012);
  }, [genre]);

  const fetchMovies = (year, page, genre) => {
    setLoading(true);
    const endpoint =
      genre === 'All'
        ? `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31&sort_by=popularity.desc&page=${page}&vote_count.gte=100`
        : `https://api.themoviedb.org/3/search/movie?api_key=2dca580c2a14b55200e784d157207b4d&query=${genre}&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31&page=${page}`;

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

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => backHandler.remove();
  }, [selectedMovie]);

  const handleBack = () => {
    if (selectedMovie) {
      setSelectedMovie(null);
      setMovieDetails(null);
    } else {
      Linking.reload();
    }
  };

  const handleLoadMore = () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    fetchMovieDetails(movie.id);
  };

  const fetchMovieDetails = (movieId) => {
    const endpoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=2dca580c2a14b55200e784d157207b4d`;

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const windowHeight = event.nativeEvent.layoutMeasurement.height;

    if (offsetY === 0 && !isFetchingMore && year > 2012) {
      setYear((prevYear) => prevYear - 1);
      setPage(1);
    } else if (offsetY + windowHeight >= contentHeight && !isFetchingMore && year < new Date().getFullYear()) {
      setYear((prevYear) => prevYear + 1);
      setPage(1);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.movieContainer} onPress={() => handleSelectMovie(item)}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={[styles.movieTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>{item.title}</Text>
      <Text style={[styles.movieRating, { color: colorScheme === 'dark' ? '#dddddd' : '#666666' }]}>Rating: {item.vote_average.toFixed(1)}</Text>
    </TouchableOpacity>
  );

  const renderMovieDetails = () => (
    <View style={styles.movieDetailsContainer}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.imageCover}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/original${selectedMovie.poster_path}` }}
          style={styles.fullCoverImage}
        />
      </View>

      <Text style={[styles.movieTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>
        {selectedMovie.title}
      </Text>
      <Text style={[styles.movieRating, { color: colorScheme === 'dark' ? '#dddddd' : '#666666' }]}>
      Rating: {selectedMovie.vote_average.toFixed(1)}
      </Text>
      <Text style={styles.movieDetailsTitle}>{selectedMovie.title}</Text>
      <Text style={styles.movieDetailsOverview}>{selectedMovie.overview}</Text>
      {movieDetails && (
        <View>
          <Text>Runtime: {movieDetails.runtime} minutes</Text>
          <Text>Release Date: {movieDetails.release_date}</Text>
          <Text>Genres: {movieDetails.genres.map(genre => genre.name).join(', ')}</Text>
          <Text>Overview: {movieDetails.overview}</Text>
          <Text>Vote Average: {movieDetails.vote_average}</Text>
          <Text>Vote Count: {movieDetails.vote_count}</Text>
        </View>
      )}
    </View>
  );
  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#f4f4f4' }]}>
   <TouchableOpacity style={styles.yearButton} onPress={() => alert('Year button pressed')}>
  <Text style={[styles.yearText, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>
    {year}
  </Text>
</TouchableOpacity>

      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : selectedMovie ? (
        renderMovieDetails()
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.content}
          onScroll={handleScroll}
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
  yearButton: {
    
    borderRadius: 5,
    alignItems: 'center', // Center the text vertically
    justifyContent: 'center', // Center the text horizontally
    width: '20%', // Occupy one-sixth of the screen width
    marginVertical: 3, // Add some vertical margin
    paddingVertical: 5, // Add some padding to the top and bottom
  },
  yearText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Text color for the year button
  },
  imageCover: {
    width: '100%',
    height: 400,
    padding: 10,
  },
  fullCoverImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
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
    marginLeft: 10,
  },
  movieRating: {
    fontSize: 10,
    marginBottom: 10,
    textAlign: 'left',
    marginLeft: 10,
  },
  movieDetailsContainer: {
    flex: 1,
    padding: 10,
  },
  movieDetailsOverview: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default MovieDetailsPage;
