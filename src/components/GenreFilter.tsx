// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const GenreFilter = ({ genres, onFilterChange }) => {
//   const [selectedGenres, setSelectedGenres] = useState([]);

//   const toggleGenre = (genreId) => {
//     let updatedSelectedGenres = [...selectedGenres];
//     if (updatedSelectedGenres.includes(genreId)) {
//       updatedSelectedGenres = updatedSelectedGenres.filter(id => id !== genreId);
//     } else {
//       updatedSelectedGenres.push(genreId);
//     }
//     setSelectedGenres(updatedSelectedGenres);
//     onFilterChange(updatedSelectedGenres);
//   };

//   return (
//     <View style={styles.container}>
//       {genres.map(genre => (
//         <TouchableOpacity
//           key={genre.id}
//           style={[styles.genreButton, selectedGenres.includes(genre.id) ? styles.selected : null]}
//           onPress={() => toggleGenre(genre.id)}
//         >
//           <Text style={styles.genreText}>{genre.name}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginVertical: 10,
//   },
//   genreButton: {
//     backgroundColor: '#ddd',
//     padding: 10,
//     borderRadius: 20,
//     margin: 5,
//   },
//   selected: {
//     backgroundColor: '#007bff',
//   },
//   genreText: {
//     color: '#fff',
//   },
// });

// export default GenreFilter;
