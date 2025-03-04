import React from 'react';
import { StyleSheet, Text, View,Image,Dimensions,TouchableOpacity, Linking} from 'react-native';
import { useNavigation,useTheme } from '@react-navigation/native';
import { Link } from 'expo-router';

const MiniCard = (props: {videoId: any, title:any, channel: any, 
    client?: string, setMinicardData?: any, addSongToList?: any})=>{

    const navigation = useNavigation();
    const {colors} = useTheme()
    const textcolor = 'black'

    type Any = any[]
    const initialValue: Any = []
  return(
    
    <View style={{flexDirection:"row",margin:10,marginBottom:0}}>
        
        <Image 
           source={{uri:`https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`}}
           style={{
               width:"45%",
               height:100
           }} />
           <View style={{
               paddingLeft:7
           }}>
               <Text style={{
                   fontSize:17,
                   width:Dimensions.get("screen").width/2,
                   color:textcolor
                    }}
                ellipsizeMode="tail"
                numberOfLines={3}
                
               >{props.title}</Text>
               <Text style={{fontSize:12, color:textcolor}}>{props.channel}</Text>
               <Text>{props.client}</Text>
             
           </View>
    </View>
  )
}

export default MiniCard