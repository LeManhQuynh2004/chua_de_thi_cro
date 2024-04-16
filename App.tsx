import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './src/screen/HomeScreen';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import CartScreen from './src/screen/CartScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import StatisticalScreen from './src/screen/StatisticalScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Statistical" component={StatisticalScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <MyTabs />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
