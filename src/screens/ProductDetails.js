import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Header from '../component/Header';
import ProductBanner from '../component/ProductBanner';
import ProductFeaturesBox from '../component/ProductFeatureBox';
import {Colors} from '../utils/Colors';
import Starimg from '../assets/Star.png';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductDetails} from '../redux/slices/productSlice';
import {addToCart, selectCartItems} from '../redux/slices/cartSlice';
import RenderHTML from 'react-native-render-html';

const ProductDetails = ({route, navigation}) => {
  const {id} = route?.params;
  const [showDescription, setShowDescription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inCart, setInCart] = useState(false);
  const [selectedOptionPrice, setSelectedOptionPrice] = useState(null);
  const {details} = useSelector(state => state?.products);
  const cartItems = useSelector(selectCartItems);
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(fetchProductDetails(id))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [id]);
  console.log('id', id);
  useEffect(() => {
    if (details && details.option_prices?.length > 0) {
      setSelectedOptionPrice(details.option_prices[0].price);
    }
    if (details && cartItems) {
      const itemInCart = cartItems.find(item => item.id === details.id);
      setInCart(!!itemInCart);
    }
  }, [details, cartItems]);

  const handleAddToCart = () => {
    if (details) {
      dispatch(
        addToCart({
          id: details.id,
          name: details.name,
          price: details.price ? details.price : selectedOptionPrice,
          image: details.image[0],
        }),
      );
      Alert.alert('Success', 'Product added to cart!');
    }
  };

  const handleBuyNow = () => {
    navigation.navigate('Cart');
  };

  if (loading) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.red}
          translucent={false}
          hidden={false}
        />
        <Header title={'Item Details'} />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.red} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.red}
        translucent={false}
        hidden={false}
      />
      <Header title={'Item Details'} />
      <ScrollView style={styles.scrollView}>
        <ProductBanner bannerImages={details?.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{details?.name}</Text>

          <View style={styles.ratingBadge}>
            <Image
              source={Starimg}
              tintColor={Colors.white}
              style={styles.starIcon}
            />
            <Text style={styles.ratingText}>4.0</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.newPrice}>
              OMR {details.price ? details.price : selectedOptionPrice}
            </Text>
            <Text style={styles.oldPrice}>
              OMR{details.price ? details.price : selectedOptionPrice}
            </Text>
          </View>

          <ProductFeaturesBox features={details?.attrs?.specs} />

          <View style={{marginTop: 20, marginBottom: 100}}>
            <Text style={styles.aboutTitle}>About Product</Text>

            {!showDescription && (
              <TouchableOpacity
                style={styles.viewDetailsWrapper}
                onPress={() => setShowDescription(true)}>
                <Text style={styles.viewDetailsText}>View details...</Text>
              </TouchableOpacity>
            )}

            {showDescription && (
              <Text style={styles.description}>
                <RenderHTML
                  contentWidth={width}
                  source={{html: details?.description}}
                />
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.cartButtonWrapper}>
        {inCart ? (
          <TouchableOpacity
            style={[styles.cartButton, styles.buyNowButton]}
            onPress={handleBuyNow}>
            <Text style={styles.cartButtonText}>BUY NOW</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <Text style={styles.cartButtonText}>ADD TO CART</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
export default ProductDetails;
const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
  },
  details: {
    marginTop: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.orange,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  starIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.white,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  newPrice: {
    color: Colors.red,
    fontSize: 18,
    fontWeight: '700',
  },
  oldPrice: {
    color: 'grey',
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 10,
    textDecorationLine: 'line-through',
  },
  aboutTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  viewDetailsWrapper: {
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: 14,
    color: Colors.red,
    fontWeight: '600',
  },
  description: {
    fontSize: 15,
    color: 'grey',
    marginTop: 10,
    lineHeight: 22,
  },
  cartButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cartButton: {
    backgroundColor: Colors.red,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  buyNowButton: {
    backgroundColor: Colors.red,
  },
});
