import { View,StyleSheet,Text,Image,TextInput,TouchableOpacity, Alert } from "react-native";
import { useState,useRef } from "react";
import { loginStyle } from "../../LoginPage/LoginPage";
import { colors } from "../../../assets/String/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../../assets/String/link";
import axios from "axios";

export default function RegisterPage(props:any){


    /* useState */
    const [usernameInput,setUsernameInput]=useState("");
    const [passwordInput,setPasswordInput]=useState("");
    const [emailInput,setEmailInput]=useState("");

    /* Action */
    const onRegisterClick=()=>{
        console.log("regis")

        const saveInputToStorage=async()=>{
            await AsyncStorage.setItem('username',usernameInput);
            await AsyncStorage.setItem('password',passwordInput);
        }
        saveInputToStorage();

        const userRegister = async() => {
            console.log("send")
            const res = await axios.post(url.api+'/userRegister',{ username: usernameInput, password: passwordInput, email: emailInput});
            console.log(res.data);
            if(res.data === 'usernameError' || res.data === 'emailError'){
                Alert.alert('Register Failed','Username or Email already in use.');
            }else{
                props.backToLoginPage();
            }
        }
        userRegister();
        
    }

    /* console.log */
    //console.log("username: ", usernameInput , "  password: ", passwordInput)

    return (
        <View style={loginStyle.container}>
            <Image source={require('../../../assets/images/appIconImg.png')} style={loginStyle.logo}></Image>
            <View style={[loginStyle.textInputLayout,{height:210}]}>
                <TextInput onChangeText={value=>{setUsernameInput(value)}} placeholder="Username" textAlign="center" style={loginStyle.textInput}/>
                <TextInput onChangeText={value=>{setPasswordInput(value)}} placeholder="Password" textAlign="center" style={loginStyle.textInput}/>
                <TextInput onChangeText={value=>{setEmailInput(value)}} placeholder="Email" textAlign="center" style={loginStyle.textInput}/>
            </View>
            <View style={loginStyle.btnLayout}>
                <TouchableOpacity onPress={onRegisterClick} activeOpacity={0.7} style={loginStyle.btn}>
                    <Text style={loginStyle.textBtn}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onBackPress} activeOpacity={0.7} style={loginStyle.btn}>
                    <Text style={loginStyle.textBtn}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
