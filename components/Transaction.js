import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Transaction = ({buy, onPress}) => {
  return (
    <View style={{marginVertical: 20}}>
      <TouchableOpacity onPress={onPress}>
        <View style={{marginBottom: 15, flexDirection: 'row'}}>
          <Ionicons color={buy ? '#11C6AA' : '#E8424E'} name='radio-button-on-outline' size={20}/>
          <Text style={{marginLeft: 10, color: 'white', fontFamily: 'OpenSans'}}>#3423523 via Binance</Text>
          <Ionicons color='white' name='chevron-forward-outline' size={20} style={{position: 'absolute', right: 10}}/>
        </View>
      </TouchableOpacity>
      <View style={{flexWrap: 'wrap',flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20}}>
        <View style={{width: '50%', marginBottom: 15}}>
          <Text style={{color: '#666666', fontSize: 12, fontFamily: 'OpenSans'}}>Amount Bought</Text>
          <Text style={{color: 'white', fontFamily: 'OpenSans'}}>0.0234348 BTC</Text>
        </View>
        <View style={{width: '50%', marginBottom: 15}}>
          <Text style={{color: '#666666', fontSize: 12, fontFamily: 'OpenSans'}}>Transaction Date</Text>
          <Text style={{color: 'white', fontFamily: 'OpenSans'}}>28 June 2021</Text>
        </View>
        <View style={{width: '50%', marginBottom: 15}}>
          <Text style={{color: '#666666', fontSize: 12, fontFamily: 'OpenSans'}}>ETH Buy Price</Text>
          <Text style={{color: 'white', fontFamily: 'OpenSans'}}>$204.71</Text>
        </View>
        <View style={{width: '50%', marginBottom: 15}}>
          <Text style={{color: '#666666', fontSize: 12, fontFamily: 'OpenSans'}}>Trading Pair</Text>
          <Text style={{color: 'white', fontFamily: 'OpenSans'}}>ETH/USDT</Text>
        </View>
        <View style={{width: '50%', marginBottom: 15}}>
          <Text style={{color: '#666666', fontSize: 12, fontFamily: 'OpenSans'}}>Cost</Text>
          <Text style={{color: 'white', fontFamily: 'OpenSans'}}>$3889.2</Text>
        </View>
        <View style={{width: '50%', marginBottom: 15}}>
          <Text style={{color: '#666666', fontSize: 12, fontFamily: 'OpenSans'}}>Worth</Text>
          <Text style={{color: 'white', fontFamily: 'OpenSans'}}>$4543.3</Text>
        </View>
      </View>
    </View>
  )
}

export default Transaction

const styles = StyleSheet.create({})
