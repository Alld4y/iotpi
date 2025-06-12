import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { View,StyleSheet } from 'react-native';
import { colors } from '../../assets/String/colors';
import { useState,useContext } from 'react';
import { runOnJS } from 'react-native-reanimated';
import { DataContext } from '../..';


const containerSize = 231 


export default function ArrowButtonLayout(props: any) {

    const [up,setUp] = useState(false);
    const [down,setDown] = useState(false);
    const [left,setLeft] = useState(false);
    const [right,setRight] = useState(false);
   
    const {sendArrowBtnData} = useContext(DataContext);

    const sendData = (button: string ,state: boolean, key:string) => {
            sendArrowBtnData(button,state,key);
    }

        
  const upTap = Gesture.LongPress().minDuration(0).onStart(()=>{runOnJS(setUp)(true);runOnJS(sendData)("up",true,props.title);}).onEnd(()=>{runOnJS(setUp)(false);runOnJS(sendData)("up",false,props.title)});
  const leftTap = Gesture.LongPress().minDuration(0).onStart(()=>{runOnJS(setLeft)(true);runOnJS(sendData)("left",true,props.title);}).onEnd(()=>{runOnJS(setLeft)(false);runOnJS(sendData)("left",false,props.title)});
  const rightTap = Gesture.LongPress().minDuration(0).onStart(()=>{runOnJS(setRight)(true);runOnJS(sendData)("right",true,props.title);}).onEnd(()=>{runOnJS(setRight)(false);runOnJS(sendData)("right",false,props.title)});
  const downTap = Gesture.LongPress().minDuration(0).onStart(()=>{runOnJS(setDown)(true);runOnJS(sendData)("down",true,props.title);}).onEnd(()=>{runOnJS(setDown)(false);runOnJS(sendData)("down",false,props.title)});

 


  return (
    <View style={[joyStyle.container,{bottom:props.bottom, right:props.right, left:props.left}]}>
    <View style={[joyStyle.box,{ borderTopStartRadius:15,borderTopRightRadius:15,borderBottomWidth:0}]}>
       <GestureDetector gesture={upTap}>
       <View style={{backgroundColor: colors.mainYellow, opacity:(up === true ? 0.5 : 0.1) ,height:(containerSize/3)-10,borderRadius:10}}></View>
       </GestureDetector>
    </View>
    <View style={{flexDirection:"row"}}>
        <View style={[joyStyle.box,{borderTopStartRadius:15,borderBottomLeftRadius:15,borderEndWidth:0}]}>
        <GestureDetector gesture={leftTap}>
       <View style={{backgroundColor: colors.mainYellow, opacity:(left === true ? 0.5 : 0.1) ,height:(containerSize/3)-10,borderRadius:10}}></View>
       </GestureDetector>
        </View>
        <View style={{borderWidth:0,height:66,width:66}}></View>
        <View style={[joyStyle.box,{borderTopEndRadius:15,borderBottomRightRadius:15,borderStartWidth:0}]}>
        <GestureDetector gesture={rightTap}>
       <View style={{backgroundColor: colors.mainYellow, opacity:(right === true ? 0.5 : 0.1) ,height:(containerSize/3)-10,borderRadius:10}}></View>
       </GestureDetector>
        </View>
    </View>
    <View style={[joyStyle.box,{height:containerSize/3.3,borderBottomStartRadius:15,borderBottomRightRadius:15,borderTopWidth:0}]}>
    <GestureDetector gesture={downTap}>
       <View style={{backgroundColor: colors.mainYellow, opacity:(down === true ? 0.5 : 0.1) ,height:(containerSize/3)-10,borderRadius:10}}></View>
       </GestureDetector>
    </View>

</View>
  );
}

const joyStyle = StyleSheet.create({
    container:{
        width:containerSize,
        height:containerSize,
        backgroundColor:"transparent", 
        position:"absolute",
        justifyContent:"center",
        alignItems:"center",
    },
    box:{
        height:66,
        width:66,
        backgroundColor:"transparent",
        borderStyle:"solid",
        borderColor:colors.grey,
        borderWidth:2,
        justifyContent:"center",
    }

})
