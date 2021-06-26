import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Setting = ({name})=>{
  return(
    <TouchableOpacity>
      <View style={{height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View>
          <Text style={{color: '#666', fontFamily: 'OpenSans'}}>{name}</Text>
        </View>
        <Ionicons color='#666' name='chevron-forward-outline' size={20} style={{}}/>
      </View>
    </TouchableOpacity>
  )
}

const Header = ({name})=>{
  return(
    <Text style={{color: 'white', fontFamily: 'OpenSans', fontSize: 30}}>{name}</Text>
  )
}

const Settings = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {fontSize: 16},
    })
  }, [])

  return (
    <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
      {/* general */}
      <View style={{marginBottom: 40}}>
        <Header name='General'/>
        <Setting name='Notifications'/>
        <Setting name='Currency Preference'/>
        <Setting name='Alerts'/>
        <Setting name='Terms of Use & Privacy Policy'/>
      </View>
      <View style={{marginBottom: 40}}>
        <Header name='Account'/>
        <Setting name='User Profile'/>
        <Setting name='Change Pin'/>
        <Setting name='Log Out'/>
      </View>
      <View style={{marginBottom: 40}}>
        <Header name='Social'/>
        <Setting name='Telegram'/>
        <Setting name='Twitter'/>
        <Setting name='Medium'/>
        <Setting name='Share The App'/>
      </View>
    </ScrollView>
  )
}

export default Settings

const styles = StyleSheet.create({})
