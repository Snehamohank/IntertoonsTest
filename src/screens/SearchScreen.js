import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../component/Header';

const SearchScreen = () => {
  return (
    <View View style={{flex: 1,}}>
      <Header title={'Search Screen'} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>SearchScreen</Text>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
