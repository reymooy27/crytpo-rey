import React, {useLayoutEffect} from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import Transaction from '../components/Transaction'

const Order = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Transactions',
      headerTitleStyle: {fontSize: 16},
      headerTintColor: 'white', 
      headerTitleAlign: 'center'
    })
  }, [])

  return (
    <ScrollView contentContainerStyle={{alignItems: 'center', paddingHorizontal: 20}}>
      <Transaction onPress={()=> navigation.navigate('TransactionDetail', {name: '#343545 via Binance'})}/>
      <Transaction buy onPress={()=> navigation.navigate('TransactionDetail', {name: '#343545 via Binance', buy: true})}/>
      <Transaction buy onPress={()=> navigation.navigate('TransactionDetail', {name: '#343545 via Binance', buy: true})}/>
      <Transaction onPress={()=> navigation.navigate('TransactionDetail', {name: '#343545 via Binance'})}/>
    </ScrollView>
  )
}

export default Order

const styles = StyleSheet.create({})
