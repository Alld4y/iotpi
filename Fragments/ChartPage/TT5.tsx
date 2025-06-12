import { StyleSheet, View , Text, TouchableOpacity,Image } from "react-native"
import { colors } from "../../assets/String/colors";
import { mainStyle } from "../MainPage/MainPage";


export default function TT5(props:any){
    const first_tt = {
        top: 20,
        height: 300
    }

    function onNext(){
        props.onNext();
    }

    return (
      <>
        <View
          style={[
            tt.size,
            tt.position,
            {top: first_tt.top, borderRadius: 30, alignSelf:"center"},
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
                    <Text style={[mainStyle.text,{fontSize:22, textAlign:"center",paddingTop:10}]}>เริ่มต้นแผนภูมิ</Text>
                </View>
                <View style={[{marginTop:10,width:"95%",height:"80%",display:'flex',justifyContent:"flex-start",alignItems:"center"}]}>
                    <View style={{backgroundColor:colors.whiteF0, borderRadius:20, paddingHorizontal:8, paddingVertical:3}}>
                    <Text style={[mainStyle.text]}>เริ่มต้นสร้างแผนภูมิเพื่อรับค่า{"\n"}จากอุปกรณ์ของคุณ</Text>
                    <View style={{flexDirection:"row"}}>
                    <Text style={mainStyle.text}>{"\n"}คุณสามารถกดที่ปุ่ม{"             \n"}เพื่อเริ่มต้นสร้างแผนภูมิสำหรับ{"\n"}รับค่าจากอุปกรณ์</Text>
                    <Image style={{position:"absolute", top:12, right:0}} source={require('../../assets/images/addPinIcon.png')}></Image>

                    </View>

                    </View>
                    <TouchableOpacity onPress={onNext} activeOpacity={0.8}>
                    <View style={[{width:100,height:50,justifyContent:"center",alignItems:"center", backgroundColor:colors.lightYellow,borderRadius:20,marginTop:15 , boxShadow:"0 0 3 1 "+ colors.greyText}]}>
                        <Text style={[mainStyle.text,{textAlign:"center"}]}>เข้าใจแล้ว</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
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