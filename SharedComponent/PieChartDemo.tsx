import { PieChart } from "react-native-gifted-charts";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../assets/String/colors";
import { useEffect, useState, useContext } from "react";
import { color, darkColor, lightColor, midColor, textPinColor } from "../Fragments/MainPage/PinLayout";
import { DataContext } from "..";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";




const PieChartDemo = (props: any) => {
  const { subscribePie,deletePieChart,onConfigChartClick } = useContext(DataContext);

  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);

  const pieData = [
    {
      value: value,
      color: midColor(props.userChartData.color),
      gradientCenterColor: lightColor(colors.mainYellow),
      focused: true,
    },
    {
      value: props.userChartData.end - value,
      color: lightColor(props.userChartData.color),
      gradientCenterColor: "#999999"
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 500);

    return () => clearInterval(timer);
  }, []); // ทำงานครั้งเดียวเมื่อคอมโพเนนต์ mount

  useEffect(() => {
    if (props.userChartData.id === subscribePie.chartId) {
      setValue(subscribePie.payload);
    }
  }, [count, props.userChartData.id, subscribePie.chartId, subscribePie.payload]);

  //console.log("From PieChartDemo ==> ", props.userChartData);
  //console.log(props.userChartData.id === subscribePie.chartId);

  return (
    <View style={{ justifyContent: "center", alignSelf:"center" ,width: 320, padding: 10, flexDirection: "row", marginVertical:8, borderColor:darkColor(props.userChartData.color) , borderStyle:"solid", borderWidth:5 , borderRadius: 15 , opacity:0.6}}>
      <View>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          semiCircle
          radius={100}
          isAnimated
          innerRadius={60}
          innerCircleColor={colors.white}
          centerLabelComponent={() => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 22, color: "black", fontWeight: "bold" }}>{value}</Text>
            </View>
          )}
        />
        <Text style={{ fontSize: 24, color: darkColor(props.userChartData.color), textAlign: "center", fontWeight:"bold" }}> {props.userChartData.name}</Text>
        <Text style={{ fontSize: 16, color: darkColor(props.userChartData.color), textAlign: "center", fontWeight:500 }}> {props.userChartData.description}</Text>
        <View style={{flexDirection:"row", marginVertical: 2 , alignSelf:"center" ,justifyContent:"space-between", alignItems:"center", width: 200 , height: 50 , backgroundColor: lightColor(props.userChartData.color), borderRadius: 15}}>
          <TouchableOpacity onPress={()=>{props.onClickToFade(); onConfigChartClick({id: props.userChartData.id , name: props.userChartData.name , color: props.userChartData.color , description: props.userChartData.description , start: props.userChartData.start , end: props.userChartData.end})}}>
            <View style={[pie.button,{borderColor: darkColor(props.userChartData.color), backgroundColor: midColor(props.userChartData.color)}]}>
            <FontAwesome5 name="pencil-alt" size={25}></FontAwesome5>
            </View>
          </TouchableOpacity>
          <Text style={{fontSize: 10 , fontWeight:"bold" , letterSpacing: 0.1 ,textAlign:"center", color: midColor(props.userChartData.color)}}>Chart ID{'\n'}<Text style={{fontSize:16}}>{props.userChartData.id}</Text></Text>
          <TouchableOpacity onPress={()=>{props.onDeleteVerify(); onConfigChartClick({id: props.userChartData.id , name: props.userChartData.name , color: props.userChartData.color , description: props.userChartData.description , start: props.userChartData.start , end: props.userChartData.end})}}>
            <View style={[pie.button,{borderColor: darkColor(props.userChartData.color),backgroundColor: midColor(props.userChartData.color)}]}>
            <Icon name="delete-forever" size={35}></Icon>
          </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PieChartDemo;

const pie = StyleSheet.create({
  button:{
    borderWidth:1,
    borderStyle:"solid",
    width: 50,
    height: 50,
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center"
  },
})

{/* 
   */}