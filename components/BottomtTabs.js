import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Home from '../screens/Home'
import Market from '../screens/Market'

const BottomtTabs = () => {

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Market" component={Market} />
    </Tab.Navigator>
  )
}

export default BottomtTabs

const styles = StyleSheet.create({})
