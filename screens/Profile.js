import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={{
                            uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                        }}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 30,
                            marginBottom: 5,
                        }]}>Leago Diale</Title>
                    </View>
                </View>
            </View>

            <View style={styles.userDetails}>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.userItem}>
                        <Icon name="account" color="#777777" size={25} />
                        <Text style={styles.userItemText}>Leago</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.userItem}>
                        <Icon name="account" color="#777777" size={25} />
                        <Text style={styles.userItemText}>Diale</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.userItem}>
                        <Icon name="email" color="#777777" size={25} />
                        <Text style={styles.userItemText}>mputitleago@gmail.com</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
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