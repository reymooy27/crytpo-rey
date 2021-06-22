import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { FlatList, StyleSheet, View, RefreshControl} from 'react-native';
import axios from 'axios'
import CryptoList from '../components/CryptoList'

export default function Home({navigation}) {

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
    await axios.get('https://crypto-rey.herokuapp.com/')
    .then(res=>{
      setData(res.data.data)
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
    <View style={styles.container}>
      <FlatList 
        data={Object.keys(data)} 
        keyExtractor={item => item}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={handleRefresh}
          />
        }
        initialNumToRender={10}
        // ItemSeparatorComponent={()=> <View style={{marginHorizontal: 10 ,borderBottomColor: '#70849D', borderBottomWidth: 0.3}}></View>}
        renderItem={({item})=> 
          <CryptoList
          onPress={()=> navigation.navigate('CryptoDetails',
          { id: data[item]?.id, 
            name: data[item]?.name, 
            symbol: data[item]?.symbol,
            price: data[item]?.quote?.USD?.price,
            percentchange24: data[item]?.quote?.USD?.percent_change_24h,
            marketCap: data[item]?.quote?.USD?.market_cap
          })} 
          rank={data[item]?.cmc_rank}
          name={data[item]?.name}
          id={data[item]?.id}
          symbol={data[item]?.symbol}
          price={data[item]?.quote?.USD?.price}
          marketCap={data[item]?.quote?.USD?.market_cap}
          percentchange24={data[item]?.quote?.USD?.percent_change_24h}
          />
        }/>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#21293A',
    justifyContent: 'center',
  },
});
