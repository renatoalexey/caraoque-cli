import React,{useState} from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput,FlatList,ActivityIndicator,Animated, Button, TouchableOpacity, Linking} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
//import MiniCard from '../components/MiniCard'
import Constant from 'expo-constants'
import {useTheme} from '@react-navigation/native'
import MiniCard from './MiniCard';
//import {useSelector,useDispatch} from 'react-redux'
//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=songs&type=video&key=AIzaSyDtCWCduSedfthvh

const SearchScreen = (props: {addSongToList: any, songList: any})=>{
    const {colors} =  useTheme()
    const mycolor = colors.background

    const [value,setValue] = useState("")

    type Any = any[]
    const initialValue: Any = []

    const [miniCardData,setMiniCard] = useState(initialValue)
    //const dispatch = useDispatch()
   // const miniCardData = useSelector(state=>{
     //   return state.cardData
    //})
    const [loading,setLoading] = useState(false)
    const fetchData = () =>{
        setLoading(true)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=AIzaSyAdMrmaepeFWaolsriMkpofsP1DdMt4SbI`)
        .then(res=>res.json())
        .then(data=>{

            setLoading(false)
            //dispatch({type:"add",payload:data.items})
            setMiniCard(data.items)
        })
    }
  return(
      <View style={{
          flex:1,
          marginTop:Constant.statusBarHeight,
          }}>
          <View style={{
              padding:5,
              flexDirection:"row",
              justifyContent:"space-around",
              elevation:5,
        
          }}>
             
             <TextInput
             style={{
                 width:"70%",
                 backgroundColor:"#e6e6e6",
                 borderBlockColor:"black"
                }}
             value={value}
             onChangeText={(text)=>setValue(text)}

             />
            <Button
                onPress={() => fetchData()}
                title="Procurar música"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
             <Ionicons
              style={{color:'black'}}
              //name='md-send'
             size={32}
             onPress={()=>fetchData()}
             />
          </View>
           {loading ?<ActivityIndicator style={{marginTop:10}} size="large" color="red"/>:null } 
          <FlatList
           data={miniCardData}
           renderItem={({item})=>{
               return <TouchableOpacity 
                    onPress={() => {
                        props.addSongToList(item.id.videoId, 
                            item.snippet.title, item.snippet.channelTitle)
                        setMiniCard(initialValue)
                    }}>
                <MiniCard
                    videoId={item.id.videoId}
                    title={item.snippet.title}
                    channel={item.snippet.channelTitle}
                    setMinicardData={setMiniCard}
                    addSongToList={props.addSongToList}
                /></TouchableOpacity>
            }}
           keyExtractor={item=>item.id.videoId}
          />
        
      </View>
  )
}

export default SearchScreen