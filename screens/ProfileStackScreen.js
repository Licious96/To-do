import React from "react"
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import ProfileScreen from './Profile'
import EditProfileScreen from "./EditProfile";

const Stack = createStackNavigator()

const ProfileStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "#fff", //iOS
                elevation: 0 //Android
            },

        }}>
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
    )
}

export default ProfileStackScreen