import React from 'react'
import { View, TextInput, Button } from 'react-native'

const AddTask = ({navigation}) => {
    return (
        <View>
            <TextInput
                placeholder="Add task here"
                placeholderTextColor= 'gray'
                style={{
                paddingLeft: 10,
                paddingRight: 10,
                fontFamily: 'Roboto',
                borderBottomWidth: 3,
                borderColor: "skyblue",
                margin: 20,
                fontSize: 20
                }}
            />
            <View  style={{margin:15}}>
                <Button title='Add task' onPress={()=> navigation.navigate("HomeScreen")}/>
            </View>
        </View>
    )
}

export default AddTask
