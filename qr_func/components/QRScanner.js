import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
//QR 스캔
export default function QRScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedInfo, setScannedInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleScanned = ({ data }) => {
    try {
      const parsed = JSON.parse(data);
      setScannedInfo(parsed);
    } catch {
      Alert.alert("유효하지 않은 QR 코드입니다.");
    }
  };

  if (hasPermission === null) return <Text>카메라 권한 요청 중...</Text>;
  if (hasPermission === false) return <Text>카메라 접근이 거부되었습니다.</Text>;

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scannedInfo ? undefined : handleScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scannedInfo && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>📦 물건 정보</Text>
          <Text>이름: {scannedInfo.name}</Text>
          <Text>위치: {scannedInfo.location}</Text>
          <Text>아이템 ID: {scannedInfo.itemId}</Text>
          <Text>날짜: {scannedInfo.date}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  resultBox: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10
  },
  resultText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8
  }
});
