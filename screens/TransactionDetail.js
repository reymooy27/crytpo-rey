import React, {useState,useLayoutEffect} from 'react'
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, TextInput, KeyboardAvoidingView, Platform, Switch } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Header } from '@react-navigation/stack';

const TransactionDetail = ({navigation, route}) => {

  const name = route.params.name
  const buy = route.params.buy

  const [switchEnabled, setSwitchEnabled] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name
    })
  }, [])

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={Header.HEIGHT + 184} behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <TouchableOpacity>
          <View style={{height: 70, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
            <View>
              <Text style={{color: '#666666', fontSize: 12, fontFamily: 'OpenSans'}}>Exchange</Text>
              <Text style={{color: 'white', fontFamily: 'OpenSans'}}>Select the exchange</Text>
            </View>
            <Ionicons color='white' name='chevron-forward-outline' size={20} style={{position: 'absolute', right: 10}}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{backgroundColor: '#14141E',height: 70, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
            <View>
              <Text style={{color: '#666666', fontSize: 12, fontFamily: 'OpenSans'}}>Trading Pair</Text>
              <Text style={{color: 'white', fontFamily: 'OpenSans'}}>Add the trading pair</Text>
            </View>
            <Ionicons color='white' name='chevron-forward-outline' size={20} style={{position: 'absolute', right: 10}}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{height: 70, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
            <View>
              <Text style={{color: '#666666', fontSize: 12, fontFamily: 'OpenSans'}}>Amount Bought</Text>
              <Text style={{color: 'white', fontFamily: 'OpenSans'}}>Enter the amount you bought</Text>
            </View>
            <Ionicons color='white' name='chevron-forward-outline' size={20} style={{position: 'absolute', right: 10}}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{backgroundColor: '#14141E',height: 70, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
            <View>
              <Text style={{color: '#666666', fontSize: 12, fontFamily: 'OpenSans'}}>Add to which portfolio</Text>
              <Text style={{color: 'white', fontFamily: 'OpenSans'}}>Select from your portfolio</Text>
            </View>
            <Ionicons color='white' name='chevron-forward-outline' size={20} style={{position: 'absolute', right: 10}}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{height: 70, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
            <View>
              <Text style={{color: '#666666', fontSize: 12, fontFamily: 'OpenSans'}}>Transaction Date</Text>
              <Text style={{color: 'white', fontFamily: 'OpenSans'}}>Select the transaction date</Text>
            </View>
            <Ionicons color='white' name='chevron-forward-outline' size={20} style={{position: 'absolute', right: 10}}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{backgroundColor: '#14141E',height: 70, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
            <View>
              <Text style={{color: '#666666', fontSize: 12, fontFamily: 'OpenSans'}}>Transaction Time</Text>
              <Text style={{color: 'white', fontFamily: 'OpenSans'}}>Select the transaction time</Text>
            </View>
            <Ionicons color='white' name='chevron-forward-outline' size={20} style={{position: 'absolute', right: 10}}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{height: 70, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
            <View>
              <Text style={{color: 'white', fontFamily: 'OpenSans'}}>Deduct from ETH holdings</Text>
            </View>
            <Switch 
              trackColor={{ false: "#14141E", true: "#0057FF" }}
              thumbColor={switchEnabled ? "#666" : "#fff"}
              onValueChange={()=> setSwitchEnabled(p=> !p)}
              value={switchEnabled}
              style={{position: 'absolute', right: 10}}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{backgroundColor: '#14141E',height: 70, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
            <View>
              <Text style={{color: '#666666', fontSize: 12, fontFamily: 'OpenSans'}}>Exchange Transaction Fee</Text>
              <Text style={{color: 'white', fontFamily: 'OpenSans'}}>Select what fee you paid</Text>
            </View>
            <Ionicons color='white' name='chevron-forward-outline' size={20} style={{position: 'absolute', right: 10}}/>
          </View>
        </TouchableOpacity>

        {/* notes input */}
        <View style={{paddingHorizontal: 20, marginVertical: 20, marginBottom: 80}}>
          <TextInput style={{color: 'white', fontFamily: 'OpenSans'}} placeholder='Add your note' placeholderTextColor='#666666'/>
        </View>
        
          
      </ScrollView>
      <TouchableOpacity>
        <View style={{flex: 1, height: 60, position: 'absolute', bottom: 0, left: 0, right:0, backgroundColor: buy ? '#11C6AA' : '#E8424E', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white', fontFamily: 'OpenSans'}}>Update Transaction</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default TransactionDetail

const styles = StyleSheet.create({})
