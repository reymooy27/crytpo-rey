import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { StyleSheet, TouchableOpacity} from 'react-native'
import Home from './screens/Home'
import Market from './screens/Market'
import CryptoDetails from './screens/CryptoDetails'
import {DefaultTheme} from '@react-navigation/native'
import * as Font from "expo-font";
import { useFonts } from "@use-expo/font";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Order from './screens/Order';
import Wallet from './screens/Wallet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import store from './redux/store'
import { Provider, useDispatch } from 'react-redux'
import { setInputOpen } from './redux/reducers/appSlice';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppWraper = ()=>{  
  return(
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

export default AppWraper


const App = () => {

  const [loaded] = useFonts({
    OpenSans: require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const appTheme = {
    ...DefaultTheme,
    colors:{
      background: '#0E0F18',
    }
  }

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        animationEnabled: false,
        headerTintColor: 'white'
      }}
    >
        <Stack.Screen options={{headerShown: false}} name='Home' component={HomeTabs}/>
        <Stack.Screen name='CryptoDetails' component={CryptoDetails}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const HomeStack = createStackNavigator()
const HomeStackScreen = ()=>{
  return(
    <HomeStack.Navigator screenOptions={{title: 'Default Portofolio',headerTitleStyle: {fontSize: 16}, headerTintColor: 'white', headerTitleAlign: 'center'}}>
      <HomeStack.Screen name='Home' component={Home}
      options={{
        headerRight: ()=>
        <TouchableOpacity style={{marginRight: 20}}>
          <Ionicons name='settings-outline' size={20} color='#666666'/>
        </TouchableOpacity> ,
        headerLeft: ()=> 
        <TouchableOpacity style={{marginLeft: 20}}>
          <Ionicons name='stats-chart' size={20} color='#666666'/>
        </TouchableOpacity> ,
      }}
      />
    </HomeStack.Navigator>
  )
}
const MarketStack = createStackNavigator()
const MarketStackScreen = ()=>{
  const dispatch = useDispatch()

  return(
    <MarketStack.Navigator screenOptions={{headerTitleStyle: {fontSize: 16} ,headerTintColor: 'white', headerTitleAlign: 'center'}}>
      <MarketStack.Screen name='Market' component={Market}
      options={{
        headerRight: ()=>
        <TouchableOpacity style={{marginRight: 20}}>
          <Ionicons name='stats-chart' size={20} color='#666666'/>
        </TouchableOpacity> ,
        headerLeft: ()=> 
        <TouchableOpacity onPress={()=> dispatch(setInputOpen())} style={{marginLeft: 20}}>
          <Ionicons name='search' size={20} color='#666666'/>
        </TouchableOpacity> ,
      }}
      />
    </MarketStack.Navigator>
  )
}

const OrderStack = createStackNavigator()
const OrderStackScreen = ()=>{
  return(
    <OrderStack.Navigator screenOptions={{headerTintColor: 'white', headerTitleAlign: 'center'}}>
      <OrderStack.Screen name='Order' component={Order}/>
    </OrderStack.Navigator>
  )
}

const WalletStack = createStackNavigator()
const WalletStackScreen = ()=>{
  return(
    <WalletStack.Navigator screenOptions={{headerTintColor: 'white', headerTitleAlign: 'center'}}>
      <WalletStack.Screen name='Wallet' component={Wallet}/>
    </WalletStack.Navigator>
  )
}

const HomeTabs = ()=>{
  return(
    <Tab.Navigator initialRouteName='Home' 
    screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Market') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            }
            else if (route.name === 'Order') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            }
            else if (route.name === 'Wallet') {
              iconName = focused ? 'wallet' : 'wallet-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
    tabBarOptions={{activeTintColor: '#0057FF', inactiveTintColor: '#666666', showLabel: false, style:{backgroundColor: '#0E0F18', borderColor: '#0E0F18'}}}
    >
      <Tab.Screen name="Home" component={HomeStackScreen}/>
      <Tab.Screen name="Market" component={MarketStackScreen}/>
      <Tab.Screen name="Order" component={OrderStackScreen}/>
      <Tab.Screen name="Wallet" component={WalletStackScreen}/>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({

})
