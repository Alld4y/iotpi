import { View,Text } from "react-native"
import { colors } from "../assets/String/colors"

export default function Bar(){
    
    return (
        <View style={{marginVertical:15, height:50,justifyContent:"center",alignItems:"center"}}>
                <View style={{backgroundColor:"pink",height:"100%", width:"80%", borderColor:"red",borderStyle:"solid",borderWidth:3,borderRadius:100}}>
                    <Text>Bar</Text>
                </View>
            </View>
    )
}