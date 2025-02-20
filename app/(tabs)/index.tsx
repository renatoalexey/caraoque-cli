import { Image, StyleSheet, Platform, View, TextInput, Button, FlatList } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { addClient, getClients, addSong, getSongs } from '../../dao/firestoreService';
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
   
    const interval = setInterval(() => {
      updateSongs()
      console.log("blabla")
    }, 30000)

    return () => clearInterval(interval)
  }, []);

  const handleAddClient = async () => {
    if (clientName) {
      let clientAux = {name: clientName.trim(), referenceWeight: -1, createdAt: new Date()}
      setClient(clientAux)
      addClient(clientAux).then( (response: any) => {
        console.log("Teste2 ###: " + response)
        setClientId(response)
      });
    }
  };

  const handleAddSong = async (videoId: any, title: any, channelTitle: any) => {
      client.referenceWeight ++
      setClient(client)
      // update client
      const newRow: Song = {id: parseInt('' + Math.random() * 10000), clientId: clientId, createdAt: new Date(),
        weight: client.referenceWeight, videoId, title, channelTitle
      };

      addSong(newRow)
      
      const docSongs: any = await getSongs()

      const songs: Song[] = getSongsFromDocs( docSongs ) 

      setSongList(songs.filter( (input: any) => input.clientId == clientId ));
      console.log("Songs: " + JSON.stringify(songList))
  }

  const updateSongs = async () => {
      const docSongs: any = await getSongs()
      const songs: Song[] = getSongsFromDocs( docSongs ) 

      setNextSongs(songs.slice(0, 5))
      setSongList(songs.filter( (input: any) => input.clientId == clientId ));
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
            placeholder='Digite o nome do cliente' />
          
        </View>
          <Button
            onPress={() => handleAddClient()}
            title="Adicionar Cliente"
            color="#841584"
            accessibilityLabel="Learn more about this purple button" />
          {clientId !== '' &&
            <ThemedText type="subtitle">Cliente Atual: {client.name} ID: {clientId}</ThemedText>}
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
            <ThemedText type="subtitle"> músicas</ThemedText>
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
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
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
