import { SafeAreaView, StyleSheet, StatusBar,View,BackHandler, Text } from 'react-native';
import { useContext, useEffect, useState, createContext } from 'react';
import { colors } from './assets/String/colors';
import Nav from './SharedComponent/Nav';
import FadeBackground from './SharedComponent/FadeBackground';
import MainPage from './Fragments/MainPage/MainPage';
import LoginPage from './Fragments/LoginPage/LoginPage';
import RegisterPage from './Fragments/RegisterPage/RegisterPage/RegisterPage';
import ChartPage from './Fragments/ChartPage/ChartPage';
import AnalogMode from './Fragments/AnalogMode/AnalogMode';
import ModeSelector from './Fragments/ModeSelector/ModeSelector';
import DigitalMode from './Fragments/DigitalMode/DigitalMode';
import PushButtonMode from './Fragments/PushButtonMode/PushButtonMode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DataContext } from '.';
import Orientation from 'react-native-orientation-locker';
import EditPinName from './Fragments/MainPage/EditPinName';
import EditTimeSetting from './Fragments/MainPage/EditTimeSetting';
import ConfigPieChart from './Fragments/ChartPage/ConfigPieChart';
import LogoutVerify from './SharedComponent/LogoutVerify';
import DeletePinVerify from './Fragments/MainPage/DeletePinVerify';
import FadeTutorial from './SharedComponent/FadeTutorial';
import FadeTutorial_Chart from './SharedComponent/FadeTutorial_Chart';
import Advice from './SharedComponent/Advice';
import Advice2 from './SharedComponent/Advice2';



function App(props: any): any {

  //Global Variable
  let count = 0

  const [render,setRender]=useState(false);

  const { refresh,onClick  } = useContext(DataContext);



  // useState switch component
  const [showFadeBackground,setShowFadeBackground]=useState(false);
  const [showMainPage,setShowMainPage]=useState(false);
  const [showLoginPage,setShowLoginPage]=useState(false);
  const [showRegisterPage,setShowRegisterPage]=useState(false);
  const [showChartPage, setShowChartPage]=useState(false);
  const [showModeSelector,setShowModeSelector]=useState(false);
  const [showAnalogMode,setShowAnalogMode]=useState(false);
  const [showDigitalMode,setShowDigitalMode]=useState(false);
  const [showPushButtonMode,setShowPushButtonMode]=useState(false);
  const [showEditPinName,setShowEditPinName] = useState(false);
  const [showEditTimeSetting,setShowEditTimeSetting] = useState(false);
  const [showConfigPieChart, setShowConfigPieChart] = useState(false);
  const [showLogoutVerify , setShowLogoutVerify] = useState(false);
  const [showDeletePinVerify,setShowDeletePinVerify] = useState(false);
  const [showFadeTutorial,setShowFadeTutorial] = useState(false);
  const [showFadeTutorialChart,setShowFadeTutorialChart] = useState(false);

  const [hideStatusBar, setHideStatusBar] = useState(false);
  const [showNav,setShowNav]=useState(false);
  const [userData,setUserData]=useState({uid:""});

  const [selectedPinEditAuth,setSelectPinEditAuth] = useState({});

    const [pinDataSelect,setPinDataSelect] = useState({});
    const [uid,setuid] = useState("");
    const [showUID,setShowUID] = useState(false);


  const [showTT4,setShowTT4] = useState(false)
  const [showTT6,setShowTT6] = useState(false)

  const [showAdvice,setShowAdvice] = useState(false);
  const [showAdvice2,setShowAdvice2] = useState(false);
  
  // useState 

  
  useEffect(()=>{
    console.log("PinDataSelect = ");
    console.log(pinDataSelect);
  },[pinDataSelect])

  useEffect(()=>{
    Orientation.lockToPortrait();
    return ()=>{
      Orientation.unlockAllOrientations();
    }
  },[])

  useEffect(()=>{
    const getUserFromLocalStorage = async () => {
      try {
        const uid = await AsyncStorage.getItem('uid');
        //console.log(uid); // เช็คค่า uid ที่ได้จาก AsyncStorage
        
        if (count === 0) {
          // ถ้าค่าของ count เป็น 0 จะอัปเดต state
          setUserData((prev) => ({ ...prev, uid: String(uid) }));
        }

        if (!uid) {
          // ถ้าไม่พบ uid ใน AsyncStorage ให้แสดงหน้า login
          setShowLoginPage(true);
        } else {
          // ถ้ามี uid แสดงหน้า main และ navigation
          props.getUid(userData.uid);
          setShowMainPage(true);//
          setShowLoginPage(false);
          setShowNav(true);
        }
        
      } catch (err) {
        console.log('Error in getting user data from AsyncStorage:', err);
      }
    };
    getUserFromLocalStorage();
  },[render,userData.uid]);

  useEffect(()=>{
  props.sendShowChartPage(showChartPage);
  },[showChartPage])

  useEffect(()=>{
    if(showConfigPieChart === true){
      setShowMainPage(false);
      setShowModeSelector(false)
    }
  },[showChartPage])


  // function

  const onModeSelected = (mode: string) => {
    switch (mode) {
      case "Analog Mode Joystick" :
        setShowAnalogMode(true);
        setShowModeSelector(false);
        setHideStatusBar(true);
        setShowNav(false);
        break;
      case "Digital Mode Joystick" :
        setShowDigitalMode(true);
        setShowModeSelector(false);
        setHideStatusBar(true);
        setShowNav(false);
        break;
      case "Push Button" :
        setShowPushButtonMode(true);
        setShowModeSelector(false);
        setHideStatusBar(true);
        setShowNav(false);
        break;
    }
  }
  
  // console.log

  /*
  console.log(showFadeBackground);
  console.log(showMainPage);
  console.log(showLoginPage);
  console.log(showRegisterPage);
  console.log(showNav);
  */

 console.log(showFadeTutorialChart)

  return (
    <GestureHandlerRootView style={{flex:1}}>
      <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={(showFadeBackground) ?  "#997f3b" : (showFadeTutorial || showFadeTutorialChart) ? "#4c3f1e" : colors.mainYellow}  hidden={hideStatusBar}/>
      { !hideStatusBar && <View style={{marginBottom:30}}></View>}

      {showMainPage && <MainPage 

      resetShowUID={()=>{
        setShowUID(false);
      }}

      keyPress={(value: any)=>{
        setShowUID(value);
      }}

      firstTimeByAst={()=>{
        if(showMainPage && !showChartPage){
          setShowTT4(true)
        }
      }}

      closeTT3={()=>{
        setShowFadeTutorial(false)
      }}
      
      onFadeToCreatePin={()=>{
        setShowFadeTutorial(true);
      }}
      onDeleteIconClick={(pinData: number, uid: string)=>{
        setPinDataSelect(pinData);
        setuid(uid);
        setShowDeletePinVerify(true);
        setShowFadeBackground(true);
      }}
      onNameChange={(pinData : any)=>{ 
        setShowEditPinName(true);
        setShowFadeBackground(true);
        setSelectPinEditAuth(pinData);
      }} 
       onCalender={(pinId: string,pinColor: string,pinName: string)=>{setSelectPinEditAuth((prev) => ({...prev, pinId: pinId, pinColor:pinColor, pinName:pinName})); setShowEditTimeSetting(true); setShowFadeBackground(true);}} mainPageBackPress={()=>{setShowModeSelector(false);setShowMainPage(true); return true}} 
       onAddPinSubmit={(()=>{setShowFadeBackground(prev=>!prev)})} 
       userData={userData} 
       fadeBackground={()=>{setShowFadeBackground(prev=>!prev); }} 
       onPinNameDialogBackPress={()=>{setShowFadeBackground(false)}}/>}



      {showLoginPage && <LoginPage onRegisterClick={()=>{setShowRegisterPage(prev=>!prev);setShowLoginPage(prev=>!prev);}} refresh={()=>{setRender(prev=>!prev)}}/>}
      {showRegisterPage && <RegisterPage backToLoginPage={() => {setShowLoginPage(true);setShowRegisterPage(false);setRender(prev=>!prev);}} onBackPress={()=>{setShowRegisterPage(prev=>!prev);setShowLoginPage(prev=>!prev);}} />}
      {showChartPage && <ChartPage
       
       
       startChartTT={()=>{
          console.log("Hey Its must change")
          setShowFadeTutorialChart(true);
        }}
       uid={userData.uid} 
       deleteChartToFadeBG={()=>{setShowFadeBackground(true);}} 
       deleteOnBack={()=>{setShowFadeBackground(false)}} 
       onConfigBackPress={()=>{setShowFadeBackground(false)}} 
       onClickToFade={()=>{setShowConfigPieChart(true); 
       setShowFadeBackground(true)}} 
       onBackPress={()=>{setShowMainPage(true); 
       setShowChartPage(false);
       return true;
      }} 
       fadeBackground={(boolVal: boolean)=>{setShowFadeBackground(boolVal);}}
       closeTT4={()=>{
        setShowTT4(false)
        AsyncStorage.setItem('ButtonTutorial','success');
       }}
       />}
      {/* หน้าเลือกโหมด */ showModeSelector && <ModeSelector selected={onModeSelected} onBackPress={()=>{setShowModeSelector(false); setShowMainPage(true); return true}}/>}

      {/*Mode*/}
      {showAnalogMode && <AnalogMode exitHandler={()=>{setShowAnalogMode(prev=>!prev);setShowModeSelector(prev=>!prev);setHideStatusBar(prev=>!prev);setShowNav(prev=>!prev);return true;}}/>}
      {showDigitalMode && <DigitalMode exitHandlerDigital={()=>{setShowDigitalMode(false);setShowModeSelector(true);setHideStatusBar(false);setShowNav(true);}}/>}
      {showPushButtonMode && <PushButtonMode/>}

      {showEditPinName && <EditPinName pinData={selectedPinEditAuth} onBackPress={()=>{setShowEditPinName(false); setShowFadeBackground(false); return true}}/>}
      {showEditTimeSetting && <EditTimeSetting onSubmit={()=>{setShowEditTimeSetting(false); setShowFadeBackground(false);}} pinData={selectedPinEditAuth} onBackPress={()=>{setShowEditTimeSetting(false); setShowFadeBackground(false); return true}}/>}
      {showConfigPieChart && <ConfigPieChart onConfigBackPress={()=>{setShowFadeBackground(false); setShowConfigPieChart(false);}}/>}
      {showLogoutVerify && <LogoutVerify onLogoutPress={()=>{
        setShowFadeBackground(false);
        setShowMainPage(false);
        setShowLoginPage(true);
        setShowRegisterPage(false);
        setShowChartPage(false);
        setShowModeSelector(false);
        setShowAnalogMode(false);
        setShowDigitalMode(false);
        setShowPushButtonMode(false);
        setShowEditPinName(false);
        setShowEditTimeSetting(false);
        setShowConfigPieChart(false);
        setShowLogoutVerify(false);
        setShowNav(false);
      }} 
      logOutCancel={()=>{
        setShowLogoutVerify(false);
        setShowFadeBackground(false);
      }}/>}

      {showDeletePinVerify && <DeletePinVerify pinData={pinDataSelect} uid={uid} onDeletePinClose={()=>{setShowDeletePinVerify(false); setShowFadeBackground(false); onClick();}}/>}

      {showNav && <Nav 
      onSandee={()=>{
        if(!showAdvice2 && !showFadeTutorial && !showFadeBackground && !showFadeTutorialChart && !showLogoutVerify){
          setShowAdvice(true);
        }
      }}
      showMainPage={showMainPage} 
      onLogoutVerify={
        ()=>{setShowLogoutVerify(true);
        setShowFadeBackground(true);
        }} 
      pushButtonPageClick={()=>{
        setShowModeSelector(true);
        setShowAdvice(false);
        setShowAdvice2(false);
        setShowMainPage(false);
        setShowChartPage(false);
      }} 
      mainPageClick={()=>{
        setShowMainPage(true);
        setShowChartPage(false); 
        setShowModeSelector(false);
      }} 
      chartPageClick={()=>{
        setShowMainPage(false);
        setShowChartPage(true);
        setShowModeSelector(false);
      }} 
      onLogoutPress={()=>{
        setShowMainPage(false);
        setShowLoginPage(true);
        setShowNav(false);
        setShowChartPage(false); 
        setShowModeSelector(false); 
        setRender(prev=>!prev); 
      }}
      />}
      {showFadeBackground && <FadeBackground
      showTT6={showTT6} 
      showTT4={showTT4}
      onNext={()=>{setShowTT4(false)}}
      />}

      {showAdvice2 && <Advice2
      showAdvice2={showAdvice2}
      onDeny={()=>{
        setShowAdvice2(false);
      }}
      />}

      {showAdvice && <Advice
      onAsk={()=>{
        setShowAdvice2(true);
        setShowAdvice(false);
      }}
      onDeny={()=>{
        setShowAdvice(false)
      }}
      />}

      {showFadeTutorialChart && <FadeTutorial_Chart 
        onNext={()=>{
          setShowFadeTutorialChart(false);
          AsyncStorage.setItem('ChartTutorial','firstStep')
        }}
      />}

      {showFadeTutorial && <FadeTutorial showUID={showUID} onNext={()=>{
        setShowFadeTutorial(false);
        AsyncStorage.setItem('firstTime?','No')
      }}/>}
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"space-between",
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
