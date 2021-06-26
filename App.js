import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { StyleSheet} from 'react-native'
import Home from './screens/Home'
import Market from './screens/Market'
import CryptoDetails from './screens/CryptoDetails'
import {DefaultTheme} from '@react-navigation/native'
import { useFonts } from "@use-expo/font";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Order from './screens/Order';
import Settings from './screens/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import store from './redux/store'
import { Provider } from 'react-redux'
import TransactionDetail from './screens/TransactionDetail';
import DeleteModal from './screens/DeleteModal';

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
        <Stack.Screen name='TransactionDetail' component={TransactionDetail}/>
        <Stack.Screen name='DeleteModal' component={DeleteModal}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const HomeStack = createStackNavigator()
const HomeStackScreen = ()=>{
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name='Home' component={Home}/>
    </HomeStack.Navigator>
  )
}
const MarketStack = createStackNavigator()
const MarketStackScreen = ()=>{
  return(
    <MarketStack.Navigator>
      <MarketStack.Screen name='Market' component={Market}/>
    </MarketStack.Navigator>
  )
}

const OrderStack = createStackNavigator()
const OrderStackScreen = ()=>{
  return(
    <OrderStack.Navigator>
      <OrderStack.Screen name='Order' component={Order}/>
    </OrderStack.Navigator>
  )
}

const SettingsStack = createStackNavigator()
const SettingsStackScreen = ()=>{
  return(
    <SettingsStack.Navigator screenOptions={{headerTintColor: 'white', headerTitleAlign: 'center'}}>
      <SettingsStack.Screen name='Settings' component={Settings}/>
    </SettingsStack.Navigator>
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
            else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
    tabBarOptions={{keyboardHidesTabBar: true,activeTintColor: '#0057FF', inactiveTintColor: '#666666', showLabel: false, style:{backgroundColor: '#0E0F18', borderColor: '#0E0F18'}}}
    >
      <Tab.Screen name="Home" component={HomeStackScreen}/>
      <Tab.Screen name="Market" component={MarketStackScreen}/>
      <Tab.Screen name="Order" component={OrderStackScreen}/>
      <Tab.Screen name="Settings" component={SettingsStackScreen}/>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({

})
