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

const Search = () => {
    const [text, onChangeText] = useState("")

    return (
        <View >
            <View style={styles.seachBar}>
                <TouchableOpacity style={styles.seachBarBack}>
                    <Icon name='arrow-left' size={20} color='#000' />
                </TouchableOpacity>
                <View style={styles.seachBarInputView}>
                    <TextInput onChangeText={onChangeText} value={text} style={styles.seachBarInput} />
                </View>
                <TouchableOpacity style={styles.seachBarSend}>
                    <Icon name='send' size={20} color='#000' />
                </TouchableOpacity>
            </View>
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
    }
})
