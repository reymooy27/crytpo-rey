import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'

function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

const Coin = ({id, name, symbol, rank, marketCap, price, changes, image, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{paddingRight: 10}}>
            <Image style={{width: 25, height: 25}} source={{uri: image}}/>
          </View>
          <View>
            <Text style={styles.text}>{`${rank}.${name} `}<Text style={[styles.text,{color: 'grey'}]}>({symbol})</Text></Text>
            <Text style={{color: 'grey', }}>{currencyFormat(marketCap)}</Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.text}>{currencyFormat(price)}</Text>
          <Text style={{fontWeight: 'bold', color: changes>0 ? '#11C6AA' : '#E8424E'}}>{changes > 0 ? `+${changes?.toFixed(2)}%` : `${changes?.toFixed(2)}%`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Coin

const styles = StyleSheet.create({
  text:{
    color: 'white',
    fontFamily: 'OpenSans'
  }
})
