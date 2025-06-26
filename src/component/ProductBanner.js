import React, {useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Like from '../assets/like2.png';
import bannerimg from '../assets/banner.png';
import {Colors} from '../utils/Colors';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const bannerHeight = height/2.5;

const ProductBanner = ({bannerImages}) => {
  console.log('bannerImages ==>', bannerImages);
  
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({item}) => (
    <View style={styles.slide}>
      <Image source={{uri: item}} style={styles.image} />

      <View style={styles.likeContainer}>
        <Image
          source={Like}
          tintColor={Colors.lightgrey}
          style={styles.likeIcon}
        />
      </View>
    </View>
  );

  return (
    <View>
      <Carousel
        ref={carouselRef}
        data={bannerImages}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={index => setActiveSlide(index)}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        enableMomentum={false}
        lockScrollWhileSnapping={true}
      />

      <Pagination
        dotsLength={bannerImages?.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.activeDot}
        inactiveDotStyle={styles.inactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default ProductBanner;

const styles = StyleSheet.create({
  slide: {
    marginTop:15,
    width: width,
    height: bannerHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width / 2,
    height: bannerHeight,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  likeContainer: {
    position: 'absolute',
    top: 15,
    right: 25,
    padding: 6,
  },
  likeIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.red,
  },
  inactiveDot: {
    backgroundColor: Colors.lightgrey,
  },
});