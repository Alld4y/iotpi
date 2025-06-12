import { View, Text, StyleSheet, Animated,TouchableOpacity,Image, FlatList,BackHandler } from 'react-native';
import React, { useEffect,useState,useRef,useContext } from 'react';
import { colors } from '../../assets/String/colors';
import HrTag from '../../SharedComponent/HrTag';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import PinNameInputDialog from './PinNameInputDialog';
import PinLayout from './PinLayout';
import { url } from '../../assets/String/link';
import axios from 'axios';
import LoginPage from '../LoginPage/LoginPage';
import { DataContext } from '../..';
import Orientation from 'react-native-orientation-locker';
import DeletePinVerify from './DeletePinVerify';
import Tutorial from './Tutorial';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tutorial2 from './Tutorial2';
import Clipboard from '@react-native-clipboard/clipboard';

interface PinData {
  pinId: number;
  pinName: string;
  pinColor: string;
  pinState: boolean;
  startTime: string | undefined;
  stopTime: string | undefined;
  startDate: string | undefined;
  stopDate: string | undefined;
  dateStart: string | undefined;
  dateStop: string | undefined;
}



export default function MainPage(props: any): React.JSX.Element {

  const [render,setRender]=useState(false)



  /* useState */
  const [showPinNameInputDialog,setShowPinNameInputDialog]=useState(false);
  const [showAddPinBtn,setShowAddPinBtn]=useState(true);
  const [showNoPin,setShowNoPin]=useState(false)
  const [pinData, setPinData] = useState<PinData[]>([]);
  const [showFadeBackground,setShowFadeBackground] = useState(false);
  const [UID,setUID] = useState("");
  const [username,setUsername] = useState("")
  const [position,setPosition] = useState({whiteBGSize: "84%" as `${number}%`, keyPosition:40});
  const [keyText,setKeyText] = useState("แสดง")

  const [showTutorial, setShowTutorial] = useState(false);
  const [showTutorial2, setShowTutorial2] = useState(false)
  const [showUID,setShowUID] = useState(false)


  const {webSocketRendering,onClick,justLogin} = useContext(DataContext);  // Rendering Value with WebSocket

  /* Global Variablee */
  const firstSlide = useRef(new Animated.Value(1000)).current;

  useEffect(() => {
    props.resetShowUID()
    Orientation.lockToPortrait();
    AsyncStorage.getItem('firstTime?').then((yesOrNo: any)=>{
      if(!yesOrNo){
        setShowTutorial(true)
      }
    })
    return () => {
        Orientation.unlockAllOrientations();
    };
}, []);

  /* useEffect */
  useEffect(() => {
    const runFirstSlide = () => {
      Animated.timing(firstSlide, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    };
      runFirstSlide();
    
  }, [firstSlide,showPinNameInputDialog]); // useEffect First MainPage Animation

  function onClipboard(){
    Clipboard.setString(props.userData.uid)
  }

  useEffect(()=>{
    axios.post(url.api+'/getUser',{uid:props.userData.uid}).then((result:any)=>{
      if(result){
        setUsername(result.data);
        console.log(result.data)
      }
    })
    const getPinData=()=>{
 // console.log("not login test",props.userData.uid)
      
 /*
 [{"pinColor": "purple", "pinId": "7338", "pinName": "ปิดเที่ยงคืนนะ", "pinState": true, "startTime": "19 : 00", "stopTime": "00 : 00"}, {"pinColor": "pink", "pinId": "2145", "pinName": "เปิดตอน 4 ทุ่ม", "pinState": false, "startTime": "22 : 00", "stopTime": "22 : 30"}, {"pinColor": "green", "pinId": "775", "pinName": "เปิดเที่ยง ปิดเที่ยงคืน", "pinState": true, "startTime": "12 : 03", "stopTime": "00 : 03"}, {"pinColor": "orange", "pinId": "3732", "pinName": "ปิดเที่ยง เปิดเที่ยงคืน", "pinState": true, "startTime": "00 : 02", "stopTime": "12 : 01"}]
 */
      axios.post(url.api+"/getPinData",{uid:props.userData.uid})
      .then((result: any)=>{
        console.log("this result === " , result.data)
        if(!result.data || result.data.length === 0){
          setShowNoPin(true)
        }else{
          setShowNoPin(false)
        }
        if(result.data){
          const res: PinData[] = result.data;
        const pinArray: PinData[] = []
        res.forEach((item: any)=>{
          console.log("IteMMMMMMMMMMMMMMMMM",item)
          pinArray.push({
            pinId: item.pinId,
            pinName: item.pinName,
            pinColor: item.pinColor,
            pinState: Boolean(item.pinState),
            startTime:  item.startTime === "-" ? undefined : item.startTime,
            stopTime: item.stopTime === "-" ? undefined : item.stopTime,
            startDate: item.startDate === "-" ? undefined : item.startDate,
            stopDate: item.stopDate === "-" ? undefined : item.stopDate,
            dateStart: item.startStamp === "-" ? undefined : item.startStamp,
            dateStop: item.stopStamp === "-" ? undefined : item.stopStamp,
          })
        })
        console.log(pinArray)

      
      
        const colorPriority = ['pink', 'purple', 'blue', 'green', 'orange'];

        const groupedPinData = pinArray.reduce((result: any, item: any) => {
          if (!result[item.pinColor]) {
            result[item.pinColor] = [];
          }
          result[item.pinColor].push(item);
          return result;
        }, []);



        // จัดลำดับการแสดงผลตามลำดับสีที่กำหนด
        const sortedPinData = colorPriority
          .map(color => groupedPinData[color] || []) // จัดกลุ่มตามสีในลำดับที่ต้องการ
          .flat(); // แฟลตผลลัพธ์ให้เป็น Array เดียว

       // console.log(sortedPinData);
        //console.log("This is Object",typeof(resultObj))
        //console.log("This is Array",(pinDataArray))
        setPinData(sortedPinData)
        //console.log("pinData",pinData)
        }
      }).catch((e)=>{console.log(e.message)})//
    }
    getPinData();//
  },[render,firstSlide,webSocketRendering]) // useEffect Get Pin Data From API

 




  /* Function */

  useEffect(()=>{
    const backHandler = BackHandler.addEventListener('hardwareBackPress',props.mainPageBackPress)
    return () => backHandler.remove();
  },[])

  function onDeleteIconClick(pinId: number, uid: string) {
    
  }

  return (
    <View style={mainStyle.container}>

      <View style={mainStyle.outsideWhiteContainer}>
        
        <Text style={[mainStyle.text, {fontSize: 24,marginTop:20}]}>
          {' '}
          สวัสดี : {username} {'\n'}{' '}
          <Text style={mainStyle.text}>{'ยินดีต้อนรับสู่ iotPi'}</Text>
        </Text>
        <Text style={[mainStyle.text,{marginBottom:10}]}>
          {' '}Token {'ของคุณ :   \n'}
          {showUID && <Text style={{fontSize:15}}>
          {" "}{props.userData.uid/*"XXXXXX-XXXX-XXXX-XXXX-XXXXXX"*/}{"  "}
          </Text>
          }
          {showUID && <TouchableOpacity onPress={onClipboard}><Icon color={colors.greyText} size={25} name="copy"></Icon></TouchableOpacity>}
        </Text>
        <TouchableOpacity onPress={()=>{
          setPosition(position.whiteBGSize === "84%" ? {whiteBGSize:"80%",keyPosition:40} : {whiteBGSize:"84%",keyPosition:40})
          setKeyText(keyText==="แสดง" ? "ซ่อน" : "แสดง")
          props.keyPress(!showUID)
          setShowUID(prev=>!prev);
          }} style={{flexDirection:"row", marginTop:45,position:"absolute",top: position.keyPosition,left:160}}>
            <Text style={[mainStyle.text]}>{keyText}{" "}<Icon5 name='key' size={28}></Icon5></Text>
          </TouchableOpacity>
      </View>
      
      {/* Animate in First Time */}
      <Animated.View
        style={[
          mainStyle.whiteContainer,
          {transform: [{translateY: firstSlide}],height: position.whiteBGSize},
        ]}>
          
        {/* No Pin button Data Img ( takeCareRabbit ) */}
        { showNoPin && <View>
        <Image source={require('../../assets/images/appIconImg.png' )} style={mainStyle.takeCareRabbit} ></Image>
        <Text style={mainStyle.text}>No button found. Please add a new button </Text>
        </View>}

        {/* Field */}

        <View style={mainStyle.pinContainer}>
          <FlatList
            //FlatList Props Start
            data={pinData} renderItem={({item})=>(
              <PinLayout 
              /* Props PinLayout Component Start */
                onNameChange={props.onNameChange}
                onCalender={props.onCalender}
                pinData={item}
                userData={props.userData}
                refresh={()=>{setRender(prev=>!prev); console.log(pinData);}}
                onDeleteIconClick = {props.onDeleteIconClick}
              /* Props PinLayout Component End */
              />
              )}
              
            style={mainStyle.flatList}
            keyExtractor={(item)=>item.pinId.toString()}
            ListFooterComponent={(
              <View>
        {/* add new pin layout */}
                {/* Line <hr>  */}
                <HrTag />
                { 
                  showAddPinBtn && 

                  <View style={mainStyle.addBtnContainer}>
                    
                  

                  <TouchableOpacity style={mainStyle.addBtn} onPress={()=>{
                    AsyncStorage.setItem('firstTime?','No')
                    AsyncStorage.getItem('ButtonTutorial').then((yesOrNo: any)=>{
                      if(!yesOrNo){
                        props.firstTimeByAst();
                      }
                    })
                      setShowPinNameInputDialog(prev=>!prev);
                      props.fadeBackground();
                      props.closeTT3();
                      
                     }}>
                  <Icon name="plus" size={25} color={colors.lightYellow}></Icon>
                  </TouchableOpacity>
                  
                  <Text style={mainStyle.text}>   Add Button</Text>

                  </View>
                }
              </View>

            )}
            //FlatList Props E4nd//
            ></FlatList>
        </View>

       {showTutorial &&<Tutorial onNext={()=>{
        setShowTutorial(false)
        setShowTutorial2(true)
        //AsyncStorage.setItem('firstTime?',"no").catch((e)=>{console.log(e.message)})

       }}/>}
       {showTutorial2 && <Tutorial2 onNext={()=>{
        setShowTutorial2(false);
        if(showNoPin){
          props.onFadeToCreatePin();
        }
       }}/>}

        
        
      </Animated.View>

        {/* Pin Name Input Dialog */}
        {showPinNameInputDialog && <PinNameInputDialog onAddPinSubmit={()=>{setShowPinNameInputDialog(prev=>!prev); props.onAddPinSubmit();}} userData={props.userData} onBackPress={()=>{setShowPinNameInputDialog(false); props.onPinNameDialogBackPress(); return true;}}/>}
        {/* Delete Pin Verify */}
        

    </View>
  );
}

export const mainStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainYellow,
    width: '100%',
    justifyContent: 'flex-end',
    position:"relative"
  },
  whiteContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,
  },
  text: {
    fontFamily: 'Prompt-Regular',
    fontSize: 18,
    color: colors.greyText,
  },
  outsideWhiteContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: '3%',
  },
  addBtn: {
    backgroundColor: colors.lightYellowOpacity,
    width: 100,
    height: 50,
    borderRadius: 30,
    borderColor: colors.mainYellow,
    borderStyle: 'solid',
    borderWidth: 3,
    paddingHorizontal:5,
    justifyContent:"center",
    alignItems:"center",
  },
  addBtnContainer: {
    flexDirection:"row",
    width:"100%",
    alignItems:"center",
    marginLeft:"20%"
  },
  takeCareRabbit:{
    height:150,
    width:150,
    marginVertical:"5%",
    alignSelf:"center"
  },
  pinContainer:{
    width:"100%",
    height:"95%",
    marginTop:"3%",
    borderRadius:30,

  },
  flatList:{
    borderRadius:15,
    width:"88%",
    alignSelf:"center"
  },
  circle:{
    borderRadius:100
  },
  textHeader:{
    alignSelf: 'center',
     opacity:0.2 ,
       fontSize: 22 ,
        fontWeight:"bold",
         letterSpacing: 0.2
  }
});

