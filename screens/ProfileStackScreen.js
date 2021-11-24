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
            <Stack.Screen name="Profile" component={ProfileScreen}  options={{
                headerRight: () => (
                    <Icon.Button 
                        name="account-edit" 
                        size={25}
                        color="#000"
                        backgroundColor="#fff"
                        onPress={() => navigation.navigate("EditProfile")}
                    ></Icon.Button>
                )
        }}/>
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
    )
}

export default ProfileStackScreen