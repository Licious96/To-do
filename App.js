import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeStack from './screens/HomeStackScreen'
import ProfileStack from './screens/ProfileStackScreen';
import ToDoScreen from './screens/ToDo';
import FinishedScreen from './screens/Finished';
import Login from './screens/Login'
import Register from './screens/Register'
import { DrawerContent } from './screens/DrawerContent';


const Drawer = createDrawerNavigator()
const RootStack = createStackNavigator();



const App = () => {
  return (
    <NavigationContainer >
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Login" component={Login}/>
        <RootStack.Screen name="Register" component={Register}/>
      </RootStack.Navigator>
      {/* <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeStack" component={HomeStack} options={{headerShown: false}}/>
        <Drawer.Screen name="ProfileStack" component={ProfileStack} options={{headerShown: false}}/>
        <Drawer.Screen name="ToDo" component={ToDoScreen} />
        <Drawer.Screen name="Finished" component={FinishedScreen} />
      </Drawer.Navigator> */}

    </NavigationContainer>
  );
}

export default App