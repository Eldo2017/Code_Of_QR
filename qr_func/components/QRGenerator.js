import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRGenerator() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [itemId, setItemId] = useState('');
  const [qrData, setQrData] = useState(null);

  const handleGenerateQR = () => {
    const data = {
      name,
      location,
      itemId,
      date: new Date().toISOString().split("T")[0]
    };
    setQrData(JSON.stringify(data));
  };

  return (
    <View style={styles.container}>
      <Text>물건 정보 입력</Text>
      <TextInput
        placeholder="물건 이름"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="위치"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        placeholder="아이템 ID"
        style={styles.input}
        value={itemId}
        onChangeText={setItemId}
      />
      <Button title="QR 생성" onPress={handleGenerateQR} />
      {qrData && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <QRCode value={qrData} size={200} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
    padding: 10,
    borderRadius: 5
  }
});
