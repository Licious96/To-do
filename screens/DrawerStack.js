import React, {useEffect, useState} from 'react'
import { createDrawerNavigator  } from '@react-navigation/drawer'

import HomeStack from './HomeStackScreen'
import ProfileStack from './ProfileStackScreen'
import DrawerContent from './DrawerContent'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator()
const DrawerStack = ({navigation}) => {

    useEffect(async()=>{
        const user_idd = await AsyncStorage.getItem("@user_id")
        const id = JSON.parse(user_idd)
        if (id == null) {
            navigation.navigate('Login', { screen: 'Login' });
        }
    },[])
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeStack" component={HomeStack} options={{headerShown: false}}/>
            <Drawer.Screen name="ProfileStack" component={ProfileStack} options={{headerShown: false}}/>
        </Drawer.Navigator>
    )
}

export default DrawerStack
