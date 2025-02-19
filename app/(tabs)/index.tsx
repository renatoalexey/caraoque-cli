import { Image, StyleSheet, Platform, View, TextInput, Button, FlatList } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { addClient, getClients, addSong, getSongs } from '../../dao/firestoreService';
import SearchScreen from '@/components/youtube/Search';
import MiniCard from '@/components/youtube/MiniCard';
import { Song, Client } from '@/constants/Types'

export default function HomeScreen() {

  const [clientName, setClientName] = useState('')
  const [clientOrder, setClientOrder] = useState('')
  const [client, setClient] = useState({order: -1, name:'', referenceWeight: -1} as Client);
  const [songList, setSongList] = useState([] as Song[]);

  const handleAddClient = async () => {
    if (clientName && clientOrder) {
      let clientAux = {order: parseInt(clientOrder), name: clientName.trim(), referenceWeight: -1}
      setClient(clientAux)
      await addClient(clientAux);
    }
  };

  const handleAddSong = async (videoId: any, title: any, channelTitle: any) => {
      client.referenceWeight ++
      setClient(client)
      // update client
      const newRow: Song = {id: parseInt('' + Math.random() * 10000), clientOrder: client.order, 
        weight: client.referenceWeight, videoId, title, channelTitle
      };

      addSong(newRow)
      
      const docSongs: any = await getSongs()

      setSongList(docSongs.map( (input: any) => {
        return input.song
      } ));
  }

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
        <ThemedText type="subtitle">N° Comanda</ThemedText>
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
          }} value={clientOrder} onChangeText={setClientOrder} 
            placeholder='Digite sua comanda' />
        </View>
          <Button
            onPress={() => handleAddClient()}
            title="Adicionar Cliente"
            color="#841584"
            accessibilityLabel="Learn more about this purple button" />
          {client.order !== -1 &&
            <ThemedText type="subtitle">Cliente Atual: {client.name}. N° Comanda: {client.order}</ThemedText>}
        <ThemedText type="subtitle">Música</ThemedText>
        <SearchScreen addSongToList={handleAddSong} songList={songList} />
        <ThemedView style={styles.stepContainer}>
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
