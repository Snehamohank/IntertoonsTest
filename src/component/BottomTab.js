import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useRef, useState, useEffect} from 'react';
  import {useNavigation, useRoute} from '@react-navigation/native';
  import Homeimg from '../assets/home.png';
  import wishlist from '../assets/wishlist.png';
  import Cartimg from '../assets/Cartimg.png';
  
  const {width} = Dimensions.get('window');
  
  const BottomTab = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const tabWidth = width / 3;
  
    const [activeTab, setActiveTab] = useState(route.name);
    const indicatorAnim = useRef(
      new Animated.Value(
        route.name === 'Home' ? 0 : route.name === 'Cart' ? tabWidth * 2 : tabWidth,
      )
    ).current;
  
    const handleTabPress = (tabName, index) => {
      setActiveTab(tabName);
      Animated.spring(indicatorAnim, {
        toValue: index * tabWidth,
        useNativeDriver: false,
      }).start();
      navigation.navigate('Cart');
    };
  
    // useEffect(() => {
    //   const index = route.name === 'Home' ? 0 : route.name === 'Cart' ? 2 : 1;
    //   handleTabPress(route.name, index);
    // }, [route.name]);
  
    return (
      <View style={styles.wrapper}>
        <View style={styles.tabContainer}>
          <Animated.View style={[styles.indicator, { left: indicatorAnim }]} />
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => handleTabPress('Home', 0)}>
            <Image
              source={Homeimg}
              style={{
                height: 25,
                width: 25,
                tintColor: activeTab === 'Home' ? '#FDAA5D' : '#aaa',
              }}
            />
          </TouchableOpacity>
  
          <View style={{ width: tabWidth }} />
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => navigation.navigate('Wishlist')}>
            <Image
              source={wishlist}
              style={{
                height: 25,
                width: 25,
                tintColor: activeTab === 'Wishlist' ? '#FDAA5D' : '#aaa',
              }}
            />
          </TouchableOpacity>
        </View>
  
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate('Cart')}>
          <Image source={Cartimg} style={{marginRight:4, height: 25, width: 25 }} />
        </TouchableOpacity>
      </View>
    );
  };
  
  export default BottomTab;
  
  const styles = StyleSheet.create({
    wrapper: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      alignItems: 'center',
    },
    tabContainer: {
      flexDirection: 'row',
      height: 60,
      width: '90%',
      backgroundColor: '#f9f9f9',
      borderRadius: 30,
      borderTopWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tabButton: {
      width: width / 3 - 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    indicator: {
      position: 'absolute',
      bottom: 0,
      height: 4,
      width: width / 3,
    //   backgroundColor: 'black',
      borderRadius: 2,
    },
    floatingButton: {
      position: 'absolute',
      borderWidth:5,
      borderColor:'#fff',
      bottom: 25,
      width: 70,
      height: 70,
      borderRadius: 40,
      backgroundColor: '#FDAA5D',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      elevation: 5,
    },
  });
  