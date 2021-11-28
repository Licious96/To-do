import React, {useState, useEffect} from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Avatar, Title,  Caption, Text, TouchableRipple } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = ({ navigation }) => {

    const [user_id, setUser_id] = useState('')
    const [user, setUser] = useState([])

    useEffect(async () => {
        const id = await AsyncStorage.getItem("user_id")
        if (user_id !== null) {
            setUser_id(id)
        }
    }, [user_id])

    useEffect(async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/get_user/${user_id}`)
            setUser(res.data)
        } catch (error) {
            console.log(error)
        }
    }, [user_id])

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={{
                            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                        }}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 30,
                            marginBottom: 5,
                        }]}>{user.f_name} {user.l_name}</Title>
                    </View>
                </View>
            </View>

            <View style={styles.userDetails}>
                <TouchableRipple >
                    <View style={styles.userItem}>
                        <Icon name="email" color="#777777" size={25} />
                        <Text style={styles.userItemText}>{user.email}</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple >
                    <View style={styles.userItem}>
                        <Icon name="lock" color="#777777" size={25} />
                        <Text style={styles.userItemText}>********</Text>
                    </View>
                </TouchableRipple>
            </View>
        </SafeAreaView>
    );
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        justifyContent: 'center',
        marginLeft: 30
    },
    userDetails: {
        marginTop: 10,
    },
    userItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    userItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    }
});