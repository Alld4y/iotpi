import { View,Text,StyleSheet,Image,Animated, TouchableOpacity,ScrollView } from "react-native";
import { colors } from "../../assets/String/colors";
import { mainStyle } from "./MainPage";
import { useEffect, useRef,useState,useContext } from "react";
import axios from "axios";
import { url } from "../../assets/String/link";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DataContext } from "../..";


export const color=(colorName: string): string=>{
     let returnColor = "";
     switch (colorName) {
         case "pink" : 
              returnColor = colors.lightPink5;
              break;
         case "purple" : 
              returnColor = colors.lightPurple5;
              break;
         case "blue" : 
              returnColor = colors.lightBlue5;
              break;
         case "green" : 
              returnColor = colors.lightGreen5;
              break;
         case "orange" : 
              returnColor = colors.lightOrange5;
              break;
     }
     return returnColor;
 }
 export const darkColor=(colorName: string): string=>{
     let returnColor = "";
     switch (colorName) {
         case "pink" : 
              returnColor = colors.pink;
              break;
         case "purple" : 
              returnColor = colors.purple;
              break;
         case "blue" : 
              returnColor = colors.blue;
              break;
         case "green" : 
              returnColor = colors.green;
              break;
         case "orange" : 
              returnColor = colors.orange;
              break;
     }
     return returnColor;
 }
 export const lightColor=(colorName: string): string=>{
     let returnColor = "";
     switch (colorName) {
         case "pink" : 
              returnColor = colors.lightPink;
              break;
         case "purple" : 
              returnColor = colors.lightPurple;
              break;
         case "blue" : 
              returnColor = colors.lightBlue;
              break;
         case "green" : 
              returnColor = colors.lightGreen;
              break;
         case "orange" : 
              returnColor = colors.lightOrange;
              break;
     }
     return returnColor;
 }

 export const midColor=(colorName: string): string=>{
   let returnColor = "";
   switch (colorName) {
       case "pink" : 
            returnColor = colors.midPink;
            break;
       case "purple" : 
            returnColor = colors.midPurple;
            break;
       case "blue" : 
            returnColor = colors.midBlue;
            break;
       case "green" : 
            returnColor = colors.midGreen;
            break;
       case "orange" : 
            returnColor = colors.midOrange;
            break;
   }
   return returnColor;
}
export const textPinColor=(colorName: string): string=>{
 let returnColor = "";
 switch (colorName) {
     case "pink" : 
          returnColor = colors.textPinPink;
          break;
     case "purple" : 
          returnColor = colors.textPinPurple;
          break;
     case "blue" : 
          returnColor = colors.textPinBlue;
          break;
     case "green" : 
          returnColor = colors.textPinGreen;
          break;
     case "orange" : 
          returnColor = colors.textPinOrange;
          break;
 }
 return returnColor;
}


export default function PinLayout(props: any){

    const {userData} = props
    const { pinColor, pinId, pinName, pinState,startDate,stopDate,startTime,stopTime,dateStart,dateStop } = props.pinData;
    const [startValue ,setStartValue]=useState(0);
    const [showPopUp,setShowPopUp] = useState(false);

    const {onClick,sendPinStateToWs,stateClick} = useContext(DataContext);
    
    
  
     console.log("prop.pinData PinLay",props.pinData)


    const getRabbitImage = (pinColor :string) => {
        switch (pinColor) {
          case 'pink':
            return require('../../assets/images/rabbit-pink.png');
          case 'purple':
            return require('../../assets/images/rabbit-purple.png');
          case 'blue':
            return require('../../assets/images/rabbit-blue.png');
          case 'green':
            return require('../../assets/images/rabbit-green.png');
          case 'orange':
            return require('../../assets/images/rabbit-orange.png');
          default:
        }
      };

      const getNumber=(val: string): number=>{
         // console.log()
        if(val === "false"){
            return 0
        }else{
            return 100
        }
      }

     

      //console.log("pinState",pinState)//
     // console.log("pin State = ", props.pinData.pinState , pinState)
      const rabbitStateSlide = useRef(new Animated.Value(getNumber(pinState))).current;
      const runAnimatedRabbit=()=>{
        Animated.timing(rabbitStateSlide,{
            toValue: pinState === true ? 10 : 100,
            duration: 1000,
            useNativeDriver: true
        }).start();
      }

      useEffect(()=>{
          runAnimatedRabbit();
      },[pinState])

      const stateRequest=async()=>{
          const state = !pinState;
        try {

          const sendMessage = () => {
               //const res = await axios.post(url.api+`/stateRequest`,{pinId:pinId,pinState:pinState,pinColor:pinColor,pinName:pinName,uid:userData})
               stateClick({
                    pinId: pinId,
                    pinName: pinName,
                    pinColor: pinColor,
                    pinState: pinState
               });
             //console.log(res.data)
          onClick();
          
          sendPinStateToWs({pinId,state,pinName});
          };
          sendMessage()
          

             
        } catch (err) {
            
        }
      }
  //  console.log("113::",userData)
    
    
    //console.log("Props PinData",props.pinData)
    //console.log(pinName)


    return (
        <View style={[pinStyle.container,{borderColor:color(pinColor),backgroundColor:lightColor(pinColor)}]}>
          
            <View style={{flex:1}}>
              <View style={[pinStyle.viewStyle,{justifyContent:"space-between",flexDirection:"row",borderTopLeftRadius:10,backgroundColor:color(pinColor),borderColor:midColor(pinColor)}]}>
                <Text style={[mainStyle.text,{color:textPinColor(pinColor),marginTop:2,fontSize:18}]}>{pinName}</Text>
                <TouchableOpacity onPress={() => { setShowPopUp(true); setTimeout(()=>{setShowPopUp(false)},2500);}} style={{alignSelf:"center"}}>
                <FontAwesome5 style={{color:darkColor(pinColor)}} name="bars" size={25}></FontAwesome5>
                </TouchableOpacity>
              </View>
              <View style={[pinStyle.viewStyle,{width:"100%",height:50,borderColor:midColor(pinColor)}]}>
                <View style={{justifyContent:"space-between"}}>
                    <View style={{width:"100%",flexDirection:"row"}}>
                         <View style={{width:38,borderRightWidth:1,borderColor:midColor(pinColor),borderStyle:"solid"}}><Text style={{color:textPinColor(pinColor)}}>Start</Text></View>
                         <Text style={[mainStyle.text,{marginLeft:3,color:textPinColor(pinColor),fontSize:14}]}>{startTime && !startDate ? <Text style={{color:textPinColor(pinColor)}}>Daily | </Text>:""}{startDate}{!startDate ? "": " | "}{startTime}</Text>
                    </View>
                    <View style={{width:"100%",flexDirection:"row"}}>
                    <View style={{width:38,borderRightWidth:1,borderColor:midColor(pinColor),borderStyle:"solid"}}><Text style={{color:textPinColor(pinColor)}}>Stop</Text></View>
                         <Text style={[mainStyle.text,{marginLeft:3,color:textPinColor(pinColor),fontSize:14}]}>{stopTime && !stopDate ? <Text style={{color:textPinColor(pinColor)}}>Daily | </Text>:""}{stopDate}{!stopDate ? "": " | "}{stopTime}</Text>
                    </View>
                    <View style={{marginTop:6 , flexDirection:"row"}}><Text style={[mainStyle.text,{color:textPinColor(pinColor),fontSize:14}]}>Button ID : {pinId}</Text></View>
                </View>

              </View>
            </View>
            <TouchableOpacity onPress={()=>{runAnimatedRabbit(); stateRequest() ;props.refresh;}} activeOpacity={0.7} style={{backgroundColor:lightColor(pinColor),borderColor:darkColor(pinColor),width:"35%",borderStyle:"solid",borderWidth:5,borderRadius:10,borderTopLeftRadius:0,borderBottomLeftRadius:0,overflow:"hidden"}}>
            

      <Animated.Image
          style={{
            width: 100,
            height: 100,
            alignSelf: "center",
            transform: [{ translateY: rabbitStateSlide }], // ใช้ translateX แทน
          }}
          source={getRabbitImage(pinColor)}
        />

            </TouchableOpacity>

          {showPopUp && 
          (<View style={[pinStyle.popUpContainer,{backgroundColor:textPinColor(pinColor),borderColor:textPinColor(pinColor)}]}>

               <View style={[pinStyle.iconContainer,{backgroundColor:color(pinColor)}]}>
               <TouchableOpacity onPress={()=>{props.onDeleteIconClick(props.pinData,userData.uid);}} style={{alignSelf:"center"}}>
               <View style={{justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}}><Icon name="delete-forever" size={35}></Icon></View>
                </TouchableOpacity>
               </View>

               <View style={[pinStyle.iconContainer,{backgroundColor:color(pinColor)}]}>
               <TouchableOpacity onPress={()=>{props.onNameChange({pinId:pinId,pinColor:pinColor,pinName:pinName,startTime: startTime,stopTime: stopTime, startDate: startDate , stopDate: stopDate , pinState: pinState , dateStart: dateStart , dateStop: dateStop});}} style={{alignSelf:"center"}}>
                <View style={{justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}}><FontAwesome5 name="pencil-alt" size={25}></FontAwesome5></View>
                </TouchableOpacity>
               </View>

               <View style={[pinStyle.iconContainer,{backgroundColor:color(pinColor)}]}>
               <TouchableOpacity onPress={()=>{props.onCalender(pinId,pinColor,pinName)}} style={{alignSelf:"center"}}>
               <View style={{justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}}><FontAwesome5 name="clock" size={30}></FontAwesome5></View>
                </TouchableOpacity>
               </View>

          </View>)}

        </View>
    )
}

const pinStyle = StyleSheet.create({
    container:{
        backgroundColor:colors.lightYellowOpacity,
        height:120,
        width:"100%",
        alignSelf:"center",
        marginVertical:10,
        justifyContent:"center",
        flexDirection:"row",
        borderRadius:15,
        overflow:"hidden",
        borderStyle:"solid",
        borderWidth:5,
    },
    viewStyle:{
        width:"100%",
        height:40,
        borderRadius:0,
        borderStyle:"solid",
        borderWidth:5,
        paddingHorizontal:8,
    },
    popUpContainer:{
     position:"absolute",
     flexDirection:"row",
     borderRadius:50,
     borderWidth:3
    },
    iconContainer:{
     width:40,
     height:40,
     borderRadius:100,
     backgroundColor:colors.white,
    }
})

