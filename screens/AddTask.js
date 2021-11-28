import React, {useEffect, useState} from 'react'
import { View, TextInput, Button, Text, Alert, ToastAndroid } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTask = ({navigation, route}) => {

    const [text, setText] = useState('')
    const [user_id, setUser_id] = useState(null)
    const [error, setError] = useState([])
    const [visible, setVisible] = useState(false)

    useEffect(async () => {
        const user_id = await AsyncStorage.getItem("user_id")
        setUser_id(user_id)
    }, [user_id])

    const add_task = async () => {
        
        try {
            const formData = new FormData()
            formData.append('title', text)
            const res = await axios.post(`http://127.0.0.1:8000/api/create/${user_id}`, formData)
            ToastAndroid.show("New task added", ToastAndroid.SHORT);
            navigation.navigate("HomeScreen")
        } catch (error) {
            setError(error.response.data)
        }

    }
    return (
        <View style={{ margin: 20 }}>
            <TextInput
                placeholder="Add task here"
                placeholderTextColor='gray'
                style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontFamily: 'Roboto',
                    borderBottomWidth: 3,
                    borderColor: "skyblue",
                    marginTop: 20,
                    fontSize: 20
                }}
                onChangeText={(text) => setText(text)}
            />
            {error?.title ? <Text style={{ color: '#FF0000', fontSize: 14, }}>{error.title}</Text> : null}
            <View style={{ marginTop: 15 }}>
                <Button title='Save' onPress={add_task} />
            </View>

        </View>
    )
}

export default AddTask
