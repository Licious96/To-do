import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './screens/Login';
import Register from './screens/Register';
import DrawerStack from './screens/DrawerStack';

const Stack = createStackNavigator()

const App = () => {

  const [user_id, setUser_id] = useState(null)

  useEffect(()=>{
    session()
  },[])

  const session = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_id');
        if (value !== null) {
          setUser_id(JSON.parse(value));
        }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(user_id)

  //AsyncStorage.removeItem('user_id')
 
  return (
    <NavigationContainer >
       <Stack.Navigator screenOptions={{headerShown: false}}>
         {
           user_id !== null ? 
           (<Stack.Screen name="DrawerStack" component={DrawerStack}/>) : 
           (
              <>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register} />
              </>
            )
         }
            
            
        </Stack.Navigator>
      
    </NavigationContainer>
  );
}

export default App