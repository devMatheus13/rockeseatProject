import React from 'react';
import {createStackNavigator}  from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
const Stack = createStackNavigator();

import './config/StatusBar';

import home from './pages/home'

function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"  screenOptions={{
        headerStyle: {
          backgroundColor: '#DA552F',
         
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center'
      }}>
          <Stack.Screen options={{ title: 'JSHunter'}} name="Home" component={home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default App;