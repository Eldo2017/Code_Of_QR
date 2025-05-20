import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRGeneratorScreen({ goBack }) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [jsonString, setJsonString] = useState('');

  const handleGenerate = () => {
    if (!name || !id) return;

    const data = {
      name,
      id,
      location,
      date
    };
    setJsonString(JSON.stringify(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR 코드 생성기</Text>

      <TextInput
        style={styles.input}
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="위치 (선택)"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="날짜 (선택)"
        value={date}
        onChangeText={setDate}
      />

      <Button title="QR 코드 생성" onPress={handleGenerate} color="#DAA520" />

      <View style={styles.qrContainer}>
        {jsonString ? (
          <QRCode value={jsonString} size={200} />
        ) : (
          <Text>QR 코드가 여기에 표시됩니다</Text>
        )}
      </View>

      <Button title="← 홈으로" onPress={goBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5
  },
  qrContainer: {
    marginVertical: 20,
    alignItems: 'center',
  }
});
