import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, ScrollView } from 'react-native';
import { addDoc, collection, firestore, serverTimestamp } from './firebase/Config'
import { useEffect, useState, useRef } from 'react';
import { query, onSnapshot, orderBy } from 'firebase/firestore';
import Constants from 'expo-constants';
import { convertFirebaseTimestampToJS } from './helpers/Functions';
import Login from './Login';

export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [logged, setLogged] = useState(false)
  const scrollViewRef = useRef();
  const MESSAGES = 'messages';

useEffect(() => {
  const q = query(collection(firestore, MESSAGES),orderBy('created','desc'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const tempMessages = [];

    querySnapshot.forEach((doc) => {
      const messageObject = {
        id: doc.id,
        text: doc.data().text,
        created: convertFirebaseTimestampToJS(doc.data().created)
      };
      tempMessages.push(messageObject);
    });

    setMessages(tempMessages);
  });

  return unsubscribe;
}, []);


  const save = async() => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch (error => console.log(error))
    setNewMessage('')
    console.log('Message saved.')
  }

  if (logged) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef} style={styles.scrollView}>
        {messages.map((message) => (
          <View key={message.id} style={styles.message}>
            <Text style={styles.messageInfo}>{message.created}</Text>
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Send message...'
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <Button title='Send' onPress={save} />
      </View>
    </SafeAreaView>
  )
} else {
  return <Login setLogin={setLogged} />
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#454545',
    paddingTop: Constants.statusBarHeight
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8
  },
  messageInfo: {
    fontSize: 12
  }
});