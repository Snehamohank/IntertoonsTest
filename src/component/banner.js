import React, {useRef} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const {width} = Dimensions.get('window');
const bannerHeight = 230;

const Banner = ({banners}) => {
  const carouselRef = useRef(null);

  const renderItem = ({item}) => (
    <View style={styles.imageContainer} key={item?.id}>
      <Image source={{uri: item?.image}} style={styles.image} />
    </View>
  );

  return (
    <View style={{}}>
      <Carousel
        ref={carouselRef}
        data={banners}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        // autoplay={true}
        // loop={true}
        // autoplayDelay={1000}
        // autoplayInterval={3000}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        enableMomentum={false}
        lockScrollWhileSnapping={true}
      />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  imageContainer: {
    // borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: width,
    height: bannerHeight,
    resizeMode: 'cover',
    // borderRadius: 10,
  },
});
