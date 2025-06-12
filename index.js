import React, { createContext, useEffect, useRef,useState,useContext } from 'react';
import { AppRegistry,AppState } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import uuid from 'react-native-uuid';
import 'react-native-get-random-values';
import { url } from './assets/String/link';

export const DataContext = createContext();
let socket;

let chartPageIsON = false;

const Root = () => {


    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const [webSocketRendering,setWebSocketRendering] = useState(false);
    const [uuid,setUid] = useState("")
    const [connectId,setConnectId]=useState("sameConnectId");
    const [pinState,setState] = useState({});
    const [userChartData,setUserChartData] = useState([])
    const [subscribePie,setSubscribePie] = useState({})
    const [chartPageValid,setShowChartPage] = useState(undefined);
    const [focusChartData , setFocusChartData] = useState({});
    const [justLogin,setJustLogin] = useState(false)


  // ใช้ useRef เพื่อเก็บการเชื่อมต่อ WebSocket
  const ws = useRef(null);
  const appState = useRef(AppState.currentState)
  //console.log("appState.current ----> ",appState.current)

  const connectWebSocket = () => {
    if (ws.current) {
      if (ws.current.readyState === 1) {
          console.log("WebSocket is already open");
          return; // ถ้าเชื่อมต่ออยู่แล้ว ไม่ต้องทำซ้ำ
      }else{
        console.warn('WebSocket is not ready')
      }
     

      ws.current.close(); // ปิดการเชื่อมต่อเก่าถ้ามี
    }
    //console.log("ws.current --> ", ws.current);

    if(uuid) {
      ws.current = new WebSocket(url.webSocketUrl);

      ws.current.onopen = () => {
          //console.log('Connected to WebSocket Server');
          ws.current.send(JSON.stringify({connectId: uuid }));
      };

      ws.current.onmessage = (event) => {
          const message = JSON.parse(event.data);
          //console.log('Received message:', message);
          if(message.response === 'refresh'){
              console.log('Received refresh message, triggering update');
              setWebSocketRendering(prev=>!prev);
          }
          if(message.response === "deletePinRefresh"){
            //console.log('DeletePinRefresh from server')
            
          }
          if(message.action === "loadPieChartResponse" && message.res){
           // console.log(message.res)
            const res = (message.res);
            const resArray = Object.values(res);
           // console.log("resArray ", resArray);
            const colorPriority = ["pink", "purple", "blue","green","orange"];
            const groupedPinData = resArray.reduce((acc, item) => {
              if (!acc[item.color]) {
                acc[item.color] = [];
              }
              acc[item.color].push(item);
              return acc;
            }, {});

            console.log("index 77",resArray)
            
            // จัดลำดับการแสดงผลตามลำดับสีที่ต้องการ
            const sortedPinData = colorPriority
              .map((color) => groupedPinData[color] || []) // จัดกลุ่มตามสีในลำดับที่ต้องการ
              .flat(); // แปลงเป็น Array เดียว
            
            //console.log(sortedPinData);
            setUserChartData(sortedPinData);
          }
          if(message.mqtt === "sensorSubscriber" && message.chartId && message.payload && chartPageIsON){
           // console.log("Chart ID : " , message.chartId);
           // console.log("Payload : " , message.payload);
            const data = {
              chartId: String(message.chartId),
              payload: Number(message.payload)
            }
           // console.log(data)
            setTimeout(()=>{setSubscribePie(data)},200)
          }


      };
      ws.current.onclose = () => {
          console.log('Connection from WebSocket server closed');
            setTimeout(() => {connectWebSocket()}, 1000);
      };

      ws.current.onerror = (err) => {
          console.warn('WebSocket Error : ', err.message);
      };

      return () => {
          if (ws.current) {
              ws.current.close();
          }
      };
  } else {
      console.log('uid not found');
  }
  }

  //console.log("chartPageValid" , chartPageIsON)
    

  useEffect(() => {
    // เชื่อมต่อ WebSocket และส่ง connectId
    connectWebSocket();

    const handleAppStateChange = (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
    ) {
        console.log("App has come to the foreground");
        connectWebSocket(); // เชื่อมต่อใหม่เมื่อแอปกลับมา
    }
    appState.current = nextAppState;
  }
  const subscription = AppState.addEventListener("change", handleAppStateChange);

  return () => {
    subscription.remove(); // ลบ event listener
    if (ws.current) {
        ws.current.close(); // ปิด WebSocket เมื่อ component ถูก unmount
    }
};

}, [uuid,appState]);

  

  // ฟังก์ชันสำหรับส่งข้อความไปยัง WebSocket
  const onClick = () => {
    if (ws.current) {
      ws.current.send(JSON.stringify({ action: "onClick",connectId:uuid}));
    }
  };

  //console.log("from index.js",uuid)

  const sendArrowBtnData = (button,state,key) => {
    if(ws.current){
      console.log(key)
      if(key==="analogPage/1"){
        ws.current.send(JSON.stringify({type:"digital/1",topic:uuid, message: {button:button+"AnalogMode",state:state}}));
      }
      if(key==="digitalPage/2"){
        ws.current.send(JSON.stringify({type:"digital/2",topic:uuid, message: {button:button+"DigitalModeL",state:state}}));
      }
      if(key==="digitalPage/3"){
        ws.current.send(JSON.stringify({type:"digital/3",topic:uuid, message: {button:button+"DigitalModeR",state:state}}));
      }
    }
  }

  const analogHandlerToWebSocket = (x,y) => {
    console.log(x,"    ",y)
    if(ws.current){
      ws.current.send(JSON.stringify({type:"analogMqtt",topic: uuid , message: {x,y} }))
    }
  }

  const sendPinStateToWs = ({state,pinId,pinName}) => {
    if(ws.current){
      ws.current.send(JSON.stringify({type:"pinState",topic: uuid , message: {state,pinId,pinName} }))
    }
  }
  const addPieChartData = ({id,name,start,end,color,description}) => {
    if(ws.current){
      ws.current.send(JSON.stringify({action:"addPieData" , message: {id:id,name:name,start:start,end:end,color:color,description:description} , uid:uuid}))
    }
  }
  const loadPieChart = () => {
    if(ws.current){
      ws.current.send(JSON.stringify({action:"loadPieChart", connectId:uuid}));
    }
  }
  const submitEditPinName = (pinData) => {
    console.log("index.js -- " , pinData.id)
    if(ws.current){
      ws.current.send(JSON.stringify({action:"editPinName",pinData: pinData, connectId: uuid}))
    }
  }
   const saveDateTime = (mode,date,time,pinId,pinName,pinColor,pinState) => {
    console.log("mode",mode);
    console.log('date',date);
    console.log('time',time);
    if(ws.current){
      ws.current.send(JSON.stringify({action:"saveDateTime", connectId: uuid, pinId: pinId, mode: mode, date: date , time: time , pinName: pinName , pinColor: pinColor , pinState: pinState ? "1" : "0"}))
    }
   }

   const stateClick = ({pinId,pinName,pinColor,pinState}) => {
    console.log("stateClick")
    if(ws.current){
      ws.current.send(JSON.stringify({action:"stateRequest", connectId: uuid, pinId: pinId, pinName: pinName , pinColor: pinColor , pinState: pinState}))
    }
   }

   const deletePieChart = ({id,name,color,description,start,end}) => {
    console.log("index id 217" , id)
    if(ws.current){
      ws.current.send(JSON.stringify({action:"deletePieChart", connectId: uuid, pieData:{id: id, name: name , color: color , description: description , start: start , end: end}}))
    }
   }
   const onSubmitConfigChart = (pieData) => {
    if(ws.current && pieData !== "onBackPress"){
    const {id,name,color,description,start,end} = pieData ;

      ws.current.send(JSON.stringify({action:"configPieChart", connectId: uuid, pieData:{id: id, name: name , color: color , description: description , start: start , end: end}}))
      setFocusChartData({})
      setShowConfigPieChart(false)
    }
    else{
      setShowConfigPieChart(false) // backPress() ConfigPieChart
    }
   }

   const onConfigChartClick = (focusChartData) => {
    setFocusChartData(focusChartData);
   }

   const loginSuccess =()=>{
    setJustLogin(true)
   }

   

  return (
    <DataContext.Provider 
    // For Global Props
    value={{ 
      onClick, 
      webSocketRendering,
      uuid,
      sendArrowBtnData,
      analogHandlerToWebSocket,
      sendPinStateToWs,
      addPieChartData,
      loadPieChart,
      userChartData,
      subscribePie,
      submitEditPinName,
      saveDateTime,
      stateClick,
      deletePieChart,
      onConfigChartClick,
      focusChartData,
      onSubmitConfigChart,
      loginSuccess,
      justLogin
    }}
     
    // For Global Props
    >
      <App getUid={(value)=>{setUid(value);console.log("value = ",value);}} sendShowChartPage={(value)=>{chartPageIsON = value;}}/>
    </DataContext.Provider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
