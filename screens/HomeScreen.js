import React, { useEffect, useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
  TouchableHighlight,
  StatusBar,
  ToastAndroid
} from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {

  const [user_id, setUser_id] = useState(null)
  const [data, setData] = useState([])

  useEffect(async () => {
    const user_id = await AsyncStorage.getItem("user_id")
    setUser_id(user_id)
  }, [user_id])

  useFocusEffect(
    React.useCallback(async () => {
    
    const res = await axios.get(`http://127.0.0.1:8000/api/fetch_todo/${user_id}`)

    if (res.data.length !== 0) {
      const todoList = res.data.map((dataItem, index) => ({
        key: `${index}`,
        id: dataItem.id,
        title: dataItem.title
      }))

      setData(todoList)
    }

  }, [user_id]))

  

  const closeRow = async(rowMap, rowKey, rowId) => {
    
    try {
      const res = await axios.post(`http://localhost:8000/api/done/${rowId}`)
      setData(data.filter(item => item.id !== rowId))
      ToastAndroid.show("Item moved to completed tasks", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error)
    }
  }

  const deleteRow = async(rowMap, rowKey, rowId) => {

    try {
      const res = await axios.delete(`http://localhost:8000/api/destroy/${rowId}`)
      setData(data.filter(item => item.id !== rowId))
      ToastAndroid.show("Item deleted", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error)
    }

  }

  const VisibleItem = props => {
    const { data } = props
    return (
      <View style={styles.rowFront}>
        <TouchableOpacity style={styles.rowFrontVisible} onPress={() => navigation.navigate("EditTask", {item: data.item})}>
          <View>
            <Text style={styles.title} numberOfLines={1}>{data.item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const renderItem = (data, rowMap) => {
    return (
      <VisibleItem data={data} />
    )
  }

  const HiddenItemWithAction = props => {
    const {
      onClose,
      onDelete,
    } = props

    return (
      <View style={styles.rowBack}>
        <TouchableOpacity style={[styles.backLeftBtn, styles.backLeftBtnLeft]} onPress={onClose}>
          <Icon name='check' size={25} color='#fff' />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete}>
          <Icon name='trash-can-outline' size={25} color='#fff' />
        </TouchableOpacity>
      </View>

    )
  }

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenItemWithAction
        data={data}
        rowMap={rowMap}
        onClose={() => closeRow(rowMap, data.item.key, data.item.id)}
        onDelete={() => deleteRow(rowMap, data.item.key, data.item.id)}
      />
    )
  }

  return (
    <View style={styles.container}>
      <SwipeListView
        data={data}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={70}
        rightOpenValue={-70}
      ></SwipeListView>

      <TouchableOpacity style={styles.floatingActionBtn} onPress={() => navigation.navigate("AddTask")}>
        <Icon name="plus" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
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
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backLeftBtn: {
    alignItems: 'flex-start',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingLeft: 17,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backLeftBtnLeft: {
    backgroundColor: 'green',
    left: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
  floatingActionBtn: {
    backgroundColor: "#009387",
    width: 55,
    height: 55,
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
});