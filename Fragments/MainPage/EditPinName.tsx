import { useEffect, useState,useContext } from "react";
import { BackHandler, Text, TextInput, TouchableOpacity, View } from "react-native";
import { pinInputStyles } from "./PinNameInputDialog";
import { mainStyle } from "./MainPage";
import { colors } from "../../assets/String/colors";
import { DataContext } from "../..";
import { midColor } from "./PinLayout";
import { lightColor } from "./PinLayout";

export default function EditPinName(props: any){


    const pinData = props.pinData;
    console.log("EditPinName", pinData)

    const {submitEditPinName,onClick} = useContext(DataContext);

    const [pinNameInput,setPinNameInput] = useState("")
    const [colorTrue,setColorTrue]=useState("")
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

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        props.onBackPress
      );

    useEffect(()=>{
        Object.keys(onColorSelected).forEach(key => {
            if (onColorSelected[key as keyof typeof onColorSelected] === true) {
                setColorTrue(key)
            }
        });
    },[onColorSelected])

    const onSubmit = () => {
        const pinNameEdited = {
            pinId:pinData.pinId,
            pinName:pinNameInput ? pinNameInput : pinData.pinName,
            pinColor:colorTrue ? colorTrue : pinData.pinColor,
            startTime: pinData.startTime ? pinData.startTime : "-",
            stopTime: pinData.stopTime ? pinData.stopTime : "-",
            startDate: pinData.startDate ? pinData.startDate : "-",
            stopDate: pinData.stopDate ? pinData.stopDate : "-",
            pinState: pinData.pinState,
            dateStart: pinData.dateStart ? pinData.dateStart  : "-",
            dateStop: pinData.dateStop ? pinData.dateStop : "-"
        }
        console.log(pinNameEdited)
        submitEditPinName(pinNameEdited);
        onClick();
        props.onBackPress();
    }

    console.log("props PinData",pinData);

    return (<View style={pinInputStyles.container}>
            
            {/*Dialog Title*/}
            <View style={[pinInputStyles.field,{backgroundColor:midColor(pinData.pinColor)}]}>
                <Text style={[mainStyle.text, { alignSelf: 'center' }]}>Edit {pinData.pinName}</Text>
            </View>

            {/* Input Layout */}
            <View style={pinInputStyles.pinNameInputLayout}>
                <Text style={[mainStyle.text,{alignSelf:"center"}]}>กรอกชื่อปุ่มใหม่</Text>
                <TextInput onChangeText={value=>{setPinNameInput(value)}} style={[mainStyle.text,pinInputStyles.input,{backgroundColor:lightColor(pinData.pinColor)}]} placeholder="name" />
            </View>

            <Text style={[mainStyle.text,{marginVertical:0,marginHorizontal:"5%"}]}>หมวดหมู่สีใหม่</Text>

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

        </View>)
}