import { View,StyleSheet,Text,TextInput,TouchableOpacity,Alert,BackHandler } from "react-native";
import { colors } from "../../assets/String/colors";
import { mainStyle } from "../MainPage/MainPage";
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { url } from "../../assets/String/link";
import { DataContext } from "../..";
import { midColor, textPinColor } from "../MainPage/PinLayout";
import TT6 from "./TT6";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ChartPageInputDialog(props: any){
    

    {/* useState */}
    const [chartNameInput,setPinNameInput]=useState("");
    const [startInput,setStartInput] = useState(0);
    const [endInput,setEndInput] = useState(1023);
    const [description,setDescription] = useState("")
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

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        props.onBackPress
      );

    // useContext
    const {onClick,addPieChartData} = useContext(DataContext);

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
        onClick();
        props.onAddPinSubmit();
       addPieChartData({
        id: (Math.random()*100000).toFixed(0).toString(),
        name: chartNameInput,
        start: startInput,
        end: endInput,
        color: colorTrue,
        description: description
       });
       AsyncStorage.setItem('ChartTutorial','Success');
    }

  

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
                <Text style={[mainStyle.text, { alignSelf: 'center', opacity:0.2 , color: textPinColor(colors.mainYellow) , fontSize: 22 , fontWeight:"bold" , letterSpacing: 0.2 }]}>Add New Pie Chart</Text>
            </View>

            {/* Input Layout */}
            <View style={pinInputStyles.pinNameInputLayout}>
                <Text style={[mainStyle.text,{alignSelf:"center"}]}>ชื่อบาร์</Text>
                <TextInput onChangeText={value=>{setPinNameInput(value)}} style={[mainStyle.text,pinInputStyles.input,{color: colors.yellowOrange}]} placeholder="Chart Name" placeholderTextColor={colors.lightYellow} cursorColor={colors.yellowOrange}/>
            </View>
            <View style={pinInputStyles.pinNameInputLayout}>
            <Text style={[mainStyle.text,{alignSelf:"center"}]}>Start</Text>
            <TextInput onChangeText={value=>{setStartInput(Number(value))}} style={[mainStyle.text,pinInputStyles.input,{color: colors.yellowOrange}]} placeholder="0" keyboardType={"number-pad"} placeholderTextColor={colors.lightYellow} cursorColor={colors.yellowOrange}/>
            <Text style={[mainStyle.text,{alignSelf:"center"}]}>End</Text>
            <TextInput onChangeText={value=>{setEndInput(Number(value))}} style={[mainStyle.text,pinInputStyles.input,{color: colors.yellowOrange}]} placeholder="1023" keyboardType={"number-pad"} placeholderTextColor={colors.lightYellow} cursorColor={colors.yellowOrange}/>
            </View>
            <View style={pinInputStyles.pinNameInputLayout}>
                <Text style={[mainStyle.text,{alignSelf:"center"}]}>รายละเอียด</Text>
                <TextInput onChangeText={value=>{setDescription(value)}} style={[mainStyle.text,pinInputStyles.input,{color: colors.yellowOrange}]} placeholder="Chart Description" placeholderTextColor={colors.lightYellow} cursorColor={colors.yellowOrange}/>
            </View>

            <Text style={[mainStyle.text,{marginVertical:0,marginHorizontal:"5%"}]}>สีของบาร์</Text>

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
                <TouchableOpacity onPress={()=>{onSubmit(); props.onSubmit();}} style={[pinInputStyles.btn,{backgroundColor:colors.mainYellow}]}>
                    <Text style={mainStyle.text}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onBackPress} style={[pinInputStyles.btn,{backgroundColor:colors.red}]}>
                    <Text style={mainStyle.text}>Back</Text>
                </TouchableOpacity>
            </View>
            {props.showTT6 && <TT6 onNext={()=>{
                props.onNext();
            }}/>}

        </View>
    )
} 

export const pinInputStyles = StyleSheet.create({
    container:{
    position: 'absolute',
    width:"80%",
    height:480,
    top: 120,
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
        height:"15%",
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