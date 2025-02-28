import { Image, StyleSheet, Platform, View, TextInput, Button, FlatList } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { addClient, getClients, addSong, getSongs, getNextSongs } from '../../dao/firestoreService';
import SearchScreen from '@/components/youtube/Search';
import MiniCard from '@/components/youtube/MiniCard';
import { Song, Client } from '@/constants/Types'

export default function HomeScreen() {

  const [clientName, setClientName] = useState('')
  const [clientId, setClientId] = useState('')
  const [client, setClient] = useState({name:'', referenceWeight: -1} as Client);
  const [songList, setSongList] = useState([] as Song[]);
  const [nextSongs, setNextSongs] = useState([] as Song[]);
 
  useEffect(() => {
   
    console.log("wsfsdf")
    const interval = setInterval(() => {
      updateSongs()
    }, 5000)

    return () => clearInterval(interval)
  }, [client]);

  const handleAddClient = async () => {
    if (clientName) {
      let clientAux: Client = {name: clientName.trim(), referenceWeight: -1, createdAt: new Date()}
      addClient(clientAux).then( (response: any) => {
        setClientId(response)
        clientAux.id = response
        setClient(clientAux)
      });
    }
  };

  const handleAddSong = async (videoId: any, title: any, channelTitle: any) => {
      client.referenceWeight ++
      setClient(client)
      // update client
      const newRow: Song = {clientId: client.id!, createdAt: new Date(),
        weight: client.referenceWeight, videoId, title, channelTitle
      };

      addSong(newRow)
      
     updateSongs() 
  }

  const updateSongs = async () => {
      const docSongs: any = await getSongs()
      const nextSongsAux: any = await getNextSongs()

      //console.log("Teste ####: " + JSON.stringify(docSongs))
      //console.log("sdcsd ####: " + JSON.stringify(nextSongsAux))
      console.log("iniciou update")
      console.log("client id: " + client.id)
      let songFilter = nextSongsAux.filter( (ns: any) => ns.clientId == client.id )
        .concat(docSongs.filter( (input: any) => input.clientId == client.id)
    )
     // let songFilter =       
    
      setNextSongs(nextSongsAux)
      setSongList(songFilter);
  }

  const getSongsFromDocs = ( (docSongs: any) : Song[] => {
    return docSongs.map( (input: any) => {
      delete input.id
      return input
    })
  })

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Cliente</ThemedText>
        <View style={{
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-around",
          elevation: 5,
        }}>
          <TextInput style={{
            width: "70%",
            borderBlockColor: "black",
            backgroundColor:"#e6e6e6",
            borderCurve: "circular"
          }} value={clientName} onChangeText={setClientName} 
            placeholder='Digite o seu nome' />
          
        </View>
          <Button
            onPress={() => handleAddClient()}
            title="Salvar"
            color="#841584"
            accessibilityLabel="Learn more about this purple button" />
          {clientId !== '' &&
            <ThemedText type="subtitle">Bem vindo {client.name} !</ThemedText>}
        <ThemedText type="subtitle">Música</ThemedText>
        <SearchScreen addSongToList={handleAddSong} songList={songList} />
        <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Suas músicas</ThemedText>
            <FlatList
              data={songList}
              renderItem={({ item, index }: any) => {
                return <MiniCard
                          videoId={item.videoId}
                          title={item.title}
                          channel={item.channelTitle}
                          client={client.name} />
          } } />

        </ThemedView>

            <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle"> Fila de músicas</ThemedText>
            <FlatList
              data={nextSongs}
              renderItem={({ item, index }: any) => {
                return <MiniCard
                          videoId={item.videoId}
                          title={item.title}
                          channel={item.channelTitle}
                          client={item.clientId == clientId ? client.name: ''} />
          } } />
        </ThemedView>
        
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
