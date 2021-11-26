import React, {useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

import { useTheme } from 'react-native-paper';
import axios from 'axios';

const Login = ({navigation}) => {
    const { colors } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const { manifest } = Constants

    const loginHandle = async() => {

        //const url = `http://${manifest.debuggerHost.split(':').shift().concat(':8000')}/api`
        
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)

        // axios.post(`${url}/login`, formData)
        // .then(res => console.log(res.data))
        // .catch(err => console.log(err.response.data))

       try {
           const res = await axios.post(`http://127.0.0.1:8000/api/login`, formData)
           await AsyncStorage.setItem('@user_id', JSON.stringify(res.data.id))
       } catch (error) {
           setErrors(error.response.data)
       }
    }

    

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View  animation="fadeInUpBig" style={[styles.footer, { backgroundColor: colors.background}]} >
            <Text style={styles.errorMsg}>{errors.msg}</Text>
            <Text style={styles.text_footer, { marginTop: 35}}>Email</Text>
            <View style={styles.action}>
                <FontAwesome name="envelope-o" color="#05375a" size={20}/>
                <TextInput onChangeText={(text) => setEmail(text)} placeholder="Your email"  autoCapitalize='none' keyboardType="email-address" style={styles.textInput} />
            </View>
            <Animatable.View animation="fadeInLeft" duration={500}>
                {errors?.email ? <Text style={styles.errorMsg}>{errors.email}</Text>: null}
            </Animatable.View>

            <Text style={[styles.text_footer, { marginTop: 35}]}>Password</Text>
            <View style={styles.action}>
                <Feather name="lock" color="#05375a" size={20} />
                <TextInput secureTextEntry={true} onChangeText={(text) => setPassword(text)}  placeholder="Your password" style={styles.textInput} />
            </View>
            <Animatable.View animation="fadeInLeft" duration={500}>
            {errors?.password ? <Text style={styles.errorMsg}>{errors.password}</Text>: null}
            </Animatable.View>

            <View style={styles.button}>
                <TouchableOpacity style={styles.signIn} onPress={loginHandle} >
                    <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn} >
                        <Text style={[styles.textSign, {color:'#fff' }]}>Sign In</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Register")} style={[styles.signIn, { borderColor: '#009387',borderWidth: 1, marginTop: 15 }]} >
                    <Text style={[styles.textSign, { color: '#009387' }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
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
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });