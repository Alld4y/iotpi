import { Text, TouchableOpacity, View } from "react-native";
import { color, darkColor, lightColor, midColor, textPinColor } from "../MainPage/PinLayout";
import { colors } from "../../assets/String/colors";
import { mainStyle } from "../MainPage/MainPage";
import { pinInputStyles } from "./ChartPageInputDialog";
import { TextInput } from "react-native-gesture-handler";
import { DataContext } from "../..";
import { useContext, useEffect, useState } from "react";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome'

export default function DeleteChartVerify(props: any){
    const {focusChartData,deletePieChart} = useContext(DataContext)
    const [pinIdVerify , setPinIdVerify] = useState(0);
    const [boolFromVerifyCheck , setBoolFromVerifyCheck] = useState(false)

    useEffect(()=>{
        const verifyCheck = focusChartData.id === pinIdVerify;
        if(verifyCheck){
            console.log("PinId Verify Correct")
            setBoolFromVerifyCheck(true)
        }else{
            setBoolFromVerifyCheck(false);
        }
    },[pinIdVerify])

    return (
        <View style={{width:350 ,  height: 270 , backgroundColor: colors.white , borderRadius: 15, boxShadow: "0 0 15 -4" , position:"absolute" , top: 50 , right: "50%" , transform: [{translateX: "50%"}] , zIndex:100}}>
            <View style={{width:"100%" , height: 65 , backgroundColor: midColor(focusChartData.color) , borderRadius: 15 , justifyContent:"center"}}>
                <Text style={ mainStyle.textHeader}>Delete Chart ID : {focusChartData.id} </Text>                
            </View>

            {/* Field */}

            <Text style={{fontSize:18 , textAlign:"center" , color: midColor(focusChartData.color) }}>  {'\n'} Verify the Chart ID to Delete </Text>
            <View style={{flexDirection:"row" , justifyContent:"center" , alignItems:"center"}}>

            <TextInput onChangeText={(value: any)=>{setPinIdVerify(value)}} style={{backgroundColor: midColor(focusChartData.color) , opacity: 0.5 , width: 150 , alignSelf:"center" , marginTop: 16 , marginBottom: 8 , fontSize: 22 , textAlign:"center" , borderRadius:12 , color: textPinColor(focusChartData.color)}} maxLength={5} keyboardType="number-pad"/>
            { boolFromVerifyCheck &&
                <View style={{marginLeft:10 , position:"absolute" , top: 28 , right: 60}}>
            <FontAwesome5 size={30} name="check-circle" color={colors.green}></FontAwesome5>
            </View>}
            </View>
            <View style={pinInputStyles.btnLayout}>
                <TouchableOpacity onPress={()=>{
                    if(boolFromVerifyCheck){
                        deletePieChart({id: focusChartData.id , name: focusChartData.name , color: focusChartData.color , description: focusChartData.description , start: focusChartData.start , end: focusChartData.end});
                        props.deleteOnBack();
                    }
                }} style={[pinInputStyles.btn,{backgroundColor:colors.mainYellow}]}>
                    <Text style={mainStyle.text}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{props.deleteOnBack();}} style={[pinInputStyles.btn,{backgroundColor:colors.red}]}>
                    <Text style={mainStyle.text}>Cancel</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

