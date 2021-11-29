import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Platform,
  ToastAndroid
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { useTheme } from 'react-native-paper';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import Constants from 'expo-constants';

const EditProfileScreen = ({route, navigation}) => {

  let {userObj} = route.params

  const [image, setImage] = useState(userObj.image);
  const { colors } = useTheme();
  const [user_id, setUser_id] = useState()
  const [user, setUser] = useState([])
  const [f_name, setF_name] = useState(userObj.f_name)
  const [l_name, setL_name] = useState(userObj.l_name)
  const [errors, setErrors] = useState([])
  const { manifest } = Constants
  const url = `http://${manifest.debuggerHost.split(':').shift().concat(':8000')}/api`

  useEffect(async () => {
    const user_idd = await AsyncStorage.getItem("@user_id")
    const id = JSON.parse(user_idd)
    setUser_id(id)
  }, [user_id])

  useEffect(async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert("Permission denied!")
      }
    }
  }, [])

  useEffect(async () => {
    try {
      const res = await axios.get(`${url}/get_user/${user_id}`)
      setUser(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [user_id])

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const update = async () => {

    const formData = new FormData()
    formData.append('image', image)
    formData.append('f_name', f_name)
    formData.append('l_name', l_name)

    try {
      const res = await axios.post(`${url}/update_user/${user_id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      navigation.navigate("HomeScreen")
      ToastAndroid.show("Your profile was updated", ToastAndroid.SHORT);
    } catch (error) {
      setErrors(error.response.data)
    }
  }



  return (
    <SafeAreaView style={styles.container}>

      <View style={{ alignItems: 'center', marginBottom: 25 }}>
        <TouchableOpacity onPress={PickImage}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              source={{
                uri: image !== null ? image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
              }}
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 15 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="camera"
                  size={35}
                  color="#fff"
                  style={{
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                  }}
                />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.action}>
        <FontAwesome name="user-o" color={colors.text} size={20} />
        <TextInput onChangeText={(text) => setF_name(text)} placeholder="First Name" placeholderTextColor="#666666" defaultValue={userObj.f_name}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      {errors?.f_name ? <Text style={styles.errorMsg}>{errors.f_name}</Text> : null}

      <View style={styles.action}>
        <FontAwesome name="user-o" color={colors.text} size={20} />
        <TextInput onChangeText={(text) => setL_name(text)} placeholder="Last Name" placeholderTextColor="#666666" defaultValue={userObj.l_name}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      {errors?.l_name ? <Text style={styles.errorMsg}>{errors.l_name}</Text> : null}
      <TouchableOpacity style={styles.commandButton} onPress={update}>
        <Text style={styles.panelButtonTitle}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#08d4c4',
    alignItems: 'center',
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 10,
  },
});