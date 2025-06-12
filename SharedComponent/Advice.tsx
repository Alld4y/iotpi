import { StyleSheet, View , Text, TouchableOpacity } from "react-native"
import { colors } from "../assets/String/colors";
import { mainStyle } from "../Fragments/MainPage/MainPage";


export default function Advice(props:any){
    const first_tt = {
        top: 520,
        height: 260
    }
    function onDeny(){
      props.onDeny();
    }

    function onAsk(){
        props.onAsk();
    }

    return (
      <>
        <View
          style={[
            tt.size,
            tt.position,
            {top: "55%", borderRadius: 30},
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
                    <Text style={[mainStyle.text,{fontSize:22, textAlign:"center",paddingTop:10}]}>เริ่มต้นเขียนโค้ด</Text>
                </View>
                <View style={[{marginTop:10,width:"95%",height:"80%",display:'flex',justifyContent:"flex-start",alignItems:"center"}]}>
                    <View style={{backgroundColor:colors.whiteF0, borderRadius:20, paddingHorizontal:8, paddingVertical:3}}>
                      <Text style={[mainStyle.text,{color:colors.pink}]}>สวัสดีอีกครั้ง! ฉันชื่อแสนดี 😊{"\n"}
                      <Text style={mainStyle.text}>. . . คุณต้องการคำแนะนำจากแสนดีมั้ย ? </Text></Text>

                      <Text style={mainStyle.text}>ถ้าคุณต้องการคำแนะนำในการเขียนโค้ด ถามแสนดีได้เลย</Text>
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <TouchableOpacity onPress={onAsk} activeOpacity={0.8}>
                    <View style={[{width:100,height:50,justifyContent:"center",alignItems:"center", backgroundColor:colors.lightYellow,borderRadius:20,marginTop:15 , boxShadow:"0 0 3 1 "+ colors.greyText}]}>
                        <Text style={[mainStyle.text,{textAlign:"center"}]}>ถามแสนดี</Text>
                    </View>
                    </TouchableOpacity>
                    <View style={{width:20}}></View>
                    <TouchableOpacity onPress={onDeny} activeOpacity={0.8}>
                    <View style={[{width:100,height:50,justifyContent:"center",alignItems:"center", backgroundColor:colors.lightYellow,borderRadius:20,marginTop:15 , boxShadow:"0 0 3 1 "+ colors.greyText}]}>
                        <Text style={[mainStyle.text,{textAlign:"center"}]}>ไม่เป็นไร</Text>
                    </View>
                    </TouchableOpacity>
                    </View>
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