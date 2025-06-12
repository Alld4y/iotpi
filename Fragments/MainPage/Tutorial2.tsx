import { StyleSheet, View , Text, TouchableOpacity,Image } from "react-native"
import { colors } from "../../assets/String/colors";
import { mainStyle } from "./MainPage";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Tutorial2(props:any){
    const first_tt = {
        top: 280,
        height: 350
    }

    function onNext(){
        props.onNext();
        AsyncStorage.setItem('firstTime?','Success')
    }

    return (
      <>
        <View
          style={[
            tt.size,
            tt.position,
            {top: first_tt.top, borderRadius: 30},
          ]}>
          <View
            style={[
              tt.border,
              tt.size,
              {
                height: first_tt.height,
                backgroundColor: colors.mainYellow,
                borderRadius: 100,
                alignItems:"center",
                justifyContent:"center"
              },
            ]}>
                <View style={{backgroundColor:colors.mainYellow,width:"70%",height:"15%", borderRadius:20}}>
                    <Text style={[mainStyle.text,{fontSize:22, textAlign:"center",paddingTop:10}]}>เริ่มต้นใช้งาน iotPi</Text>
                </View>
                <View style={[{marginTop:10,width:"95%",height:"80%",display:'flex',justifyContent:"flex-start",alignItems:"center"}]}>
                    <View style={{backgroundColor:colors.whiteF0, borderRadius:20, paddingHorizontal:8, paddingVertical:3}}>
                    <Text style={[mainStyle.text]}>เชื่อมต่ออุปกรณ์ของคุณผ่านโทเคน{"\n"}และควบคุมได้อย่างง่ายดาย</Text>
                    <View style={{flexDirection:"row"}}>
                    <Text style={mainStyle.text}>{"\n"}คุณสามารถกดที่ปุ่ม</Text>
                    <Image style={{marginTop:25, marginStart: 10}} source={require('../../assets/images/key.png')}></Image>
                    </View>
                    <Text style={mainStyle.text}>เพื่อตรวจสอบโทเคนของคุณ</Text>
                    <Image style={{alignSelf:"center",marginVertical:5}} source={require('../../assets/images/tokenTutorial.png')}></Image>
                    </View>
                    <TouchableOpacity onPress={onNext} activeOpacity={0.8}>
                    <View style={[{width:100,height:50,justifyContent:"center",alignItems:"center", backgroundColor:colors.lightYellow,borderRadius:20,marginTop:15 , boxShadow:"0 0 3 1 "+ colors.greyText}]}>
                        <Text style={[mainStyle.text,{textAlign:"center"}]}>เข้าใจแล้ว</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
          <View 
            style={{
                width: 0,
                height: 0,
                borderLeftWidth: 25,
                borderRightWidth: 25,
                borderBottomWidth: 50,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: colors.mainYellow,
                position: 'absolute',
                top: first_tt.height -5,
                left: '50%',
                transform: [{ translateX: '-50%'},{rotate:'180deg'}],
            }}
        />
        </View>
      </>
    );
}

const tt = StyleSheet.create({
    testBorder:{
        borderStyle:'solid',
        borderWidth:2,
        borderColor:"red",
    },
    border:{
        borderStyle:'solid',
        borderWidth:5,
        borderColor:colors.mainYellow,
    },
    size:{
        width:350,
        height:400,
    },
    position:{
        position:"absolute",
    }
});