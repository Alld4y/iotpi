import { View,Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { colors } from "../../assets/String/colors";
import { mainStyle } from "../MainPage/MainPage";
import HrTag from "../../SharedComponent/HrTag";
import { DataContext } from "../..";

export default function ModeSelectButton(props: any){

  const {title} = props.item

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            console.log('Mode Select Button Pressed');
            props.selected(title);
          }}>
          <View
            style={{
              borderStyle: 'solid',
              marginVertical: 5,
              width: '90%',
              height: 30,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text style={[mainStyle.text, {textAlign: 'center'}]}>
              {props.item.title}
            </Text>
          </View>
        </TouchableOpacity>
        <HrTag />
      </View>
    );
}