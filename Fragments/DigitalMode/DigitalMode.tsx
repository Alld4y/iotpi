import { GestureDetector, Gesture  } from 'react-native-gesture-handler';
import { View,Text, BackHandler } from 'react-native';
import ArrowButtonLayout from '../AnalogMode/ArrowButtonLayout';
import { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
import { colors } from '../../assets/String/colors';
import Animated, { useSharedValue, useAnimatedStyle, withSpring,withTiming, runOnJS } from 'react-native-reanimated';
import { mainStyle } from '../MainPage/MainPage';

export default function DigitalMode(props: any) {

  const opacity = useSharedValue(1)

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true // บล็อกการกดปุ่มย้อนกลับ
    );
  
    return () => backHandler.remove();
  }, []);

  useEffect(()=>{
    Orientation.lockToLandscape();
    return () => {
        Orientation.unlockAllOrientations();
    };
  },[])

  const exitGesture = Gesture.LongPress()
    .minDuration(2000)
    .onTouchesDown(() => {
        opacity.value = withTiming(0.3, { duration: 2000 });
    })
    .onTouchesUp(()=>{opacity.value = withTiming(1,{ duration:500 })})
    .onEnd((e, success) => {
        opacity.value = withTiming(1); 
        if (success) {
            runOnJS(props.exitHandlerDigital)();
            console.log("back success");
        }
    });

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
      }));

  return (
    <View style={{flex:1,width:"100%",backgroundColor:colors.greyBG,opacity:1}}>
        <View style={{flexDirection:"column",position:"absolute",bottom:10,left:"50%" , transform:[{translateX:("-50%")}]}}>
            <Text style={[mainStyle.textHeader, {color: colors.lightYellow , marginStart: 20 , fontSize:18}]}>Hold X for  3 seconds for Exit</Text>
            <GestureDetector gesture={exitGesture}>
                <Animated.View style={[{height:60,width:60,backgroundColor:colors.mainYellow,borderRadius:100,zIndex:100,justifyContent:"center",alignSelf:"center"},animatedStyle]}><Text style={[mainStyle.text,{color:colors.black,textAlign:"center",fontWeight:"bold",fontSize:24}]}>X</Text></Animated.View>
            </GestureDetector>
            </View>
        <ArrowButtonLayout title={'digitalPage/2'} left={40} bottom={35}/>
        <ArrowButtonLayout title={'digitalPage/3'} right={40} bottom={35}/>
    </View>
  );
}
