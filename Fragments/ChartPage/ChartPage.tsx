import { View,StyleSheet,TouchableOpacity,Text,FlatList, BackHandler } from "react-native"
import { colors } from "../../assets/String/colors"
import { mainStyle } from "../MainPage/MainPage"
import Icon from 'react-native-vector-icons/FontAwesome';
import HrTag from "../../SharedComponent/HrTag";
import ChartPageInputDialog from "./ChartPageInputDialog";
import { useEffect, useState , useContext } from "react";
import Bar from "../../SharedComponent/Bar";
import PieChartDemo from "../../SharedComponent/PieChartDemo";
import { DataContext } from "../..";
import Orientation from "react-native-orientation-locker";
import DeleteChartVerify from "./DeleteChartVerify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TT5 from "./TT5";

export default function ChartPage(props: any){

    const [showNoChart,setShowNoChart] = useState(false);
    const [showTT6,setShowTT6] = useState(false);

    const [showChartPageInputDialog,setShowChartPageInputDialog]=useState(false);
    const [showAddChart,setShowAddChart]=useState(true);
    const [showDeleteVerify , setShowDeleteVerify] = useState(false);
    const [render,setRender] = useState(true)
    const {loadPieChart,userChartData,webSocketRendering} = useContext(DataContext)
    const [blankArray] = useState([])
    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        props.onBackPress
      );


    useEffect(() => {
      AsyncStorage.getItem('ChartTutorial')
        .then((result: any)=>{
          if(!result){
            console.log("setsetset")
            if(Array.isArray(userChartData) && userChartData.length === 0){
              console.log("chart---blank")
              props.startChartTT();
            }
          }
        })
      
        Orientation.lockToPortrait();
        return () => {
            Orientation.unlockAllOrientations();
        };
    }, []);

    useEffect(()=>{
      if(Array.isArray(userChartData) && userChartData.length === 0){
        setShowNoChart(true)
        console.log("chart---blank")
      }else{
        setShowNoChart(false)
      }
        loadPieChart();
    },[render,webSocketRendering])

    console.log("all chart query ChartPage : 37" , userChartData)

    return (
      <View style={{flex: 1, width: '100%'}}>
        <View style={chartStyle.container}>
          <View style={{marginHorizontal: 16 , height: 45}}>
            <Text style={{fontSize:24 , color: colors.white , fontWeight: 600}}>Pie Chart</Text>
          </View>
          <View style={chartStyle.field}>

          {/* Delete Verify */}
          { showDeleteVerify && <DeleteChartVerify pieChartRender={()=>{setRender(prev=>!prev);}} deleteOnBack={()=>{setShowDeleteVerify(false); setRender(prev => !prev); props.deleteOnBack()}} />}

            { showNoChart && <Text style={{fontSize:24,textAlign:"center" , fontWeight:"bold" , color: colors.yellowOrange , marginTop: 30}}> No Chart Create</Text>}
            { !userChartData && <Text style={{fontSize:24,textAlign:"center" , fontWeight:"bold" , color: colors.yellowOrange , marginTop: 30}}> Loading Chart</Text>}
            { userChartData &&
              <View style={{marginTop: 10}}>
              <FlatList
                data={userChartData}
                renderItem={({item}) => 

                <PieChartDemo 
                onDeleteVerify={()=>{setShowDeleteVerify(true); props.deleteChartToFadeBG();}}
                userChartData={item} 
                onClickToFade={()=>{props.onClickToFade()}} 
                pieChartRender={()=>{setRender(prev => !prev)}} />}
                keyExtractor={(item: any) => item.id.toString()}
                ListFooterComponent={
                  <View>
                    <HrTag />

                    <View
                      style={[mainStyle.addBtnContainer, {marginBottom: 20}]}>
                      <TouchableOpacity
                        style={mainStyle.addBtn}
                        onPress={() => {
                          props.closeTT4();
                          setShowChartPageInputDialog(true);
                          props.fadeBackground(true);
                          AsyncStorage.getItem('ChartTutorial').then((res: any)=>{
                            if(res === "firstStep" || !res){
                              setShowTT6(true);
                            }
                          })
                        }}>
                        <Icon
                          name="plus"
                          size={25}
                          color={colors.lightYellow}></Icon>
                      </TouchableOpacity>

                      <Text style={mainStyle.text}> Add New Bar </Text>
                    </View>
                  </View>
                }></FlatList>
            </View>
            }
          </View>
        </View>


        {showChartPageInputDialog && (
          <ChartPageInputDialog
          onNext={()=>{
            setShowTT6(false);
          }}
           showTT6={showTT6}
            onAddPinSubmit={() => {
              setShowChartPageInputDialog(false);
              props.fadeBackground(false);
            }}
            onBackPress={() => {
              setShowChartPageInputDialog(false);
              props.fadeBackground(false);
              return true;
            }}
            onSubmit={() => {
              setRender(prev => !prev);
            }}
          />
        )}
      </View>
    );
}


const chartStyle = StyleSheet.create({
    container:{
        backgroundColor:colors.mainYellow,
        flex:1,
        width:"100%",
        justifyContent:"flex-end"
    },
    field:{
        backgroundColor: colors.white,
        width:"100%",
        height:"90%",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    }
})