import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeStack from './HomeStackScreen'
import ProfileStack from './ProfileStackScreen'
import DrawerContent from './DrawerContent'

const Drawer = createDrawerNavigator()
const DrawerStack = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeStack" component={HomeStack} options={{headerShown: false}}/>
            <Drawer.Screen name="ProfileStack" component={ProfileStack} options={{headerShown: false}}/>
        </Drawer.Navigator>
    )
}

export default DrawerStack
