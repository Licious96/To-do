import axios from 'axios'
import React, {useState} from 'react'
import { View, TextInput, Button, Text } from 'react-native'

const EditTask = ({route, navigation}) => {

    let {item} = route.params
    const [text, setText] = useState(item.title)
    const [error, setError] = useState([])

    const edit_task = async() => {

        try {
            const formData = new FormData()
            formData.append('title', text)
            const res = await axios.post(`http://127.0.0.1:8000/api/update/${item.id}`, formData)
            navigation.goBack()
        } catch (error) {
            setError(error.response.data)
        }
       
    }

    return (
        <View style={{margin: 20}}>
            <TextInput
                placeholder="Add task here"
                placeholderTextColor= 'gray'
                defaultValue={item.title}
                style={{
                paddingLeft: 10,
                paddingRight: 10,
                fontFamily: 'Roboto',
                borderBottomWidth: 3,
                borderColor: "skyblue",
                marginTop: 20,
                fontSize: 20
                }}
                onChangeText={(text)=>setText(text)}
            />
            {error?.title ? <Text style={{color: '#FF0000',fontSize: 14,}}>{error.title}</Text> : null}
            <View  style={{marginTop:15}}>
                <Button title='Save' onPress={edit_task}/>
            </View>
        </View>
    )
}

export default EditTask
