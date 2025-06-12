import { Text, TouchableOpacity, View } from "react-native";
import { color, darkColor, lightColor, midColor, textPinColor } from "./PinLayout";
import { colors } from "../../assets/String/colors";
import { mainStyle } from "./MainPage";
import { pinInputStyles } from "../ChartPage/ChartPageInputDialog";
import { TextInput } from "react-native-gesture-handler";
import { DataContext } from "../..";
import { useContext, useEffect, useState } from "react";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome'
import axios from "axios";
import { url } from "../../assets/String/link";

export default function DeletePinVerify(props: any){
    const {focusChartData,deletePieChart} = useContext(DataContext)
    const [pinIdVerify , setPinIdVerify] = useState(0);
    const [boolFromVerifyCheck , setBoolFromVerifyCheck] = useState(false)

    const {onClick} = useContext(DataContext);
    const {pinColor,pinId} = props.pinData;


    useEffect(()=>{
        const verifyCheck = pinId === pinIdVerify;
        if(verifyCheck){
            console.log("PinId Verify Correct")
            setBoolFromVerifyCheck(true)
        }else{
            setBoolFromVerifyCheck(false);
        }
    },[pinIdVerify])


    async function deletePin(){
            try {
                if(boolFromVerifyCheck){
                    props.onDeletePinClose();
                console.log('Delete Pin Click');
                const res = await axios.get(
                  url.api + `/deletePin/?uuid=${props.uid}&pinId=${pinId}`,
                );
                console.log(res.data);
                onClick();
                }
              } catch (err) {}  
    }

    return (
        <View style={{width:350 ,  height: 270 , backgroundColor: colors.white , borderRadius: 15, boxShadow: "0 0 15 -4" , position:"absolute" , top: 160 , right: "50%" , transform: [{translateX: "50%"}] , zIndex:100}}>
            <View style={{width:"100%" , height: 65 , backgroundColor: midColor(pinColor) , borderRadius: 15 , justifyContent:"center"}}>
                <Text style={ mainStyle.textHeader}>Delete Button ID : {pinId} </Text>                
            </View>

            {/* Field */}

            <Text style={{fontSize:18 , textAlign:"center" , color: midColor(pinColor) }}>  {'\n'} Verify the Button ID to Delete </Text>
            <View style={{flexDirection:"row" , justifyContent:"center" , alignItems:"center"}}>

            <TextInput onChangeText={(value: any)=>{setPinIdVerify(value)}} style={{backgroundColor: midColor(pinColor) , opacity: 0.5 , width: 150 , alignSelf:"center" , marginTop: 16 , marginBottom: 8 , fontSize: 22 , textAlign:"center" , borderRadius:12 , color: textPinColor(pinColor)}} maxLength={5} keyboardType="number-pad"/>
            { boolFromVerifyCheck &&
                <View style={{marginLeft:10 , position:"absolute" , top: 28 , right: 60}}>
            <FontAwesome5 size={30} name="check-circle" color={colors.green}></FontAwesome5>
            </View>}
            </View>
            <View style={pinInputStyles.btnLayout}>
                <TouchableOpacity onPress={deletePin} style={[pinInputStyles.btn,{backgroundColor:colors.mainYellow}]}>
                    <Text style={mainStyle.text}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{props.onDeletePinClose();}} style={[pinInputStyles.btn,{backgroundColor:colors.red}]}>
                    <Text style={mainStyle.text}>Cancel</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

