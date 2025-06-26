import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens


import { Colors } from './utils/Colors';
import ProductDetails from './screens/ProductDetails';
import SearchScreen from './screens/SearchScreen';
import CategoryScreen from './screens/CategoryScreen';
import SplashScreen from './screens/Splashscreen';
import Home from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';

// Icon Images
const homeIcon = require('../src/assets/home.png');
const Category = require('../src/assets/menu1.png');
const Carticon = require('../src/assets/Cartimg.png');
const searchIcon = require('../src/assets/search.png');


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {fontSize: 12, fontWeight: '600'},
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={homeIcon}
              style={[
                styles.icon,
                {tintColor: focused ? Colors.red : Colors.lightgrey},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={searchIcon}
              style={[
                styles.icon,
                {tintColor: focused ? Colors.red : Colors.lightgrey},
              ]}
            />
          ),
        }}
      />
       <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={Category}
              style={[
                styles.icon,
                {tintColor: focused ? Colors.red : Colors.lightgrey},
              ]}
            />
          ),
        }}
      />
       <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={Carticon}
              style={[
                styles.icon,
                {tintColor: focused ? Colors.red : Colors.lightgrey},
              ]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Tabs" component={HomeTabs} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
