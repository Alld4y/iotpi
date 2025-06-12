import { View,StyleSheet,Text,TextInput,TouchableOpacity,Alert,BackHandler } from "react-native";
import { colors } from "../../assets/String/colors";
import { mainStyle } from "./MainPage";
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { url } from "../../assets/String/link";
import { DataContext } from "../..";
import { darkColor, textPinColor } from "./PinLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PinNameInputDialog(props: any){

    {/* useState */}
    const [pinNameInput,setPinNameInput]=useState("")
    const [onColorSelected,setOnColorSelected]=useState<{
        pink: boolean;
        purple: boolean;
        blue: boolean;
        green: boolean;
        orange: boolean;
    }>({
        pink: false,
        purple: false,
        blue: false,
        green: false,
        orange: false,
    });
    const [colorTrue,setColorTrue]=useState("")

    // useContext
    const {onClick} = useContext(DataContext);

    {/* Function */}

    const onColorPick=(color: string)=>{
        setOnColorSelected({
            pink: false,
            purple: false,
            blue: false,
            green: false,
            orange: false,
            [color]: true,
        });
    }

    const onSubmit=async()=>{
        console.log("Btn Pressed")
        let count = 0
        Object.keys(onColorSelected).forEach(key => {
            if (onColorSelected[key as keyof typeof onColorSelected] === true) {
                const requestPinData = {
                    pinId:(Math.random()*10000).toFixed(0),
                    pinName:pinNameInput,
                    pinColor:key,
                    pinState:false,
                    uid:props.userData.uid
                }
              console.log(url.api + "/addPin",requestPinData);
              console.log(key);
              axios.post(url.api +"/addPin",requestPinData) 
                .then(result => {
                    console.log('Result From API ', result.data);
                    props.onAddPinSubmit()
                    AsyncStorage.setItem('ButtonTutorial','Success')
                    onClick();
                })
                .catch(e => {
                    console.error(e.message);
                    Alert.alert("กรอกข้อมูลไม่ครบถ้วน")
                });
            }
       
        });
        
    }

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        props.onBackPress
      );

    {/* Console.log */}

    useEffect(()=>{
        Object.keys(onColorSelected).forEach(key => {
            if (onColorSelected[key as keyof typeof onColorSelected] === true) {
                setColorTrue(key)
            }
        });
    },[onColorSelected])


    return (
        <View style={pinInputStyles.container}>
            
            {/*Dialog Title*/}
            <View style={pinInputStyles.field}>
                <Text style={[mainStyle.text, { alignSelf: 'center', opacity:0.2 , color: textPinColor(colors.mainYellow) , fontSize: 22 , fontWeight:"bold" , letterSpacing: 0.2}]}>Add New Button</Text>
            </View>

            {/* Input Layout */}
            <View style={pinInputStyles.pinNameInputLayout}>
                <Text style={[mainStyle.text,{alignSelf:"center"}]}>กรอกชื่อปุ่ม</Text>
                <TextInput onChangeText={value=>{setPinNameInput(value)}} style={[mainStyle.text,pinInputStyles.input,{color: (colors.yellowOrange)}]} placeholder="Button" placeholderTextColor={colors.lightYellow}/>
            </View>

            <Text style={[mainStyle.text,{marginVertical:0,marginHorizontal:"5%"}]}>หมวดหมู่สี</Text>

            {/* ColorPicker */}
            <View style={pinInputStyles.colorPickerLayout}>
                <TouchableOpacity onPress={()=>{onColorPick("pink")}} activeOpacity={0.6} style={[pinInputStyles.colorIcon,{backgroundColor:( colorTrue ==="pink" ? colors.darkPink : colors.superlightPink )}]}></TouchableOpacity>
                <TouchableOpacity onPress={()=>{onColorPick("purple")}} activeOpacity={0.6} style={[pinInputStyles.colorIcon,{backgroundColor:( colorTrue ==="purple" ? colors.darkPurple : colors.superlightPurple )}]}></TouchableOpacity>
                <TouchableOpacity onPress={()=>{onColorPick("blue")}} activeOpacity={0.6} style={[pinInputStyles.colorIcon,{backgroundColor:( colorTrue ==="blue" ? colors.darkBlue : colors.superlightBlue )}]}></TouchableOpacity>
                <TouchableOpacity onPress={()=>{onColorPick("green")}} activeOpacity={0.6} style={[pinInputStyles.colorIcon,{backgroundColor:( colorTrue ==="green" ? colors.darkGreen : colors.superlightGreen )}]}></TouchableOpacity>
                <TouchableOpacity onPress={()=>{onColorPick("orange")}} activeOpacity={0.6} style={[pinInputStyles.colorIcon,{backgroundColor:( colorTrue ==="orange" ? colors.darkOrange : colors.superlightOrange )}]}></TouchableOpacity>
            </View>

            {/* Button Submit & Cancel */}
            <View style={pinInputStyles.btnLayout}>
                <TouchableOpacity onPress={onSubmit} style={[pinInputStyles.btn,{backgroundColor:colors.mainYellow}]}>
                    <Text style={mainStyle.text}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onBackPress} style={[pinInputStyles.btn,{backgroundColor:colors.red}]}>
                    <Text style={mainStyle.text}>Back</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
} 

export const pinInputStyles = StyleSheet.create({
    container:{
    position: 'absolute', // ใช้ absolute แทน fixed
    width:"80%",
    height:340,
    top:"12%",
    right:"10%",
    backgroundColor: colors.white,
    borderRadius: 15,
    zIndex: 10, // ให้กล่องแสดงอยู่ด้านบน
    elevation: 5, // เงาสำหรับ Android
    shadowColor: '#000', // เงาสำหรับ iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 5,
    justifyContent:"flex-start"
    },
    field:{
        height:70,
        width:"100%",
        backgroundColor:colors.lightYellow,
        borderRadius:15,
        textAlign:"center",
        justifyContent:"center",
    },
    pinNameInputLayout:{
        flexDirection:"row",
        alignItems:"flex-start",
        justifyContent:"flex-start",
        marginHorizontal:"5%",
        marginVertical:"5%",
    },
    input:{
        alignSelf:"center",
        backgroundColor:colors.lightYellowOpacity,
        borderStyle:"solid",
        borderRadius:10,
        padding:5,
        paddingTop:10,
        flex:1,
        marginHorizontal:10
    },
    colorIcon:{
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:colors.grey,
        shadowOffset:{width:0,height:0},
        shadowColor:colors.black,
        shadowRadius:5,
        shadowOpacity:1,
        elevation:0.1,
        zIndex: 10
    },
    colorPickerLayout:{
        flexDirection:"row",
        justifyContent:"space-around",
        paddingHorizontal:"5%",
        marginVertical:"4%"
    },
    btnLayout:{
        flexDirection:"row",
        justifyContent:"space-around"
    },
    btn:{
        width:100,
        height:50,
        marginTop:"3%",
        borderRadius:15,
        shadowOffset:{width:0,height:0},
        shadowColor:colors.black,
        shadowRadius:5,
        shadowOpacity:1,
        elevation:5,
        alignItems:"center",
        justifyContent:"center"
    }
});