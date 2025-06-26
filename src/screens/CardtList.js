import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../component/Header';
import {Colors} from '../utils/Colors';
import CartItem from '../component/Cart/CartItem';
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../redux/slices/cartSlice';

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const handleQuantityChange = (id, type) => {
    dispatch(updateQuantity({id, type}));
  };

  const handleDelete = id => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.red}
        translucent={false}
        hidden={false}
      />
      <Header title={`My Cart (${cartItems.length})`} />

      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CartItem
            item={item}
            onQuantityChange={handleQuantityChange}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={{padding: 10, paddingBottom: 100}}
        ListEmptyComponent={
          <View style={styles.emptyCart}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <TouchableOpacity
              style={styles.continueShopping}
              onPress={() => navigation.goBack()}>
              <Text style={styles.continueText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalAmount}>OMR {total.toFixed(3)}</Text>
          <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.grey,
    marginBottom: 20,
  },
  continueShopping: {
    backgroundColor: Colors.red,
    padding: 15,
    borderRadius: 5,
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.red,
  },
  checkoutBtn: {
    backgroundColor: Colors.red,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default CartScreen;
