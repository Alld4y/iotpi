import { View } from "react-native"
import { colors } from "../assets/String/colors"
import { useEffect, useState } from "react";
import TT3 from "../Fragments/MainPage/TT3";
import TT5 from "../Fragments/ChartPage/TT5";

export default function FadeTutorial(props: any){
    
const [position,setPosition] = useState({topBoxWidth:194,transparentHeight:72});


    return (
        <View style={{width:"100%",height:position.topBoxWidth,position:"absolute" , top: 0, left:0}}>
            <View style={{width:"100%",height:"100%",backgroundColor:colors.fadeTTColor}}>

            </View>
            <View style={{backgroundColor:"transparent", width:"100%" , height: position.transparentHeight,justifyContent:"space-between", borderRadius:50,flexDirection:"row"}}>
                <View style={{backgroundColor:colors.fadeTTColor, height:"100%",width:"16%"}}></View>
                <View style={{backgroundColor:"transparent", height:"100%",width:"54%",borderRadius:15 }}></View>
                <View style={{backgroundColor:colors.fadeTTColor, height:"100%",width:"21%"}}></View>
            </View>
            <View style={{width:"100%",height:"1000%",backgroundColor:colors.fadeTTColor}}>
            <TT5 onNext={()=>{props.onNext()}}/>
            </View>
        </View>
    )
}