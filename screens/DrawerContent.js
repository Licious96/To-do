import React from "react";
import {View, StyleSheet, ScrollView,} from 'react-native'
import { DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import { Avatar, Title, Paragraph, Caption, Drawer, Text, TouchableRipple, Switch} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export function DrawerContent(props){
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}> 
                        <View style={styles.profileSection}>
                            <Avatar.Image 
                                source={{
                                    uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fuser-sign-icon-person-symbol-human-avatar-vector-12693195&psig=AOvVaw2btvymkJ_Oli0oEmJrti5H&ust=1637772513093000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjZ55j4rvQCFQAAAAAdAAAAABAJ"
                                }}
                                size={70}
                            />
                            <View>
                                <Title style={styles.title}>Leago Diale</Title>
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
                            onPress={()=>{props.navigation.navigate("ProfileStack")}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                name="format-list-bulleted"
                                color={color}
                                size={size} />
                            )}
                            label="To-do tasks"
                            onPress={()=>{props.navigation.navigate("ToDo")}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                name="check"
                                color={color}
                                size={size} />
                            )}
                            label="Finished tasks"
                            onPress={()=>{props.navigation.navigate("")}}
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
                    onPress={()=>{}}
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