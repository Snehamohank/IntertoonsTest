import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../component/Header'

const CategoryScreen = () => {
  return (
    <View View style={{flex: 1,}}>
      <Header title={'Category Screen'} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>SearchScreen</Text>
      </View>
    </View>
  )
}

export default CategoryScreen

const styles = StyleSheet.create({})