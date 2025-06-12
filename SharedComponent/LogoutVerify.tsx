import { Text, TouchableOpacity, View } from "react-native";
import { color, darkColor, lightColor, midColor, textPinColor } from "../Fragments/MainPage/PinLayout";
import { colors } from "../assets/String/colors";
import { mainStyle } from "../Fragments/MainPage/MainPage";
import { pinInputStyles } from "../Fragments/MainPage/PinNameInputDialog";
import  AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { DataContext } from "..";

export default function DeleteChartVerify(props: any){

    const {onClick} = useContext(DataContext);


    return (
        <View style={{width:350 ,  height: 270 , backgroundColor: colors.white , borderRadius: 15, boxShadow: "0 0 15 -4" , position:"absolute" , top: 150 , right: "50%" , transform: [{translateX: "50%"}] , zIndex:100}}>
            <View style={{width:"100%" , height: 65 , backgroundColor: colors.mainYellow , borderRadius: 15 , justifyContent:"center"}}>
                <Text style={ mainStyle.textHeader}>Log Out</Text>                
            </View>

            {/* Field */}

            <Text style={{fontSize:18 , textAlign:"center" , color: colors.greyText , marginVertical: 40}}>Confirm to Log Out ? </Text>
            <View style={{flexDirection:"row" , justifyContent:"center" , alignItems:"center"}}>

            
            </View>
            <View style={pinInputStyles.btnLayout}>
                <TouchableOpacity onPress={() => {
                    AsyncStorage.setItem('uid', '')
                        .then(() => {
                        console.log('Log Out');
                        props.onLogoutPress();
                        })
                        .catch((e: Error) => {
                        console.log(e.message);
                        });
                    }
            
                } style={[pinInputStyles.btn,{backgroundColor:colors.mainYellow}]}>
                    <Text style={mainStyle.text}>Log Out</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    props.logOutCancel();
                }} style={[pinInputStyles.btn,{backgroundColor:colors.red}]}>
                    <Text style={mainStyle.text}>Back</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

