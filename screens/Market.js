import React, {useEffect, useState} from 'react'
import { StyleSheet, View, RefreshControl, FlatList, TouchableOpacity, Text, TextInput } from 'react-native'
import axios from 'axios'
import Coin from '../components/Coin'
import { selectInputOpen } from '../redux/reducers/appSlice'
import { useSelector } from 'react-redux'

const Market = ({ navigation }) => {

  const abortController = new AbortController()
  const signal = abortController.signal

  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const [input, setInput] = useState('');

  const inputOpen = useSelector(selectInputOpen)

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
    await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false', {signal})
    .then(res=>{
      setData(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  
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
    <View style={{flex: 1, justifyContent: 'center'}}>
      {/* search input */}
      <View style={{paddingHorizontal: 20, display: inputOpen ? 'flex' : 'none'}}>
        <TextInput style={[styles.text,{height: 60, fontSize: 32}]} value={input} placeholder='Search' placeholderTextColor='#666666' onChangeText={text=> setInput(text)}/>
      </View>

      {/* sort menu */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20, marginTop: 10}}>
        {
          <>
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
        </>
        }
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
        initialNumToRender={10}
        renderItem={renderItem}
        />
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
