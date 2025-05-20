import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { CameraView } from 'expo-camera';
//QR 스캔
export default function QRScannerScreen({ goBack }) {
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);

  const handleScanned = ({ data }) => {
    setScanned(true);
    try {
      const parsed = JSON.parse(data);
      setQrData(parsed);
    } catch {
      Alert.alert('유효하지 않은 QR 코드입니다.');
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={scanned ? undefined : handleScanned}
      />
      {qrData && (
        <View style={styles.result}>
          <Text style={styles.title}>📦 QR 정보</Text>
          <Text>이름: {qrData.name}</Text>
          <Text>ID: {qrData.id}</Text>
          <Text>위치: {qrData.location}</Text>
          <Text>날짜: {qrData.date}</Text>
        </View>
      )}
      <View style={styles.buttons}>
        {scanned && (
          <Button title="다시 스캔" onPress={() => { setScanned(false); setQrData(null); }} color="#DAA520" />
        )}
        <Button title="← 홈으로" onPress={goBack} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  result: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 130,
    alignSelf: 'center',
    width: '85%',
  },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  buttons: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: 20
  }
});
