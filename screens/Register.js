import React, {useState } from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({navigation}) => {

    const [f_name, setF_name] = useState('')
    const [l_name, setL_name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')
    const [errors1, setErrors1] = useState({})

    const register = async() => {

        const formData = new FormData()
        formData.append('f_name', f_name)
        formData.append('l_name', l_name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('password_confirmation', password_confirmation)

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/register", formData)
            //console.log(res.data)
        } catch (error) {
            setErrors1(error.response.data)
        }
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <ScrollView>
                <Text style={styles.text_footer}>First Name</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color="#05375a" size={20}/>
                    <TextInput onChangeText={(text) => setF_name(text)} placeholder="Your first name" style={styles.textInput} />
                 </View>
                {errors1?.f_name ? <Text style={styles.errorMsg}>{errors1.f_name}</Text>: null}

                <Text style={styles.text_footer, { marginTop: 35}}>Last Name</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color="#05375a" size={20} />
                    <TextInput onChangeText={(text) => setL_name(text)} placeholder="Your last name" style={styles.textInput} autoCapitalize="none" />
                 </View>
                {errors1?.l_name ? <Text style={styles.errorMsg}>{errors1.l_name}</Text>: null}

                <Text style={styles.text_footer, { marginTop: 35}}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome name="envelope-o" color="#05375a" size={20}/>
                    <TextInput keyboardType="email-address" onChangeText={(text) => setEmail(text)} placeholder="Your email" style={styles.textInput} autoCapitalize='none'/>
                </View>
                {errors1?.email ? <Text style={styles.errorMsg}>{errors1.email}</Text>: null}

                <Text style={[styles.text_footer, { marginTop: 35}]}>Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" color="#05375a" size={20} />
                    <TextInput secureTextEntry={true} onChangeText={(text) => setPassword(text)} placeholder="Your password" style={styles.textInput} autoCapitalize="none" />
                </View>
                {errors1?.password ? <Text style={styles.errorMsg}>{errors1.password}</Text>: null}

                <Text style={[styles.text_footer, {marginTop: 35}]}>Confirm Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" color="#05375a"size={20} />
                    <TextInput secureTextEntry={true} onChangeText={(text) => setPassword_confirmation(text)} placeholder="Confirm your password" style={styles.textInput} />
                </View>
                {errors1?.password ? <Text style={styles.errorMsg}>{errors1.password}</Text>: null}

                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={register} >
                        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn} >
                            <Text style={[styles.textSign, {color:'#fff' }]}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.signIn, { borderColor: '#009387',borderWidth: 1, marginTop: 15 }]} >
                        <Text style={[styles.textSign, { color: '#009387' }]}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

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