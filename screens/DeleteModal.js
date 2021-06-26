import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const DeleteModal = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ()=> null,
      headerLeft: ()=> null,
      headerRight: ()=> 
        <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginRight: 20}}>
          <Ionicons name='close-outline' size={28} color='#fff'/>
        </TouchableOpacity>
    })
  }, [])

  return (
    <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
      <Ionicons name='trash-outline' size={180} color='#fff' style={{marginBottom: 40}}/>
      <Text style={{color: 'white', fontFamily: 'OpenSans', fontSize: 28, marginBottom: 20}}>Delete transaction ?</Text>
      <Text style={{color: '#666', fontFamily: 'OpenSans', width: '100%', textAlign: 'center'}}>if you delete the transaction it will not appear</Text>
      <Text style={{color: '#666', fontFamily: 'OpenSans', width: '80%', textAlign: 'center'}}>in your transaction list anymore</Text>
      <TouchableOpacity style={{backgroundColor: '#E8424E', borderRadius: 50, width: 180, height: 50, justifyContent: 'center', alignItems: 'center', padding: 10, marginTop: 40, marginBottom: 20}}>
        <Text style={{color: 'white', fontFamily: 'OpenSans'}}>Yes, Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={{color: 'white', fontFamily: 'OpenSans'}}>Cancel</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DeleteModal

const styles = StyleSheet.create({})
