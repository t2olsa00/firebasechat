import React, { useState } from "react";
import { SafeAreaView, TextInput, View, Button, Text } from "react-native";
import {getAuth, signInWithEmailAndPassword} from './firebase/Config'

export default function Login({ setLogin }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

 /* const login = () => {
    // Add your login logic here
    console.log("Username:", userName);
    console.log("Password:", password);
  };
*/
  const login = () => {
    const auth = getAuth()

    signInWithEmailAndPassword(auth,userName,password)
    .then((userCredential) => {
        console.log(userCredential.userName)
        setLogin(true)
    }).catch((error) => {
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            console.log('Invalid credentials')
        } else if ((error.code === 'auth/too-many-requests')) {
            console.log('Too many attempts to login')
        } else {
            console.log(error.code + ' ' + error.message)
        }
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style ={{ width: 300}}>
        <Text style={styles.heading}>Login</Text>
        <Text style={styles.field}>Email</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />
        <Text style={styles.field}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Login" onPress={login} />
      </View>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  field: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
};
