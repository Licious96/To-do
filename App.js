import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeScreen from './screens/HomeScreen'
import ProfileStack from './screens/ProfileStackScreen';
import ToDoScreen from './screens/ToDo';
import FinishedScreen from './screens/Finished';
import { DrawerContent } from './screens/DrawerContent';


const Drawer = createDrawerNavigator()


const App = () => {
  return (
    <NavigationContainer >
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{title: "To-do list"}}/>
        <Drawer.Screen name="ProfileStack" component={ProfileStack} options={{headerShown: false}}/>
        <Drawer.Screen name="ToDo" component={ToDoScreen} />
        <Drawer.Screen name="Finished" component={FinishedScreen} />
      </Drawer.Navigator>

    </NavigationContainer>
  );
}

export default App