import { View,StyleSheet,Text,TextInput,TouchableOpacity,Alert,BackHandler } from "react-native";
import { colors } from "../../assets/String/colors";
import { mainStyle } from "../MainPage/MainPage";
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { url } from "../../assets/String/link";
import { DataContext } from "../..";
import { pinInputStyles } from "./ChartPageInputDialog";
import { darkColor, lightColor, midColor, textPinColor } from "../MainPage/PinLayout";


export default function ConfigPieChart(props: any){

    const {onClick,addPieChartData , focusChartData , onSubmitConfigChart} = useContext(DataContext);
    

    {/* useState */}
    const [chartNameInput,setPinNameInput]=useState(focusChartData.name);
    const [startInput,setStartInput] = useState(focusChartData.start);
    const [endInput,setEndInput] = useState(focusChartData.end);
    const [description,setDescription] = useState(focusChartData.description)
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
    const [colorTrue,setColorTrue]=useState(focusChartData.color)

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        props.onBackPress
      );

    // useContext

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
       props.onConfigBackPress();
        onSubmitConfigChart({
        id: focusChartData.id,
        name: String(chartNameInput).trim() ? chartNameInput : focusChartData.name,
        start: String(startInput).trim() ? String(startInput).trim() : focusChartData.start,
        end: String(endInput).trim() ? String(endInput).trim() : focusChartData.end,
        color: colorTrue,
        description: String(description).trim() ? description : focusChartData.description,
       });

    }

  

    {/* Console.log */}

    useEffect(()=>{
        Object.keys(onColorSelected).forEach(key => {
            if (onColorSelected[key as keyof typeof onColorSelected] === true) {
                setColorTrue(key)
            }
        });
    },[onColorSelected])

    const handleKeyPress = (value : any) => {
        // ตรวจสอบว่าเป็นตัวเลขเท่านั้น
        console.log(value)
        if (typeof(value) === "number") {
          setStartInput(startInput + value)
        }
      };


    return (
        <View style={pinInputStyles.container}>
            
            {/*Dialog Title*/}
            <View style={[pinInputStyles.field,{backgroundColor: midColor(focusChartData.color)}]}>
                <Text style={[mainStyle.text, { alignSelf: 'center', opacity:0.4 , color: textPinColor(focusChartData.color) , fontSize: 22 , fontWeight:"bold" , letterSpacing: 0.2}]}>Configure Chart ID : {focusChartData.id}</Text>
            </View>

            {/* Input Layout */}
            <View style={pinInputStyles.pinNameInputLayout}>
                <Text style={[mainStyle.text,{alignSelf:"center"}]}>ชื่อบาร์</Text>
                <TextInput onChangeText={value=>{setPinNameInput(value)}} style={[mainStyle.text,pinInputStyles.input,{backgroundColor: lightColor(focusChartData.color) , color: midColor(focusChartData.color)}]} placeholder={focusChartData.name} defaultValue={focusChartData.name}/>
            </View>
            <View style={pinInputStyles.pinNameInputLayout}>
            <Text style={[mainStyle.text,{alignSelf:"center"}]}>Start</Text>
            <TextInput onKeyPress={handleKeyPress} style={[mainStyle.text,pinInputStyles.input,{backgroundColor: lightColor(focusChartData.color) , color: midColor(focusChartData.color)}]} placeholder={focusChartData.start} defaultValue={focusChartData.start} keyboardType={"number-pad"}/>
            <Text style={[mainStyle.text,{alignSelf:"center"}]}>End</Text>
            <TextInput onChangeText={value=>{setEndInput(Number(value))}} style={[mainStyle.text,pinInputStyles.input,{backgroundColor: lightColor(focusChartData.color) , color: midColor(focusChartData.color)}]} placeholder={focusChartData.end} defaultValue={focusChartData.end} keyboardType={"number-pad"}/>
            </View>
            <View style={pinInputStyles.pinNameInputLayout}>
                <Text style={[mainStyle.text,{alignSelf:"center"}]}>รายละเอียด</Text>
                <TextInput onChangeText={value=>{setDescription(value)}} style={[mainStyle.text,pinInputStyles.input,{backgroundColor: lightColor(focusChartData.color) , color: midColor(focusChartData.color)}]} placeholder={focusChartData.description} defaultValue={focusChartData.description}/>
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
                <TouchableOpacity onPress={()=>{onSubmit(); onClick();}} style={[pinInputStyles.btn,{backgroundColor:colors.mainYellow}]}>
                    <Text style={mainStyle.text}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{props.onConfigBackPress();}} style={[pinInputStyles.btn,{backgroundColor:colors.red}]}>
                    <Text style={mainStyle.text}>Back</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
} 

