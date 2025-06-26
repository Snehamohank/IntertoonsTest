import React from 'react';
import {FlatList, Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../utils/Colors';
import StorageIcon from '../assets/Cartimg.png';

const features = [
  {id: '1', label: '128 GB', icon: StorageIcon},
  {id: '2', label: '5000 mAh', icon: StorageIcon},
  {id: '3', label: '20 MP', icon: StorageIcon},
  {id: '4', label: '8 GB', icon: StorageIcon},
  {id: '5', label: '6.1"', icon: StorageIcon},
  {id: '6', label: 'Snapdragon', icon: StorageIcon},
];

const numColumns = 3;

const ProductFeaturesBox = ({features}) => {
  const renderItem = ({item}) => (
    <View style={styles.featureItem}>
      <Image source={{uri: item.icon}} tintColor={'#000'} style={styles.icon} />
      <Text style={styles.label}>{item.value}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={['#ffffff', '#f2f2f2']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <FlatList
        data={features}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        scrollEnabled={false}
        columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 12}}
      />
    </LinearGradient>
  );
};

export default ProductFeaturesBox;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  featureItem: {
    alignItems: 'center',
    height:60,
    width: Dimensions.get('window').width / 3.5,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
