import React, { useEffect, useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
  TextInput
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Search = ({navigation}) => {
    const [text, setText] = useState("")
    const [user_id, setUser_id] = useState(null)
    const [results, setResults] = useState([])

    useEffect(async () => {
        const user_id = await AsyncStorage.getItem("user_id")
        setUser_id(user_id)
    }, [user_id])

    const search = async () => {

        const formData = new FormData()
        formData.append('title', text)
        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/search/${user_id}`, formData)
            setResults(res.data)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <View >
            <View style={styles.seachBar}>
                <TouchableOpacity style={styles.seachBarBack}>
                    <Icon name='arrow-left' size={20} color='#000' onPress={()=>navigation.navigate("HomeScreen")}/>
                </TouchableOpacity>
                <View style={styles.seachBarInputView}>
                    <TextInput onChangeText={setText} onKeyPress={search} value={text} style={styles.seachBarInput} />
                </View>
                <TouchableOpacity style={styles.seachBarSend} onPress={()=> setText("")}>
                    <Icon name='close' size={20} color='#000' />
                </TouchableOpacity>
            </View>

            {
                (() => {
                    if (results.length !== 0) {
                        return (
                            results.map(items => (
                                <View style={styles.rowFront}>
                                    <TouchableOpacity style={styles.rowFrontVisible}>
                                        <View>
                                            <Text style={styles.title}>{items.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))
                        )
                    } 
                    if(text) {
                        return (
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.title}>Could not find {text}</Text>
                            </View>
                        )
                    }
                })()
                
            }

        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    seachBar: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        margin: 5,
        marginBottom: 15,
        borderRadius: 5,
        height: 150
    },
    seachBarBack: {
        alignItems: 'flex-start',
        flex: 1,
    },
    seachBarInputView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 7,
    },
    seachBarInput: {
        height: 30, 
        alignSelf: "stretch",
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: '#DDD',
        color: "#000",
        padding: 10,
        fontSize: 20,
        fontFamily: 'Roboto',
        borderRadius: 10
    },
    seachBarSend: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1,
    },
    rowFront: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        margin: 5,
        marginBottom: 15,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    rowFrontVisible: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        padding: 10,
        marginBottom: 15,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        margin: 5,
        color: '#666',
    },
})
