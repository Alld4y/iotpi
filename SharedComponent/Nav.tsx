import {StyleSheet, Text, View,Image, TouchableOpacity,Animated} from 'react-native';
import { useRef } from 'react';
import {colors} from '../assets/String/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo'


export default function Nav(props: any) {

  const switchBar = useRef(new Animated.Value(0)).current
  const mainPageIconON = (<View style={{marginTop:5,width:50,height:28,backgroundColor:colors.greyText,borderRadius:100,justifyContent:"center",paddingHorizontal:4}}><View style={{transform:[{translateX:23}], height:20,width:"45%",borderRadius:100,backgroundColor:colors.mainYellow}}></View></View>)
  const mainPageIconOff = ( <View style={{marginTop:5,width:50,height:28,backgroundColor:colors.greyText,borderRadius:100,justifyContent:"center",paddingHorizontal:4}}><View style={{transform:[{translateX:0}], height:20,width:"45%",borderRadius:100,backgroundColor:colors.mainYellow}}></View></View> ) 
  return (
    <View style={navStyle.container}>
      <TouchableOpacity onPress={props.pushButtonPageClick}>
        <MaterialCommunityIcons
          style={{marginTop: 5}}
          name="gamepad-square"
          size={50}
          color={colors.greyText}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.mainPageClick();
        }}>
        {props.showMainPage === true ? mainPageIconON : mainPageIconOff}
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={() => {
        props.onSandee()
      }}>
        <View style={navStyle.centerBtn}>
          <Image
            style={{height: 100, width: 100}}
            source={require('../assets/images/rabbit2.png')}></Image>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.chartPageClick();
        }}>
        <FontAwesome6 name="chart-simple" size={50} color={colors.greyText} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=>{props.onLogoutVerify()}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Entypo name="log-out" size={45} color={colors.greyText} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const navStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.mainYellow,
    height: 70,
    width: '100%',
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal:3,
    alignItems:"center"
  },
  centerBtn: {
    backgroundColor: colors.lightPink,
    height: 70,
    width: 70,
    borderRadius:100,
    justifyContent:"center",
    alignItems:"center",
  },
});


/*

() => {
          AsyncStorage.setItem('uid', '')
            .then(() => {
              console.log('Log Out');
              props.onLogoutPress();
            })
            .catch((e: Error) => {
              console.log(e.message);
            });
        }

*/