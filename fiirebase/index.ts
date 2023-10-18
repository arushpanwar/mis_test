import Contact from '@/interfaces/Contact';
import {initializeApp} from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite';
const firebaseConfig = {
    apiKey: "AIzaSyDgI_A2u7bJ60M7QxaXY9beQQuoaO-S9XM",
    authDomain: "mistest-3af9f.firebaseapp.com",
    projectId: "mistest-3af9f",
    storageBucket: "mistest-3af9f.appspot.com",
    messagingSenderId: "639365502542",
    appId: "1:639365502542:web:536ba632598af19e1e551f",
    measurementId: "G-ZYH5DHZL63"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  async function getContact(name?:string, phone?:string, email?:string):Promise<Contact[]|null >{
    const contactsCol = collection(db, 'contacts');
    const resData = await getDocs(contactsCol);
    const contacts = resData.docs.map(doc => doc.data()) as Contact[];
    
    const filtered= contacts.filter(contact=>(
        (!name||contact.name.toLowerCase().includes(name.toLowerCase()))&&
        (!phone||contact.phone.includes(phone))&&
        (!email||contact.email.includes(email)
    ))).sort((a,b)=>a.name>b.name?1:-1)
    return filtered;
  }
  async function addContact(name:string, phone:string[], email:string[], dob:string){
    const newCityRef = doc(collection(db, "contacts"));
    const newContact:Contact={name,phone,email,dob, id:newCityRef.id};
    return await setDoc(newCityRef, newContact);
}
async function updateContact(id:string, updatedContact:Partial<Contact>){
    const newCityRef = doc(db, "contacts",id);
    return await updateDoc(newCityRef, updatedContact);
}
async function deleteContact(id:string){
    const newCityRef = doc(db, "contacts",id);
    return await deleteDoc(newCityRef);
}

export {getContact, addContact, updateContact, deleteContact};