import { View } from "react-native"
import { useState } from "react"
import { colors } from "../assets/String/colors"
import TT4 from "../Fragments/MainPage/TT4"
import AsyncStorage from "@react-native-async-storage/async-storage"
import TT6 from "../Fragments/ChartPage/TT6"

export default function FadeBackground(props: any){
    return (
        <View style={{flex:1,backgroundColor:colors.fadeColor ,width:"100%",height:"100%",position:"absolute"}}>
            {props.showTT4 && <TT4 onNext={()=>{
                props.onNext();
                AsyncStorage.setItem('ButtonTutorial','Success')
            }}/>}
            
        </View>
    )
}