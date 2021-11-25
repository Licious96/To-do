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
  Modal
} from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Data from '../model/Data'

const CompletedScreen = ({ navigation }) => {

  const [listData, setListData] = useState(
    Data.map((dataItem, index) => ({
      key: `${index}`,
      title: dataItem.title,
      details: dataItem.details
    }))
  )
  
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow()
    }
  }

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey)
    const newData = [...listData]
    const prevIndex = listData.findIndex(item => item.key === rowKey)
    newData.splice(prevIndex, 1)
    setListData(newData)
  }

  const editRow = (rowMap, rowKey) => {
    console.log("Edit row")
  }

  const VisibleItem = props => {
    const {data} = props
    return (
        <View style={styles.rowFront}>
          <TouchableOpacity style={styles.rowFrontVisible} onPress={()=> navigation.navigate("EditTask")}>
            <View>
              <Text style={styles.title} numberOfLines={1}>{data.item.title}</Text>
              <Text style={styles.details} numberOfLines={1}>{data.item.details}</Text>
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
          <Icon name='close' size={25} color='#fff' />
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
        onClose={()=> closeRow(rowMap, data.item.key)}
        onDelete={()=> deleteRow(rowMap, data.item.key)}
      />
    )
  }

  return (
      <View style={styles.container}>
        <SwipeListView
          useFlatList
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={70}
          rightOpenValue={-70}
        ></SwipeListView>

        <TouchableOpacity style={styles.floatingActionBtn} onPress={()=> navigation.navigate("AddTask")}>
          <Icon name="plus" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
  )
}

export default CompletedScreen

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
    backgroundColor: 'blue',
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
});