import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/pages/HomePage';
import MovieDetailsPage from './src/pages/MovieDetailsPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
