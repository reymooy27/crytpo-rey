import React, { useEffect, useState, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, View, RefreshControl, Text, TouchableOpacity} from 'react-native';
import axios from 'axios'
import Coin from '../components/Coin'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Home({navigation}) {

  const abortController = new AbortController()
  const signal = abortController.signal

  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false)

  const handleRefresh = ()=>{
    setRefresh(true)
    fetchData()
    setTimeout(() => {
      setRefresh(false)
    }, 500);
  }

  const fetchData = async ()=>{
    await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false', {signal})
    .then(res=>{
      setData(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Default Portofolio',
      headerTitleStyle: {fontSize: 16}, 
      headerTintColor: 'white', 
      headerTitleAlign: 'center',
      headerRight: ()=>
        <TouchableOpacity style={{marginRight: 20}}>
          <Ionicons name='settings-outline' size={20} color='#666666'/>
        </TouchableOpacity> ,
        headerLeft: ()=> 
        <TouchableOpacity style={{marginLeft: 20}}>
          <Ionicons name='stats-chart' size={20} color='#666666'/>
        </TouchableOpacity> ,
    })
  }, [])

  useEffect(() => {
    fetchData() 

    return () => abortController.abort()
  }, []);

  const renderItem = ({item})=> 
    <Coin
      onPress={()=> navigation.navigate('CryptoDetails', {id: item?.id})} 
      rank={item?.market_cap_rank}
      name={item?.name}
      id={item?.id}
      symbol={item?.symbol?.toUpperCase()}
      price={item?.current_price}
      image={item?.image}
      marketCap={item?.market_cap}
      changes={item?.price_change_percentage_24h}
    />

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 20}}>
        <View>
          <Text style={[styles.text, {fontSize: 32}]}>$2,3423</Text>
          <Text style={[styles.text,{color: '#11C6AA'}]}>+$8734,2
            <Text style={[styles.text,{color: '#11C6AA'}]}>{` (+45%)`}</Text>
          </Text>
        </View>
      </View>

      {/* sort menu */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20, marginTop: 10}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{marginRight: 10,backgroundColor: '#666666', padding: 5,paddingHorizontal: 10, borderRadius: 5}}>
            <Text style={styles.text}>Highest Holdings</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity style={{backgroundColor: '#666666', padding: 5,paddingHorizontal: 10, borderRadius: 5}}>
            <Text style={styles.text}>24 Hours</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* crypto list */}
      <FlatList 
        style={{paddingHorizontal: 20}}
        data={data} 
        keyExtractor={item => item?.id}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={handleRefresh}
          />
        }
        renderItem={renderItem}
        initialNumToRender={10}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#21293A',
    justifyContent: 'center',
  },
  text:{
    color: 'white',
    fontFamily: 'OpenSans'
  }
});
