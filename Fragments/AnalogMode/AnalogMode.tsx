import { useEffect,useContext } from "react";
import { View, Text, StyleSheet,BackHandler } from "react-native";
import Orientation from 'react-native-orientation-locker';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring,withTiming, runOnJS } from 'react-native-reanimated';
import { colors } from "../../assets/String/colors";
import ArrowButtonLayout from "./ArrowButtonLayout";
import { DataContext } from "../..";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import { mainStyle } from "../MainPage/MainPage";

const analogRadius = 180

const layoutPosition = {
    leftAnalogBottom: 60,
    leftAnalogLeft: 60,
}

export default function AnalogMode(props: any) {

    const sensorValue = useSharedValue({x:0,y:0})
    const offset = useSharedValue({ x: 0, y: 0 });
    const isPressed = useSharedValue(false);
    const start = useSharedValue({ x: 0, y: 0 });
    const centerX = 0; // ตำแหน่ง X ของจุดศูนย์กลางวงกลม
    const centerY = 0; // ตำแหน่ง Y ของจุดศูนย์กลางวงกลม
    const radius = (analogRadius/4); // รัศมีของวงกลม

    const {analogHandlerToWebSocket} = useContext(DataContext)

    const opacity = useSharedValue(1)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          () => true // บล็อกการกดปุ่มย้อนกลับ
        );
      
        return () => backHandler.remove();
      }, []);

    useEffect(() => {
        Orientation.lockToLandscape();
        return () => {
            Orientation.unlockAllOrientations();
        };
    }, []);

    function mapValue(value: number, in_min: number, in_max: number, out_min: number, out_max: number) {
            'worklet';
            return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
        };

 

const animatedStyles = useAnimatedStyle(() => {
    return {
        transform: [
            { translateX: (offset.value.x)*1.5 },
            { translateY: (offset.value.y)*1.5 },
            { scale: withSpring(isPressed.value ? 1 : 1) },
        ],
        backgroundColor: isPressed.value ? 'yellow' : 'blue',
    };
});


    const gesture = Gesture.Pan()
        .onBegin(() => {
            isPressed.value = true;
        })
        .onUpdate((e) => {
            // คำนวณตำแหน่งชั่วคราว
            const tempX = e.translationX + start.value.x;
            const tempY = e.translationY + start.value.y;
    
            // คำนวณระยะทางจากจุดศูนย์กลาง
            const distance = Math.sqrt((tempX - centerX) ** 2 + (tempY - centerY) ** 2);
    
            // ตรวจสอบว่าลูกบอลยังอยู่ในวงกลมหรือไม่
            if (distance <= radius) {
                offset.value = { x: tempX, y: tempY }; // อัปเดตตำแหน่ง
            } else {
                // จำกัดตำแหน่งให้อยู่ในขอบวงกลม
                const angle = Math.atan2(tempY - centerY, tempX - centerX);
                offset.value = {
                    x: centerX + radius * Math.cos(angle),
                    y: centerY + radius * Math.sin(angle),
                };
            }
           // console.log(`X: ${offset.value.x}   Y: ${offset.value.y}`)
            // แปลงค่าพิกัด offset.x และ offset.y ไปยังช่วง 0-1023
        
        sensorValue.value = { x: mapValue(offset.value.x, 0, radius, 0, 1023), y:mapValue(offset.value.y, 0, radius, 0, 1023) *-1} 
        // แสดงค่าในช่วง 0-1023
        //console.log(`Mapped X: ${sensorValue.value.x}, Mapped Y: ${sensorValue.value.y}`);
        runOnJS(analogHandlerToWebSocket)(sensorValue.value.x,sensorValue.value.y);

        

        })
        .onEnd(() => {
            start.value = {
                x: 0,
                y: 0,
            };
          offset.value = withSpring(start.value)  
        runOnJS(analogHandlerToWebSocket)(0,0);

        })
        .onFinalize(() => {
            isPressed.value = false;
        });

        // useEffect(()=>{
        //     // props ค่า x,y ผ่าน useContext
        // },[sensorValue.value.x,sensorValue.value.y])

        const exitGesture = Gesture.LongPress()
    .minDuration(2000)
    .onTouchesDown(() => {
        opacity.value = withTiming(0.3, { duration: 2000 });
    })
    .onTouchesUp(()=>{opacity.value = withTiming(1,{ duration:500 })})
    .onEnd((e, success) => {
        opacity.value = withTiming(1); 
        if (success) {
            runOnJS(props.exitHandler)();
            console.log("back success");
        }
    });

        console.log(opacity.value)

        const animatedStyle = useAnimatedStyle(() => ({
            opacity: opacity.value,
          }));

    return (
        <View style={{ flex: 1 ,width:"100%", backgroundColor:colors.greyBG}}>
            <View style={{flexDirection:"column",position:"absolute",bottom:10,left:"50%" , transform:[{translateX:("-50%")}]}}>
            <Text style={[mainStyle.textHeader, {color: colors.lightYellow , marginStart: 20 , fontSize:18}]}>Hold X for  3 seconds for Exit</Text>
            <GestureDetector gesture={exitGesture}>
                <Animated.View style={[{height:60,width:60,backgroundColor:colors.mainYellow,borderRadius:100,zIndex:100,justifyContent:"center",alignSelf:"center"},animatedStyle]}><Text style={[mainStyle.text,{color:colors.black,textAlign:"center",fontWeight:"bold",fontSize:24}]}>X</Text></Animated.View>
            </GestureDetector>
            </View>

            <GestureDetector gesture={gesture}>
                <View style={{borderStyle:"solid",borderWidth:2,borderColor:colors.grey,width:180,height:analogRadius,borderRadius:100,alignItems:"center",justifyContent:"center",position:"absolute",bottom: layoutPosition.leftAnalogBottom, left: layoutPosition.leftAnalogLeft}}>
                <Animated.View style={[styles.ball, animatedStyles]} />
                </View>
            </GestureDetector>
            <ArrowButtonLayout title={'analogPage/1'} right={50} bottom={35}/>
        </View>
    );
}

const styles = StyleSheet.create({
    ball: {
        width: analogRadius/2,
        height: analogRadius/2,
        borderRadius: 100,
        backgroundColor: 'blue',
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
});
