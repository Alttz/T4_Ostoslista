import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView } from 'react-native';

export default function App() {
  const [tuote, setTuote] = useState('');
  const [data, setData] = useState([]);
  const textInputRef = useRef(null);


  const lisaaListaan = () => {
    if (tuote.trim().length > 0) {
      setData([...data, { key: tuote }]);
      setTuote('');
      textInputRef.current.focus();
    } else {
      Alert.alert("Lisää tuotteen nimi");
    }
  };

  const tyhjennaLista = () => {
    setData([]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} 
    >      
    <TextInput
        ref={textInputRef}
        style={styles.input}
        value={tuote}
        onChangeText={setTuote}
        returnKeyType="send"
        onSubmitEditing={lisaaListaan}
        blurOnSubmit={false}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={lisaaListaan}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={tyhjennaLista}>
          <Text style={styles.buttonText}>CLEAR</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titleText}>Shopping List: </Text>
      <FlatList data={data} renderItem={({ item }) => <Text style={styles.flatListItem}>{item.key}</Text>}
        keyExtractor={(item, index) => index.toString()} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 250,
    padding: 75,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    marginHorizontal: 40,
  },
  button: {
    backgroundColor: 'rgba(33,150,243,255)',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  titleText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  flatListItem: {
    textAlign: 'center',
    fontSize: 18,
  },
});