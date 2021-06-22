import React from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import { useFonts } from "@use-expo/font";

function CryptoList({symbol,id,price,percentchange24,onPress}) {

  const [loaded] = useFonts({
    'OpenSans': require('../assets/fonts/OpenSans-Bold.ttf'),
  });

  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  if (!loaded) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cryptoList}>
        <View style={styles.cryptoListWraper}>
          <View style={styles.cryptoImageNameWraper}>
            <View style={styles.cryptoImageWraper}>
              <Image style={styles.cryptoImage} source={{
                uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`
              }}/>
            </View>
            <View style={styles.cryptoNameWraper}>
              <Text style={styles.text}>{symbol}</Text>
            </View>
          </View>
          <View style={styles.cryptoPriceWraper}>
            <Text style={styles.text}>{currencyFormat(price)}</Text>
          </View>
          <View style={{justifyContent: 'center', width: '33%', paddingHorizontal: 10}}>
            <View style={percentchange24 > 0 ? styles.crypto24Change : styles.crypto24Change_}>
              <Text style={styles.text,{fontFamily: 'OpenSans', color: percentchange24 > 0 ? '#11C6AA' : '#E8424E'}}>{percentchange24 > 0 ? `+${percentchange24?.toFixed(2)}%` : `${percentchange24?.toFixed(2)}%`}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CryptoList

const styles = StyleSheet.create({
  cryptoList:{
    margin: 10,
    marginVertical: 15,
    flex: 1,
    justifyContent: 'center',
  },
  cryptoListWraper:{
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  cryptoImageWraper:{
    marginRight: 10
  },
  cryptoImage:{
    width: 40,
    height: 40,
  },
  cryptoImageNameWraper:{
    width: '33%',
    // marginHorizontal: 5,
    flexDirection: 'row',
    color: 'white',
    alignItems: 'center'
  },
  cryptoPriceWraper:{
    width: '33%',
    // marginHorizontal: 5,
    paddingLeft: 10,
    justifyContent: 'center'
  },
  crypto24Change:{
    backgroundColor: 'transparent',
    borderColor: '#11C6AA',
    borderWidth: 1,
    // marginHorizontal: 20,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '500'
  },
  crypto24Change_:{
    backgroundColor: 'transparent',
    borderColor: '#E8424E',
    borderWidth: 1,
    // marginHorizontal: 20,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '500'
  },
  text:{
    color: 'white', 
    fontFamily: 'OpenSans'
  }
})