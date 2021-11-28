import React, { useEffect, useState } from 'react'
import axios from "axios";

useEffect(async () => {
    const user_id = await AsyncStorage.getItem("user_id")
    setUser_id(user_id)
}, [user_id])

useEffect(async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/fetch/${user_id}`)

    console.log(res.data)

    // todoList.map((dataItem, index) => ({
    //   key: `${index}`,
    //   id: dataItem.id,
    //   title: dataItem.title
    // }))

    // console.log(todoList)
}, [user_id])