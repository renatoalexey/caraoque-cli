// firestoreService.js
import { db } from "./config";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { Client, Song } from '@/constants/Types'

// 📌 Adicionar um usuário ao Firestore
export const addClient = async (client: Client) => {
  try {

    let clientId: any
    await addDoc(collection(db, "clients"), {
      ...client
    }).then( (response: any) => {
      console.log("Teste ###: " + response['_key']['path']['segments'][1])
      //console.log(JSON.stringify(response))
      clientId = response['_key']['path']['segments'][1]
    });
    console.log("Cliente adicionado!");
    return clientId
  } catch (error) {
    console.error("Erro ao adicionar cliente: ", error);
  }
};

// 📌 Buscar todos os usuários do Firestore
export const getClients = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "clients"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erro ao buscar clientes: ", error);
    return [];
  }
};

// 📌 Adicionar um usuário ao Firestore
export const addSong = async (song: Song) => {
  
  song.createdAt = new Date()

  try {
    await addDoc(collection(db, "songs"), {
      ...song,
    });
    console.log("Canção adicionada!");
  } catch (error) {
    console.error("Erro ao adicionar canção: ", error);
  }
};

// 📌 Buscar todos os usuários do Firestore
export const getSongs = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "songs"))
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erro ao buscar usuários: ", error);
    return [];
  }
};

export const getClientSongs = async (clientId: string) => {
  try {
    const songsRef = collection(db, "songs")
    const queryAux = query(songsRef, where("clientId", "==", clientId))
    const querySnapshot = await getDocs(queryAux)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erro ao buscar usuários: ", error);
    return [];
  }
}

// 📌 Atualizar um usuário no Firestore
export const updateUser = async (userId: any, newName: any) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { name: newName });
    console.log("Usuário atualizado!");
  } catch (error) {
    console.error("Erro ao atualizar usuário: ", error);
  }
};

// 📌 Deletar um usuário do Firestore
export const deleteUser = async (userId: any) => {
  try {
    await deleteDoc(doc(db, "users", userId));
    console.log("Usuário deletado!");
  } catch (error) {
    console.error("Erro ao deletar usuário: ", error);
  }
};
