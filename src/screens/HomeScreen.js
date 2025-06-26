import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Header from '../component/Header';
import Banner from '../component/banner';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getBanners, getHomepageData} from '../redux/slices/productSlice';
import SearchView from '../component/SearchView';
import {Colors} from '../utils/Colors';
import LatestProducts from '../component/LatestProducts';
const {width} = Dimensions.get('window');

const Home = () => {
  const dispatch = useDispatch();
  const {banners, productLists, loading, error} = useSelector(
    state => state.products,
  );


  useEffect(() => {
    dispatch(getHomepageData());
    dispatch(getBanners());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white}
        translucent={false}
        hidden={false}
      />
      <Header menu={true} logoTitle={true} />
      <SearchView />

      <ScrollView>
        <Banner banners={banners} />

        <View style={styles.content}>
          {productLists?.map(item => (
            <LatestProducts
              key={item?.title}
              items={item?.items}
              category={item?.title}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  profileContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
