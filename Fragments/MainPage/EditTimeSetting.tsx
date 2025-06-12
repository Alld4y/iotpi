import { BackHandler, View } from "react-native";
import { useState,useContext,useEffect } from "react";
import { Text,TextInput,TouchableOpacity } from "react-native";
import { mainStyle } from "./MainPage";
import { pinInputStyles } from "./PinNameInputDialog";
import { colors } from "../../assets/String/colors";
import DateTimePicker from '@react-native-community/datetimepicker'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { DataContext } from "../..";
import { midColor } from "./PinLayout";

const thisHour = (new Date().getHours().toLocaleString('th-TH')).toString();
const thisMinutes = (new Date().getMinutes().toLocaleString('th-TH')).toString();
const thisDay = (new Date().getDate().toLocaleString('th-TH')).toString();
const thisMonth = ((new Date().getMonth()+1).toLocaleString('th-TH')).toString(); 
const thisYear = (new Date().getUTCFullYear()).toString(); 


export default function EditTimeSetting(props: any){

    const pinData = props.pinData

    const {saveDateTime,onClick} = useContext(DataContext)

    const [pinNameInput,setPinNameInput] = useState("");
    const [mode,setMode] = useState('daily');
    const [thisDate,setThisDate] = useState(new Date());
    const [time,setTime] = useState({start:`-` , stop: `-`, dateStart: "-" , dateStop: "-"})
    // const [date,setDate] = useState({start:`${thisDay} / ${thisMonth} / ${thisYear}`, stop: `${thisDay} / ${thisMonth} / ${thisYear}`})
    const [date,setDate] = useState({start:`-`, stop: `-`, dateStart:"-", dateStop:"-"})

    const [show,setShow] = useState(false);
    const [focus,setFocus] = useState("");
    const [dialogMode, setDialogMode] = useState <'date' | 'time' | 'datetime'>('date'); 
    const [render,setRender] = useState(false);

    const themeColor = midColor(pinData.pinColor);

console.log(time.dateStart)
    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", props.onBackPress);
        return () => backHandler.remove(); // ลบ listener เมื่อ component unmount
    }, []);

    useEffect(() => {
        console.log("Updated time:", time);
    }, [render]); // ติดตามการเปลี่ยนแปลงของ time
    

    const onChange = (event: any,selectDate: any) => {

        const currentDate = selectDate || date;

        if (event.type === "dismissed") {
            setShow(false);
            return;
        }

        if (selectDate && focus === 'daily-time-start') {
            
            setTime(prev=> ({...prev, dateStart: currentDate , start:`${currentDate.getHours()} : ${currentDate.getMinutes().toString().length === 1 ? "0": ""}${currentDate.getMinutes().toString()}`})); // ตั้งค่าเวลาใหม่
            setFocus("")
        }

        if (selectDate && focus === 'daily-time-stop') {
            
            setTime(prev=> ({...prev, dateStop: currentDate, stop:`${currentDate.getHours()} : ${currentDate.getMinutes().toString().length === 1 ? "0": ""}${currentDate.getMinutes().toString()}`})); // ตั้งค่าเวลาใหม่
            setFocus("")

        }
        if (selectDate && focus === 'selectDay-date-start') {
            
            if(dialogMode === 'date'){
                setDate(prev=> ({...prev, dateStart: currentDate, start:`${currentDate.getDate().toLocaleString('th-TH').toString()} / ${(currentDate.getMonth()+1).toLocaleString('th-TH').toString()} / ${currentDate.getUTCFullYear().toString()}`})); // ตั้งค่าเวลาใหม่
                setFocus("")
            }
            if(dialogMode === 'time'){
                setTime(prev => ({...prev, dateStart: currentDate}))
                setFocus("")
            }

        }
        if (selectDate && focus === 'selectDay-date-stop') {
            
            if(dialogMode === 'date'){
                setDate(prev=> ({...prev, dateStop: currentDate, stop:`${currentDate.getDate().toLocaleString('th-TH').toString()} / ${(currentDate.getMonth()+1).toLocaleString('th-TH').toString()} / ${currentDate.getUTCFullYear().toString()}`})); // ตั้งค่าเวลาใหม่
                setFocus("")
            }
            if(dialogMode === 'time'){
                setTime(prev => ({...prev, dateStop: currentDate}))
                setFocus("")
            }
        }
       

          setShow(false); // ปิด DateTimePicker หลังเลือกเวลา
    
        console.log("date", date)
        console.log("time" , time)
    }

    //console.log("editTimePageRender")

    const onSubmit = () => {

        const pinId = pinData.pinId;
        const pinName = pinData.pinName;
        const pinColor = pinData.pinColor;
        const pinState = pinData.pinState;
        let newTime = {};
        console.log('submit');
        if(mode === 'selectDay'){
            console.log("selectDay")
            const start = (date.dateStart+"").slice(0,10) + (time.dateStart+"").slice(10);
            const stop = (date.dateStop+"").slice(0,10) + (time.dateStop+"").slice(10);
            //console.log(start)
            //console.log(stop)
            const unixStart = Math.floor(new Date(start).getTime())
            const unixStop = Math.floor(new Date(stop).getTime())
            //console.log(unixStart)
            //console.log(unixStop)
            //console.log(new Date(unixStart).toISOString())
            //console.log(new Date(unixStop).toISOString())
            newTime = {dateStart:new Date(unixStart).toISOString(),dateStop:new Date(unixStop).toISOString(),start: time.start,stop: time.stop}
            saveDateTime(mode,date,newTime,pinId,pinName,pinColor,pinState);

        }
        if(mode === "daily"){
            console.log("daily")

            saveDateTime(mode,date,time,pinId,pinName,pinColor,pinState);
        }
        //console.log(newTime)
        //console.log("pinId",pinId);
        onClick();
        props.onSubmit();
    }

    return <View style={[pinInputStyles.container,{height: (mode === 'daily' ? 320 : 440)}]}>
            
    {/*Dialog Title*/}
    <View style={[pinInputStyles.field,{backgroundColor:midColor(pinData.pinColor)}]}>
        <Text style={[mainStyle.text, { alignSelf: 'center' }]}>Edit Schedule : {pinData.pinName}</Text>
    </View>

    {/* Input Layout */}

    <View style={{flexDirection:"row", marginBottom:15}}>
    <View style={[pinInputStyles.pinNameInputLayout,{marginBottom:0,alignItems:"center"}]}>
        <Text style={[mainStyle.text,{alignSelf:"center"}]}>Daily</Text>
        <TouchableOpacity activeOpacity={1} onPress={() => {setMode('daily');}}>
        <View style={{width:20, height:20, backgroundColor:(mode === "daily" ? themeColor : colors.white),borderRadius:100,marginHorizontal:8, borderWidth:2 , borderStyle:"solid", borderColor:themeColor}}></View>
        </TouchableOpacity>
    </View>

    <View style={[pinInputStyles.pinNameInputLayout,{marginBottom:0,alignItems:"center"}]}>
        <Text style={[mainStyle.text,{alignSelf:"center"}]}>Select Day</Text>
        <TouchableOpacity activeOpacity={1} onPress={() => {setMode('selectDay');}}>
        <View style={{width:20, height:20, backgroundColor:(mode === "selectDay" ? themeColor : colors.white),borderRadius:100,marginHorizontal:8, borderWidth:2 , borderStyle:"solid", borderColor:themeColor}}></View>
        </TouchableOpacity>
    </View>
    </View>

    {mode === 'daily' && 
    <View>
        <View style={[pinInputStyles.pinNameInputLayout,{marginHorizontal:"5%",marginVertical:0,justifyContent:"space-between",alignItems:"center"}]}>
        <Text style={[mainStyle.text,{alignSelf:"center"}]}>Start at</Text>
        {thisDate ? <Text style={mainStyle.text}> {time.start.length===6? "0":""}{time.start} </Text> : <Text>-</Text>}
        <TouchableOpacity onPress={()=>{setDialogMode('time'); setShow(true); setFocus('daily-time-start');}}>
        <View style={{borderRadius:100, width:40, height:40 , justifyContent:"center", alignItems:"center" , backgroundColor: colors.green}}><FontAwesome5 name="clock" size={30}></FontAwesome5></View>
        </TouchableOpacity>
    </View>

    <View style={[pinInputStyles.pinNameInputLayout,{justifyContent:"space-between", alignItems:"center"}]}>
        <Text style={[mainStyle.text,{alignSelf:"center"}]}>Stop at</Text>
        {thisDate ? <Text style={mainStyle.text}> {time.stop.length===6? "0":""}{time.stop} </Text> : <Text>-</Text>}
        <TouchableOpacity onPress={()=>{setDialogMode('time'); setShow(true); setFocus('daily-time-stop');}}>
        <View style={{borderRadius:100, width:40, height:40 , justifyContent:"center", alignItems:"center" , backgroundColor: colors.red}}><FontAwesome5 name="clock" size={30}></FontAwesome5></View>
        </TouchableOpacity>
    </View>
    </View>
    }

    {mode === 'selectDay' && 
    <View>
    <View style={[pinInputStyles.pinNameInputLayout,{marginHorizontal:"5%",marginVertical:0,justifyContent:"space-between",alignItems:"center"}]}>
    <Text style={[mainStyle.text,{alignSelf:"center"}]}>Date Start</Text>
    <Text style={mainStyle.text}> {date.start} </Text>
    <TouchableOpacity onPress={()=>{setDialogMode('date'); setShow(true); setFocus('selectDay-date-start');}}>
    <View style={{borderRadius:100, width:40, height:40 , justifyContent:"center", alignItems:"center" , backgroundColor: colors.green}}><FontAwesome5 name="clock" size={30}></FontAwesome5></View>
    </TouchableOpacity>
    </View>

        
    <View style={[pinInputStyles.pinNameInputLayout,{justifyContent:"space-between", alignItems:"center"}]}>
        <Text style={[mainStyle.text,{alignSelf:"center"}]}>Time Start</Text>
        <Text style={[mainStyle.text]}> {time.start.length===6? "0":""}{time.start} </Text>
        <TouchableOpacity onPress={()=>{setDialogMode('time'); setShow(true); setFocus('daily-time-start');}}>
        <View style={{borderRadius:100, width:40, height:40 , justifyContent:"center", alignItems:"center" , backgroundColor: colors.green}}><FontAwesome5 name="clock" size={30}></FontAwesome5></View>
        </TouchableOpacity>
    </View>

    <View style={[pinInputStyles.pinNameInputLayout,{marginHorizontal:"5%",marginVertical:0,justifyContent:"space-between",alignItems:"center"}]}>
    <Text style={[mainStyle.text,{alignSelf:"center"}]}>Date Stop</Text>
    <Text style={mainStyle.text}> {date.stop} </Text>
    <TouchableOpacity onPress={()=>{setDialogMode('date'); setShow(true); setFocus('selectDay-date-stop'); }}>
    <View style={{borderRadius:100, width:40, height:40 , justifyContent:"center", alignItems:"center" , backgroundColor: colors.red}}><FontAwesome5 name="clock" size={30}></FontAwesome5></View>
    </TouchableOpacity>
    </View>

    <View style={[pinInputStyles.pinNameInputLayout,{justifyContent:"space-between", alignItems:"center"}]}>
        <Text style={[mainStyle.text,{alignSelf:"center"}]}>Time Stop</Text>
        <Text style={[mainStyle.text]}> {time.stop.length===6? "0":""}{time.stop} </Text>
        <TouchableOpacity onPress={()=>{setDialogMode('time'); setShow(true); setFocus('daily-time-stop');}}>
        <View style={{borderRadius:100, width:40, height:40 , justifyContent:"center", alignItems:"center" , backgroundColor: colors.red}}><FontAwesome5 name="clock" size={30}></FontAwesome5></View>
        </TouchableOpacity>
    </View>
    
    </View>
    }


    {/* Button Submit & Cancel */}
    <View style={pinInputStyles.btnLayout}>
        <TouchableOpacity onPress={onSubmit} style={[pinInputStyles.btn,{backgroundColor:colors.mainYellow}]}>
            <Text style={mainStyle.text}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onBackPress} style={[pinInputStyles.btn,{backgroundColor:colors.red}]}>
            <Text style={mainStyle.text}>Back</Text>
        </TouchableOpacity>
    </View>

    {show && <DateTimePicker
    testID="dateTimePicker"
    value={thisDate}
    mode={dialogMode}
    is24Hour={true}
    display="default"
    onChange={onChange}
    
    />}

</View>
}