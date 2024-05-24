import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
// import MovieCard from './MovieCard';
import GenreFilter from '../components/GenreFilter';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(2012);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    fetchMovies(year, page);
    fetchGenres();
  }, []);

  const fetchMovies = async (year: number, page: number) => {
    setLoading(true);
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${year}&page=${page}&vote_count.gte=100`);
    setMovies(prevMovies => [...prevMovies, ...response.data.results]);
    setLoading(false);
  };

  const fetchGenres = async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d`);
    setGenres(response.data.genres);
  };

  const handleEndReached = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchMovies(year, newPage);
  };

  const filterMoviesByGenre = (selectedGenres: number[]) => {
    setSelectedGenres(selectedGenres);
    // Implement logic to filter movies by selected genres
  };

  return (
    <View style={styles.container}>
      <GenreFilter genres={genres} onFilterChange={filterMoviesByGenre} />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default HomePage;
