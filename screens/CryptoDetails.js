import React, {useLayoutEffect, useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import {useTheme} from '@react-navigation/native'
import axios from 'axios'
import Chart from '../components/Chart'

const CryptoDetails = ({navigation,route}) => {

  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const {colors} = useTheme()

  const [data, setData] = useState([])
  const [marketData, setMarketData] = useState([])
  const [chartTime, setChartTime] = useState('1');
  const [refresh, setRefresh] = useState(false);

  const id = route.params.id

  const fetchData = async ()=>{
    await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
    .then(res=> setData(res.data))
    .catch(err=> console.log(err))
  }

  const fetchMarketData = async ()=>{
    await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${chartTime}`)
    .then(res=> setMarketData(res.data))
    .catch(err=> console.log(err))
  }

  const handleRefresh = ()=>{
    setRefresh(true)
    fetchData()
    setChartTime('1')
    setTimeout(() => {
      setRefresh(false)
    }, 500);
  }

  useEffect(() => {
    let mounted = true
    if(mounted){
      fetchData()
      setChartTime('1')
      fetchMarketData()
    }

    return ()=> mounted = false
  }, [chartTime])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props => (
        <View>
          <Text style={styles.text}>
            {data?.name}
            <Text style={{color: 'grey'}}>{` (${data?.symbol?.toUpperCase()})`}</Text>
          </Text>
        </View>),
      headerTitleAlign: 'center'
      
    })
  }, [data?.name]);


  return (
    // header
    <ScrollView 
      style={styles.container}
      refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={handleRefresh}
          />
        }
      >
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20}}>
        <View>
          <Text style={[styles.text,{fontSize: 32}]}>{'$'+ data?.market_data?.current_price?.usd}</Text>
          <Text style={[styles.text,{color: data?.market_data?.price_change_percentage_24h > 0 ?'#11C6AA' : '#E8424E'}]}>{data?.market_data?.price_change_percentage_24h > 0 ? `+ ${data?.market_data?.price_change_24h.toFixed(2)}` : `${data?.market_data?.price_change_24h.toFixed(2)}`}
            <Text style={[styles.text,{color: data?.market_data?.price_change_percentage_24h > 0 ?'#11C6AA' : '#E8424E'}]}>{data?.market_data?.price_change_percentage_24h > 0 ? ` (+ ${data?.market_data?.price_change_percentage_24h?.toFixed(2)})%` : ` (${data?.market_data?.price_change_percentage_24h?.toFixed(2)}%)`}</Text>
          </Text>
        </View>
        <View style={{}}>
          <Image 
            style={{width: 40, height: 40}} 
            source={{uri: data?.image?.small}}/>
        </View>
      </View>

      {/* graphics */}
      <View style={{marginTop: 20, marginBottom: 10,marginHorizontal: 5, height: 300}}>
        <Chart data={marketData?.prices?.map(r=> {
          let data = {}
          data.x = r[0]
          data.y = r[1]
          return data
        })}/>
      </View>

      {/* button */}
        <View style={{marginVertical: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity onPress={()=> setChartTime('1')} style={{width: 50,height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 15, backgroundColor: 'blue'}}>
            <Text style={styles.text}>1H</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> setChartTime('1')} style={{width: 50,height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 15, backgroundColor: 'blue'}}>
            <Text style={styles.text}>1D</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> setChartTime('30')} style={{width: 50,height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 15, backgroundColor: 'blue'}}>
            <Text style={styles.text}>1M</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> setChartTime('180')} style={{width: 50,height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 15, backgroundColor: 'blue'}}>
            <Text style={styles.text}>6M</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> setChartTime('365')} style={{width: 50,height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 15, backgroundColor: 'blue'}}>
            <Text style={styles.text}>1Y</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> setChartTime('max')} style={{width: 50,height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 15, backgroundColor: 'blue'}}>
            <Text style={styles.text}>ALL</Text>
          </TouchableOpacity>
        </View>

      {/* details */}
      <View style={{marginHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
        <View style={{marginBottom: 20,marginRight: 20}}>
          <Text style={{color: 'grey', fontWeight: 'bold', fontSize: 12}}>Market Cap</Text>
          <Text style={[styles.text, {fontSize: 16}]}>{data?.market_data?.market_cap?.usd}</Text>
        </View>
        <View style={{marginBottom: 20,marginRight: 20}}>
          <Text style={{color: 'grey', fontWeight: 'bold', fontSize: 12}}>Volume (24 hours)</Text>
          <Text style={[styles.text, {fontSize: 16}]}>{data?.market_data?.total_volume?.usd}</Text>
        </View>
        <View style={{marginBottom: 20,marginRight: 20}}>
          <Text style={{color: 'grey', fontWeight: 'bold', fontSize: 12}}>Available Supply</Text>
          <Text style={[styles.text, {fontSize: 16}]}>{`${data?.market_data?.circulating_supply.toFixed(2)} ${data?.symbol?.toUpperCase()}`}</Text>
        </View>
        <View style={{marginBottom: 20,marginRight: 20}}>
          <Text style={{color: 'grey', fontWeight: 'bold', fontSize: 12}}>Total Supply</Text>
          <Text style={[styles.text, {fontSize: 16}]}>{data?.market_data?.total_supply !== null ? `${data?.market_data?.total_supply.toFixed(2)} ${data?.symbol?.toUpperCase()}` : '-'}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default CryptoDetails

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  text:{
    color: 'white',
    fontFamily: 'OpenSans'
  }
})
