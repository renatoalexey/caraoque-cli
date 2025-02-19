// firestoreService.js
import { db } from "./config";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Song } from '@/constants/Types'

// 📌 Adicionar um usuário ao Firestore
export const addClient = async (name: any) => {
  try {
    await addDoc(collection(db, "clients"), {
      name,
      createdAt: new Date(),
    });
    console.log("Cliente adicionado!");
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
  try {
    await addDoc(collection(db, "songs"), {
      song,
      createdAt: new Date(),
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
