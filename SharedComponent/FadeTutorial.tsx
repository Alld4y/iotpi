import { View } from "react-native"
import { colors } from "../assets/String/colors"
import { useEffect, useState } from "react";
import TT3 from "../Fragments/MainPage/TT3";

export default function FadeTutorial(props: any){
    
const [position,setPosition] = useState({topBoxWidth:410,transparentHeight:72});

    useEffect(()=>{
        console.log(props.showUID)
        if(props.showUID === false){
            setPosition({topBoxWidth:410,transparentHeight:72})
        }else{
            setPosition({topBoxWidth:443,transparentHeight:72})
        }
    },[props.showUID])
    return (
        <View style={{width:"100%",height:position.topBoxWidth,position:"absolute" , top: 0, left:0}}>
            <View style={{width:"100%",height:"100%",backgroundColor:colors.fadeTTColor}}>

            </View>
            <View style={{backgroundColor:"transparent", width:"100%" , height: position.transparentHeight,justifyContent:"space-between", borderRadius:50,flexDirection:"row"}}>
                <View style={{backgroundColor:colors.fadeTTColor, height:"100%",width:"20%"}}></View>
                <View style={{backgroundColor:"transparent", height:"100%",width:"23%",borderRadius:15 }}></View>
                <View style={{backgroundColor:colors.fadeTTColor, height:"100%",width:"48%"}}></View>
            </View>
            <View style={{width:"100%",height:"1000%",backgroundColor:colors.fadeTTColor}}>
            <TT3 onNext={()=>{props.onNext()}}/>
            </View>
        </View>
    )
}