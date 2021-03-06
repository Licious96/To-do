import React from "react"
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextInput, Dimensions  } from "react-native";

import HomeScreen from './HomeScreen'
import SearchScreen from "./Search";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import CompletedScreen from "./Completed";
import EditProfileScreen from "./EditProfile";

const Stack = createStackNavigator()

const HomeStackScreen = ({ navigation }) => {

    const ScreenWidth = Dimensions.get('window').width*0.63;

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "#fff", //iOS
                elevation: 0 //Android
            },

        }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{
                title: "To-do list",
                headerLeft: () => (
                    <Icon.Button 
                        name="menu" 
                        size={25}
                        color="#000"
                        backgroundColor="#fff"
                        onPress={() => navigation.openDrawer()}
                    ></Icon.Button>
                ),
                headerRight: () => (
                    <Icon.Button 
                        name="magnify" 
                        size={25}
                        color="#000"
                        backgroundColor="#fff"
                        onPress={() => navigation.navigate("SearchScreen")}
                    ></Icon.Button>
                )
        }}/>
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="AddTask" component={AddTask} options={{title: "Add task"}}/>
            <Stack.Screen name="EditTask" component={EditTask} options={{title: "Edit task"}}/>
            <Stack.Screen name="CompletedScreen" component={CompletedScreen} options={{title: "Completed tasks"}}/>
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Edit Profile" }} />
        </Stack.Navigator>
    )
}

export default HomeStackScreen