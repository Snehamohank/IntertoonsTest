import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Search from '../assets/search.png';
import { Colors } from '../utils/Colors';

const SearchView = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.red,
        height: 60,
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>
      <View
        style={{
          backgroundColor:Colors.white,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center', paddingHorizontal:10
        }}>
        <Image
          source={Search}
          // tintColor={'#6C6C6C'}
          resizeMethod="cover"
          style={{width: 20, height: 20, marginBottom: 5, marginRight: 3,top:3}}
        />
        <TextInput placeholder="Search Products" placeholderTextColor={Colors.grey1}/>
      </View>
    </View>
  );
};

export default SearchView;

const styles = StyleSheet.create({});
