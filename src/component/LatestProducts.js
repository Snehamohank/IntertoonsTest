import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Animated,
} from 'react-native';

import React, {useEffect, useState, useRef, use} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../utils/Colors';
import Starimg from '../assets/Star.png';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
// import {getProducts} from '../redux/slices/productSlice';

const ProductCard = ({item, onAddToCart, onToggleWishlist, isWishlisted}) => {
  const navigation = useNavigation();
  const {name, image, price, rating} = item;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const baseUrl = 'http://omanphone.smsoman.com/pub/media/catalog/product';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', {id: item.id})}>
      <View style={{position: 'relative', width: '100%', alignItems: 'center'}}>
        {/* Product Image */}
        <Animated.Image
          style={[styles.image, {opacity: fadeAnim}]}
          resizeMode="cover"
          source={{uri: `${baseUrl}${image}`}}
          onLoad={() => {
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start();
          }}
        />

        {/* GB Badge */}
        <View style={styles.gbBadge}>
          <Text style={styles.gbText}>128 GB</Text>
        </View>

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Image
            source={Starimg}
            tintColor={Colors.white}
            resizeMethod="cover"
            style={{width: 10, height: 10}}
          />
          <Text style={styles.ratingText}>{rating?.rate ?? '4.0'}</Text>
        </View>
      </View>

      {/* Product Details */}
      <View style={styles.cardContent}>
        <Text numberOfLines={2} style={styles.title}>
          {name}
        </Text>
      </View>
      <View style={styles.pricecontext}>
        <Text style={styles.price}>OMR {price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const LatestProducts = ({items, category}) => {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginVertical: 10, 
        }}>
       <View style={{width:'70%'}}>
        <Text style={styles.headertext}>{category || 'Mobile Phones'}</Text>
       </View>
        <TouchableOpacity
          // onPress={() => navigation.navigate('ProductDetails')}
          style={styles.button}>
          <Text style={styles.buttontext}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{}}
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ProductCard item={item} />}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 16}}
        ListFooterComponent={<View style={{height: 30}} />}
      />
    </View>
  );
};

export default LatestProducts;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
  },

  headertext: {
    fontSize: 17,
    fontWeight: '600',
  },
  button: {
    backgroundColor: Colors.red,
    paddingHorizontal: 10,
    height: 30,
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttontext: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  image: {
    marginTop: 5,
    height: 120,
    width: '75%',
    resizeMode: 'cover',
  },
  cardContent: {
    paddingTop: 10,
    height:50,
    paddingHorizontal:10
  },
  pricecontext: {
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: '600',
    fontSize: 13,
    color:'#808080'
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.red,
  },

  gbBadge: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  gbText: {
    color: Colors.red,
    fontSize: 10,
    fontWeight: 'bold',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    backgroundColor: Colors.orange,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
