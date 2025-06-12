import { View,Text,FlatList, BackHandler } from "react-native"
import { useEffect, useState } from "react"
import { colors } from "../../assets/String/colors"
import ListLayout from "./ModeSelectButton";
import HrTag from "../../SharedComponent/HrTag";
import Orientation from "react-native-orientation-locker";

export default function ModeSelector (props: any){

     const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            props.onBackPress
          );
    

    useEffect(() => {
        Orientation.lockToPortrait();
        return () => {
            Orientation.unlockAllOrientations();
        };
    }, []);
    
    const [modeListItem,setModeListItem] = useState([{
        id:1,
        title:"Analog Mode Joystick"
    },{
        id:2,
        title:"Digital Mode Joystick"
    },
    // {
    //     id:3,
    //     title:"Push Button"
    // }
]);
//console.log(modeListItem)


    return (
        <View style={{flex:1,backgroundColor:colors.mainYellow,width:"100%"}}>
            <View style={{marginBottom: 37}}></View>
            <View style={{marginHorizontal: 16 , height: 29, marginBottom: 16}}>
            <Text style={{fontSize:24 , color: colors.white , fontWeight: 600}}>Controller Mode</Text>
          </View>
            <View style={{backgroundColor:colors.white,flex:1,borderTopRightRadius:30,borderTopLeftRadius:30,paddingTop:20}}>
            <FlatList style={{alignSelf:"center",width:"100%",marginBottom:20}} data={modeListItem} renderItem={({item})=>( <ListLayout item={item} selected={props.selected}/> )} keyExtractor={(item)=>{return item.id.toString()}}/>
            </View>
        </View>
    )
}