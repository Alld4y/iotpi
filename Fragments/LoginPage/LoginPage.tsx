import { View,StyleSheet,Text,Image,TextInput,TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../..";
import { colors } from "../../assets/String/colors";
import axios from "axios";
import { url } from "../../assets/String/link";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function LoginPage(props:any){

    /* useState */
    const [usernameInput,setUsernameInput]=useState("");
    const [passwordInput,setPasswordInput]=useState("");


    /* Action */
    

    const onLoginClick=()=>{
        console.log("Login Pressed")
        const LoginGetReq = ()=>{
            axios.get(url.api+`/loginRequest/?username=${usernameInput}&&password=${passwordInput}`)
            .then((result)=>{
                if(!result.data)
                    console.log("From LoginPage.tsx : ","Login Failed. No Response From Server");
                else{
                    console.log("From LoginPage.tsx : ","Login Success : uid = ", result.data)
                    AsyncStorage.setItem('uid',String(result.data)).catch((e)=>{console.log("LoginPage line 28 : ",e.message)})
                    props.refresh()
                }
            })  

            }
        
        LoginGetReq();
    }
    useEffect(()=>{
        props.refresh();
    },[])


    /* console.log */
    //console.log("username: ", usernameInput , "  password: ", passwordInput)

    return (
        <View style={loginStyle.container}>
            <Image source={require('../../assets/images/appIconImg.png')} style={loginStyle.logo}></Image>
            <View style={loginStyle.textInputLayout}>
                <TextInput onChangeText={value=>{setUsernameInput(value)}} placeholder="Username" textAlign="center" style={loginStyle.textInput}/>
                <TextInput onChangeText={value=>{setPasswordInput(value)}} placeholder="Password" textAlign="center" style={loginStyle.textInput}/>
            </View>
            <View style={loginStyle.btnLayout}>
                <TouchableOpacity onPress={onLoginClick} activeOpacity={0.7} style={loginStyle.btn}>
                    <Text style={loginStyle.textBtn}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onRegisterClick} activeOpacity={0.7} style={loginStyle.btn}>
                    <Text style={loginStyle.textBtn}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const loginStyle = StyleSheet.create({
    container:{
        paddingTop:"15%",
        flex:1,
        backgroundColor:colors.mainYellow,
        width: '100%',
        justifyContent:"flex-start",
        alignItems:"center"
    },
    logo:{
        height:250,
        width:250,
        marginBottom:"5%"
    },
    textInputLayout:{
        height:150,
        width:"90%"
    },
    textInput:{
        backgroundColor:colors.whiteF0,
        marginVertical:10,
        height:50,
        width:"90%",
        fontSize: 20,
        color:colors.greyText,
        borderRadius:15,
        alignSelf:"center",
    },
    textBtn:{
        color:colors.mainYellow,
        fontSize:28,
        fontFamily:"Prompt-Bold",
        textAlign:"center",
        paddingVertical:5
    },
    btn:{
        backgroundColor:colors.yellowOrange,
        height:50,
        width:"60%",
        borderRadius:15,
        marginVertical:8
    },
    btnLayout:{
        width:"100%",
        alignItems:"center"
    }
})