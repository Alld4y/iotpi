import { StyleSheet, View , Text, TouchableOpacity,Image } from "react-native"
import { colors } from "../../assets/String/colors";
import { mainStyle } from "./MainPage";


export default function TT4(props:any){
    const first_tt = {
        top: 470,
        height: 350
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
                    <Text style={[mainStyle.text,{fontSize:22, textAlign:"center",paddingTop:10}]}>เริ่มต้นสร้างปุ่ม</Text>
                </View>
                <View style={[{marginTop:10,width:"95%",height:"80%",display:'flex',justifyContent:"flex-start",alignItems:"center"}]}>
                    <View style={{backgroundColor:colors.whiteF0, borderRadius:20, paddingHorizontal:8, paddingVertical:3}}>
                    <Text style={[mainStyle.text]}>คุณสามารถกำหนดชื่อปุ่มของคุญได้ !!{"\n"}ชื่อเริ่มต้นคือ "Button"</Text>

                    <View style={{flexDirection:"row"}}>
                    <Text style={mainStyle.text}>{"\n"}คุณสามารถกำหนดสีปุ่มของคุณได้{"\n"}ซึ่งปุ่มจะจัดกลุ่มและเรียงลำดับโดยสี {"\n"}สีเริ่มต้นคือสี "ชมพู"{"\n\n"}เว้นว่างไว้เพื่อใช้ค่าเริ่มต้น</Text>
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