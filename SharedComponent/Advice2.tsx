import { StyleSheet, View , Text, TouchableOpacity, Image } from "react-native"
import { useEffect, useState } from "react";
import { colors } from "../assets/String/colors";
import { mainStyle } from "../Fragments/MainPage/MainPage";
import Icon from 'react-native-vector-icons/FontAwesome';
import { resolve } from "url";
import { rejects } from "assert";
import Clipboard from "@react-native-clipboard/clipboard";



export default function Advice2(props:any){
  
  const [dot,setDot] = useState(".");
  const [step,setStep] = useState(0)


  const _av1 = "สวัสดีอีกครั้ง! ฉันชื่อแสนดี"
  const _av2 = ". . . อาาาา ฉันจะเริ่มต้นยังไงดี"
  

  useEffect(() => {
    const interval = setInterval(() => {
      setDot(prev => (prev.length >= 6 ? "." : prev + " ."));
    }, 1000); // เปลี่ยนค่าทุก 1 วินาที
  
    return () => clearInterval(interval); // ล้าง interval เมื่อ component unmount
  }, []);
  

    const first_tt = {
        top: 480,
        height: 300
    }
    function onDeny(){
      if(step !== 0){
        setStep(prev=>prev-1)
      }
    }

    function onAsk(){
        if(step !== 41){
          setStep(prev=>prev+1)
        }
    }

    useEffect(()=>{
      if(step===41){
        props.onDeny();
      }
    },[step])

    function onDownload(){
      Clipboard.setString('https://drive.google.com/drive/u/0/folders/1xRdmdPaKHfhoPW7UWqZkmc-YQmMkUHME');
    }

    function onClipboard(){
      Clipboard.setString(`// IotPi Library
#include <IotPi.h>
// WiFi Library
#include <WiFi.h> //สำหรับ ESP32 
#include <ESP8266WiFi.h> // สำหรับ ESP8266
// *ลบ WiFi Library ที่ไม่ได้ใช้ หากใช้ ESP32 ให้ลบ Library ของ ESP8266*

// กำหนด GPIO ของ ESP
#define LED_PIN 2

unsigned long prevTime = 0; // ตัวแปรสำหรับดีเลย์ของเซนเซอร์จำลอง
int virtualSensor_A = 0; // ตัวแปรสำหรับค่าเซนเซอร์จำลอง
int virtualSensor_B = 0; // ตัวแปรสำหรับค่าเซนเซอร์จำลอง

// การตั้งค่าการเชื่อมต่อ WiFi และแอพลิเคชัน iotPi
const char* auth = "YOUR_TOKEN";
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
IotPi iotpi(auth,ssid,password); // สร้างอ็อบเจ็คต์ (Object) ของคลาส (Class) IotPi โดยใช้ชื่ออ็อบเจคต์ว่า iotpi 

// ตัวอย่าง : 
//int button_A = 9999; // Example Button ID
//int button_B = 9998; // Example Button ID
// ...
int button_A = YOUR_BUTTON_ID; // แทนด้วยเลข Button ID 
int chartID_A = YOUR_CHART_ID; // แทนด้วย Chart ID อันแรกของคุณ
int chartID_B = YOUR_CHART_ID; // แทนด้วย Chart ID อันที่สองของคุณ

void setup() {
  Serial.begin(115200); // เริ่มต้นการเชื่อมต่อ Serial
  pinMode(LED_PIN,OUTPUT); // กำหนดขา LED_PIN เป็น OUTPUT
  iotpi.initButton(button_A); // กำหนดค่าของปุ่ม โดยการกำหนดอาร์กิวเมนต์ คือ Button ID
  //iotpi.initButton(button_B);
  iotpi.begin(); // สั่งเริ่มต้นการทำงานของออบเจ็กต์ iotpi ซึ่งต้องมีการเรียกใช้ทุกครั้ง ภายใน void setup()
}

void loop() {
  iotpi.run(); // ต้องเรียกใช้งานเมธอด run() จากออบเจ็กต์ iotpi

  // โค้ดสำหรับสำหรับเซนเซอร์จำลอง
  unsigned long currentTime = millis();
  if((currentTime - prevTime) > 200){
    virtualSensor_A += 1;
    prevTime = currentTime;
  }
  if(virtualSensor_A>1023){
      virtualSensor_A = 0;
  }
  virtualSensor_B = abs(virtualSensor_A - 1023);
  // โค้ดสำหรับสำหรับเซนเซอร์จำลอง


  // โค้ดสำหรับการตรวจสอบปุ่มและควบคุมการเปิด-ปิด LED 
  if(iotpi.readButton(button_A)) // ตรวจสอบปุ่มที่มี Button ID = button_A
  {
    digitalWrite(LED_PIN,HIGH);
  }
  else
  {
    digitalWrite(LED_PIN,LOW);
  }
  // โค้ดสำหรับการตรวจสอบปุ่มและควบคุมการเปิด-ปิด LED

  // การส่งค่าไปยัง Chart
  iotpi.print(chartID_A,virtualSensor_A); // ส่งค่าไปที่ Chart ที่มี ID = chartID_A (YOUR_CHART_ID)
  iotpi.print(chartID_B,virtualSensor_B);
}`);
    }

    return (
      <>
        <View
          style={[
            tt.size,
            tt.position,
            {top: "50%", borderRadius: 30},
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
                    <Text style={[mainStyle.text,{fontSize:22, textAlign:"center",paddingTop:10}]}>เริ่มต้นเขียนโค้ด</Text>
                </View>
                <View style={[{marginTop:10,width:"95%",height:"80%",display:'flex',justifyContent:"flex-start",alignItems:"center"}]}>
                    <View style={{backgroundColor:colors.whiteF0, borderRadius:20, paddingHorizontal:8, paddingVertical:3, width:"100%" , height:160 , paddingLeft: 10}}>
                      
                      {( step === 0 || step ===1) && 
                      <Text style={[mainStyle.text]}>สวัสดีอีกครั้ง! ฉันชื่อแสนดี {step===0 ? dot : "" }</Text>
                      }
                      {(step === 1) &&
                      <Text style={mainStyle.text}>เอ่อฉันจะเริ่มยังไงดีนะ {step===1?dot:""}</Text>
                      }
                      {(step === 2 || step ===3) &&
                      <Text style={mainStyle.text}>อ่อ ! ! {"\n"}ก่อนที่เราจะควบคุมอุปกรณ์ได้ {step===2?dot:""}</Text>
                      }
                      {(step === 3) &&
                      <Text style={mainStyle.text}>เราต้องทำการเขียนโปรแกรมให้กับอุปกรณ์ก่อน ซึ่งเราจะมาเขียนกันด้วยภาษา C ++ {step===3?dot:""}</Text>
                      }
                      {(step === 4) &&
                      <Text style={mainStyle.text}>มาเริ่มกันเลย {step===4?dot:""}</Text>
                      }
                      {(step === 5) &&
                      <View>
                        <Image style={{width:"100%" , marginVertical: 8}} source={require('../assets/images/includeLib.png')}/>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>นำเข้า (Include) ไลบรารี IotPi.h เพื่อเริ่มต้นใช้งาน สามารถคัดลอกลิงค์ดาวน์โหลดได้เลย <TouchableOpacity onPress={onDownload}><Icon name="copy" size={30}></Icon></TouchableOpacity> {step===5?dot:""}</Text>
                      </View>
                      }
                      {(step === 6) &&
                      <View>
                        <Image style={{width:"100%" , marginVertical: 8}} source={require('../assets/images/wifi_h.png')}/>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>นำเข้า (Include) ไลบรารี WiFi.h <Text style={[mainStyle.text,{color:colors.pink}]}>สำหรับ ESP32</Text> {step===6?dot:""}</Text>
                      </View>
                      }
                      {(step === 7) &&
                      <View>
                        <Image style={{width:"100%" , marginVertical: 8}} source={require('../assets/images/ESP8266WiFi_h.png')}/>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>นำเข้าไลบรารี ESP8266WiFi.h {"\n"}<Text style={[mainStyle.text,{color:colors.pink}]}>สำหรับ ESP8266</Text> {step===7?dot:""}</Text>
                      </View>
                      }
                      {(step === 8) &&
                      <View>
                        <Image style={{width:"100%" , marginVertical: 8}} source={require('../assets/images/definePin.png')}/>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>กำหนดชื่อ เช่น LED_PIN แทนหมายเลขพิน ซึ่งในตัวอย่างคือพินหมายเลข 2 ของ ESP{step===8?dot:""}</Text>
                      </View>
                      }
                      {(step === 9) &&
                      <View>
                        <Image style={{width:"98%" , marginVertical: 8,position:"relative",left:0}} source={require('../assets/images/constchar.png')}/>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>สร้างตัวแปร auth, ssid และ password โดยกำหนดเป็น {"\n"}const char* {step===9?dot:""}</Text>
                      </View>
                      }
                      {(step === 10) &&
                      <View>
                        <Image style={{width:"100%" , marginVertical: 8}} source={require('../assets/images/objectCreate.png')}/>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>สร้างอ็อบเจ็กต์ของคลาส IotPi โดยการส่งค่า auth, ssid และ password เข้าไปทำงาน {step===10?dot:""}</Text>
                      </View>
                      }
                      {(step === 11 || step === 12) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>จากที่ผ่านมา เราได้สร้างออปเจคต์ของคลาส IotPi แล้วโดยมีชื่อว่า iotpi {step===11?dot:""}</Text>
                      </View>
                      }
                      {(step === 12) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>ต่อจากนี้เราจะมาดูการตั้งค่าในฟังก์ชัน setup กัน {step===12?dot:""}</Text>
                      </View>
                      }
                      {(step >= 13 && step <= 15 ) &&
                      <View>
                        <Image style={{width:"100%" , marginVertical: 8}} source={require('../assets/images/serialprint.png')}/>
                      </View>
                      }
                      {(step === 14) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>เปิดการสื่อสารแบบอนุกรมระหว่างบอร์ดกับคอมพิวเตอร์  {step===14?dot:""}</Text>
                      </View>
                      }
                      {(step === 15 || step === 16) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>เพื่อให้บอร์ดสามารถส่งและรับข้อมูลกับคอมพิวเตอร์ผ่าน Serial Monitor ได้ ! {step===15?dot:""}</Text>
                      </View>
                      }
                      {(step === 16) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8, color:colors.pink}]}>คุณสามารถกำหนด Baud rate เองได้ ในตัวอย่างคือ 9600 {step===16?dot:""}</Text>
                      </View>
                      }
                      {(step >= 17 && step <=20) &&
                      <View>
                        <Image style={{width:"100%",marginVertical: 8}} source={require('../assets/images/initPin.png')}></Image>
                      </View>
                      }
                      {(step === 18) &&
                      <View>
                      <Text style={[mainStyle.text,{marginLeft: 8}]}>ลงทะเบียนปุ่มโดยเรียกใช้งานเมธอด iotpi.initButton(9999) จากคลาส IotPi {step===18?dot:""}</Text>
                      </View>
                      }
                      {(step === 19 || step === 20) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>โดยกำหนดอาร์กิวเมนต์ด้วย ButtonID ซึ่งเป็นค่าประเภท Integer {step===19?dot:""}{"\n"}</Text>
                      </View>
                      }
                      {(step === 20) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>iotpi.initButton(int ButtonId) ซึ่งในตัวอย่าง Button ID คือ 9999 {step===20?dot:""}{"\n"}</Text>
                      </View>
                      }
                      {(step === 21 || step === 22) &&
                      <View>
                        <Image style={{width:"100%",marginVertical: 8}} source={require('../assets/images/pinMode.png')}></Image>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>กำหนดให้ขา LED_PIN เป็น OUTPUT หรือขาออก {step===21?dot:""}</Text>
                      </View>
                      }
                      {(step === 22) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>ทำให้เราสามารถส่งสัญญาณไฟฟ้าไปเปิดหรือปิดอุปกรณ์ เช่น LED ได้! {step===22?dot:""}{"\n"}</Text>
                      </View>
                      }
                      {(step === 23) &&
                      <View>
                        <Image style={{width:"100%",marginVertical: 8}} source={require('../assets/images/begin.png')}></Image>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>สั่งเริ่มต้นการทำงานของออบเจ็กต์ iotpi ซึ่งต้องมีการเรียกใช้ทุกครั้ง ภายใน void setup() {step===23?dot:""}</Text>
                      </View>
                      }
                      {(step === 24 || step === 25) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>การตั้งค่าในฟังก์ชัน setup ก็มีเพียงเท่านี้ {step===24?dot:""}</Text>
                      </View>
                      }
                      {(step === 25) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>ต่อไป เราจะมาเขียนโค้ดในส่วนของฟังก์ชัน loop {step===25?dot:""}</Text>
                      </View>
                      }
                      {(step === 26) &&
                      <View>
                        <Image style={{width:"100%",marginVertical: 8}} source={require('../assets/images/run.png')}></Image>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}> เรียกใช้เมธอด run จากออบเจ็กต์ iotpi ภายในฟังก์ชั่น loop {step===26?dot:""}</Text>
                      </View>
                      }
                      {(step === 27) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>โอเค ทีนี้ก็มาถึงขั้นตอนของการเขียนโปรแกรมควบคุมอุปกรณ์ของเรากันแล้ว {step===27?dot:""}</Text>
                      </View>
                      }
                      {(step === 28) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>แสนดีจะยกตัวอย่างการเขียนโปรแกรมควบคุม เปิด-ปิด หลอด LED ด้วยไลบรารี่ IotPi มาดูกันเลย{step===28?dot:""}</Text>
                      </View>
                      }
                      {(step === 29) &&
                      <View>
                        <Image style={{width:"100%",marginVertical: 0,resizeMode: "contain"}} source={require('../assets/images/logicSw.png')}></Image>
                      </View>
                      }
                      {(step === 30) &&
                      <View>
                        <Image style={{width:"100%",marginVertical: 0,resizeMode: "contain"}} source={require('../assets/images/readButton.png')}></Image>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>แสนดียกตัวอย่างการอ่านค่าสถานะของ Button ID : 9999 {step===30?dot:""}</Text>
                      </View>
                      }
                      {(step === 31) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>ต่อไปแสนดีจะยกตัวอย่างการส่งค่าเซนเซอร์มาแสดงผลชาร์ต {step===31?dot:""}</Text>
                      </View>
                      }
                      {(step === 32) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>การส่งค่าไปแสดงผลต้องเรียกใช้งานเมธอด print จากออบเจ็กต์ iotpi ที่เราสร้างไว้ก่อนหน้า {step===32?dot:""}</Text>
                      </View>
                      }
                      {(step === 33 || step === 34) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>โดยต้องมีการกำหนดอาร์กิวเมนต์ตัวแรกเป็น Chart ID และอาร์กิวเมนต์ตัวที่สองคือค่าที่ส่งไปให้ชาร์ต {step===33?dot:""}</Text>
                      </View>
                      }
                      {(step === 34) &&
                      <View>
                      </View>
                      }
                      {(step === 35) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8, textAlign:"center", color:colors.pink, marginTop: 8}]}>{"\n"}</Text>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>เดี๋ยวแสนดีจะแสดงโค้ดตัวอย่างให้ดูเอง {step===35?dot:""}</Text>
                      </View>
                      }
                      {(step === 36) &&
                      <View>
                        <Image style={{width:"100%",marginVertical: 0,resizeMode: "contain"}} source={require('../assets/images/chartExam.png')}></Image>
                      </View>
                      }
                      {(step === 37 || step === 38) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>สำหรับการเขียนโปรแกรมภาษา C++ ควบคุมอุปกรณ์ก็มีเพียงเท่านี้ {step===37?dot:""}</Text>
                      </View>
                      }
                    
                      {(step === 38) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>หากสงสัยสามารถกลับมาถามแสนดีได้เลย {"\n"}แสนดีพร้อมให้คำแนะนำเสมอ  {step===38?dot:""}</Text>
                      </View>
                      }
                      {(step === 39 || step === 40) &&
                      <View>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>อ่อ แสนดีลืมบอก แสนดีมีโค้ดตัวอย่างให้ด้วยนะ {step===39?dot:""}</Text>
                      </View>
                      }
                      {(step === 40) &&
                      <View style={{height:"100%", width:300}}>
                        <Text style={[mainStyle.text,{marginLeft: 8}]}>สามารถกด <Icon color={colors.greyText} size={25} name="copy"></Icon> เพื่อคัดลอกโค้ดไปลองใช้งานได้เลย {step===40?dot:""}</Text>
                        <TouchableOpacity style={{marginTop:8,position:"absolute" , bottom: 65, right:10, flexDirection:"row",alignItems:"center"}} onPress={onClipboard}><Text style={[mainStyle.text,{marginRight:16}]}>คัดลอกโค้ด</Text><Icon color={colors.greyText} size={40} name="copy"></Icon></TouchableOpacity>
                      </View>
                      }
                    </View>
                    
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    
                    {(step !== 40 && step !== 41) &&  
                    <TouchableOpacity onPress={onDeny} activeOpacity={0.8}>
                    <View style={[{width:100,height:50,justifyContent:"center",alignItems:"center", backgroundColor:colors.lightYellow,borderRadius:20,marginTop:15 , boxShadow:"0 0 3 1 "+ colors.greyText}]}>
                        <Text style={[mainStyle.text,{textAlign:"center"}]}>ย้อนกลับ</Text>
                    </View>
                    </TouchableOpacity>
                    }
                    <View style={{width:20}}></View>
                    <TouchableOpacity onPress={onAsk} activeOpacity={0.8}>
                    <View style={[{width:100,height:50,justifyContent:"center",alignItems:"center", backgroundColor:colors.lightYellow,borderRadius:20,marginTop:15 , boxShadow:"0 0 3 1 "+ colors.greyText}]}>
                        {(step !== 40 && step !== 41) && 
                        <Text style={[mainStyle.text,{textAlign:"center"}]}>ถัดไป</Text>}
                        {step === 40  && 
                        <Text style={[mainStyle.text,{textAlign:"center"}]}>สิ้นสุด</Text>
                        }

                    </View>
                    </TouchableOpacity>
                    </View>
                </View>
                
            </View>
          <View 
            style={{
                width: 0,
                height: 0,
                borderLeftWidth: 25,
                borderRightWidth: 25,
                borderBottomWidth: 50,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: colors.mainYellow,
                position: 'absolute',
                top: first_tt.height -5,
                left: '50%',
                transform: [{ translateX: '-50%'},{rotate:'180deg'}],
            }}
        />
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