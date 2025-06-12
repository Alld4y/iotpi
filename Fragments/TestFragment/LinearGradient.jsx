import { View } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';


export default function(){
    return (
        <View>
            <Svg height="100%" width="100%" style={styles.svg}>
        <Defs>
          <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#ff7e5f" stopOpacity="1" />
            <Stop offset="100%" stopColor="#feb47b" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad1)" />
      </Svg>
        </View>
    )
}