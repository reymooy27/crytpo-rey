import React, {useEffect, useState} from 'react'
import { StyleSheet, View, RefreshControl, FlatList, TouchableOpacity, Text } from 'react-native'
import axios from 'axios'
import Coin from '../components/Coin'

const Market = ({ navigation }) => {

  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false)

  const handleRefresh = ()=>{
    setRefresh(true)
    fetchData()
    setTimeout(() => {
      setRefresh(false)
    }, 500);
  }

  const sortRank = ()=> {
    const rank = [...data].sort((a,b)=> (a.market_cap_rank < b.market_cap_rank) ? -1 : (a.market_cap_rank > b.market_cap_rank ? 1 : 0))
    setData(rank)
  }

  const sortVolume = ()=> {
    const vol = [...data].sort((a,b)=> a.market_cap < b.market_cap ? -1 : a.market_cap > b.market_cap ? 1 : 0)
    setData(vol)
  }

  const sort24h = ()=> {
    const change24h =[ ...data].sort((a,b)=> a.price_change_percentage_24h < b.price_change_percentage_24h ? -1 : a.price_change_percentage_24h > b.price_change_percentage_24h ? 1 : 0 )
    setData(change24h)
  }

  const fetchData = async ()=>{
    await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>{
      setData(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  
  useEffect(() => {
    let mounted = true
    if(mounted){
      fetchData() 
    }
    return () => {
      mounted = false
    };
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20, marginTop: 10}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={sortRank} style={{marginRight: 10,backgroundColor: '#666666', padding: 5,paddingHorizontal: 10, borderRadius: 5}}>
            <Text style={styles.text}>Rank</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sortVolume} style={{backgroundColor: '#666666', padding: 5,paddingHorizontal: 10, borderRadius: 5}}>
            <Text style={styles.text}>Volume</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={sort24h} style={{backgroundColor: '#666666', padding: 5,paddingHorizontal: 10, borderRadius: 5}}>
            <Text style={styles.text}>24 Hours</Text>
          </TouchableOpacity>
        </View>
      </View>
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
        initialNumToRender={10}
        renderItem={({item})=> 
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
        }/>
    </View>
  )
}

export default Market

const styles = StyleSheet.create({
  text:{
    color: 'white',
    fontFamily: 'OpenSans'
  }
})
