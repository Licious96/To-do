import React, {useEffect, useState} from "react";
import {View, StyleSheet, ScrollView} from 'react-native'
import { DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import { Avatar, Title, Paragraph, Caption, Drawer, Text, TouchableRipple} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused  } from '@react-navigation/native';
import axios from "axios";
import Constants from 'expo-constants';

export default function DrawerContent(props){

    const [user_id, setUser_id] = useState('')
    const [user, setUser] = useState([])
    const isFocused = useIsFocused();
    const { manifest } = Constants
    const url = `http://${manifest.debuggerHost.split(':').shift().concat(':8000')}/api`

    useEffect(async () => {
        const user_idd = await AsyncStorage.getItem("@user_id")
        const id = JSON.parse(user_idd)
        if (user_id !== null) {
            setUser_id(id)
        }
    },[user_id])



    useEffect(async () => {
        try {
            const res = await axios.get(`${url}/get_user/${user_id}`)
            setUser(res.data)
        } catch (error) {
            console.log(error)
        }
    }, [user_id])

    const logout = async() => {
        await AsyncStorage.removeItem('user_id')
        props.navigation.navigate("Login", {screen: 'Login'})
    }

    
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}> 
                        <View style={styles.profileSection}>
                            <Avatar.Image 
                                source={{
                                    uri: user.image !== null ? user.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                }}
                                size={70}
                            />
                            <View>
                                <Title style={styles.title}>{user.f_name} {user.l_name}</Title>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                name="account-outline"
                                color={color}
                                size={size} />
                            )}
                            label="Profile"
                            onPress={()=>{ props.navigation.navigate("EditProfile", {userObj: user})}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                name="format-list-bulleted"
                                color={color}
                                size={size} />
                            )}
                            label="To-do tasks"
                            onPress={()=>{props.navigation.navigate("HomeScreen")}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                name="check"
                                color={color}
                                size={size} />
                            )}
                            label="Finished tasks"
                            onPress={()=>{props.navigation.navigate("CompletedScreen")}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                        name="exit-to-app"
                        color={color}
                        size={size} />
                    )}
                    label="SignOut"
                    onPress={logout}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20
    },
    title: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: "bold",
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
    },
    profileSection: {
        flexDirection: "column", 
        marginTop: 15, 
        alignItems: "center",
        marginLeft: -20
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1
    },
    preference: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 15
    }
})