import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';

const CartItem = ({item, onQuantityChange, onDelete}) => {
  return (
    <View style={styles.card}>
      <View style={styles.infoWrapper}>
        <View style={{flex: 1}}>
        <Text style={styles.title}>{item.name}</Text>
        </View>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>

      <View style={styles.actions}>
        <Text style={styles.price}>OMR {item.price * item.quantity}</Text>
        <View style={styles.actionsRight}>
          <TouchableOpacity style={{marginRight:20}} onPress={() => onDelete(item.id)}>
            <Image
              source={require('../../assets/delete.png')}
              tintColor={Colors.grey1}
              style={styles.deleteIcon}
            />
          </TouchableOpacity>

          <View style={styles.counter}>
            <TouchableOpacity onPress={() => onQuantityChange(item.id, 'dec')}>
              <Text style={styles.counterBtn}>−</Text>
            </TouchableOpacity>
            <Text style={styles.count}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => onQuantityChange(item.id, 'inc')}>
              <Text style={styles.counterBtn}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 12,
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#000',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.red,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionsRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteIcon: {resizeMode: 'stretch', width: 20, height: 20},
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  counterBtn: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 10,
  },
  count: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 6,
  },
});

export default CartItem;