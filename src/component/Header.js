import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Cart from '../assets/Cartimg.png';
import Backarrow from '../assets/backarrow.png';
import Menu from '../assets/menuimg.png';
import Bell from '../assets/bell.png';
import Search from '../assets/search.png';
import Logo from '../assets/logo.webp';

import {Colors} from '../utils/Colors';

const Header = ({title, logoTitle, cart, menu}) => {
  const isAndroid15 = Platform.OS === 'android' && Platform.Version === 34;
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#DF0E11',
      }}>
      <View style={{}}>
        {menu ? (
          <Image
            source={Menu}
            tintColor={Colors.white}
            resizeMethod="cover"
            style={{
              width: 22,
              height: 20,
              marginHorizontal: 10,
              marginRight: 5,
            }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
            }}>
            <Image
              source={Backarrow}
              resizeMethod="cover"
              tintColor={Colors.white}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
        )}
      </View>
      {logoTitle && (
        <Image
          source={Logo}
          resizeMode="contain"
          tintColor={Colors.white}
          style={{width: 120, height: 50}}
        />
      )}
      {!menu && (
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            marginLeft: 10,
            color: Colors.white,
          }}>
          {title}
        </Text>
      )}
      {!cart && (
        <View
          style={{
            width: 55,
            height: 50,
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {!menu && (
            <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
              <Image
                source={Search}
                tintColor={'#EFF1F3'}
                resizeMethod="cover"
                style={{width: 22, height: 22, marginBottom: 5, marginRight: 6}}
              />
            </TouchableOpacity>
          )}
          {menu ? (
            <TouchableOpacity>
              <Image
                source={Bell}
                tintColor={'#EFF1F3'}
                resizeMethod="cover"
                style={{
                  width: 24,
                  height: 25,
                  marginBottom: 5,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
              <Image
                source={Cart}
                tintColor={'#EFF1F3'}
                resizeMethod="cover"
                style={{
                  width: 24,
                  height: 25,
                  marginBottom: 5,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
