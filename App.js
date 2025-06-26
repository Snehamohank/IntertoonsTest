import {Platform, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import App from './src/App';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { Colors } from './src/utils/Colors';
const Stack = createNativeStackNavigator();

const MainApp = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
       <App/>
       </SafeAreaView>
    </Provider>
  );
};

export default MainApp;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:Colors.red,
    paddingVertical:
      Platform.OS === 'android' && Platform.constants.Release >= 15
        ? StatusBar.currentHeight
        : 0,
  },
});
