import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import QRGeneratorScreen from './screens/QRGeneratorScreen';
import QRScannerScreen from './screens/QRScannerScreen';
//메인
export default function App() {
  const [screen, setScreen] = useState('home');

  const renderScreen = () => {
    if (screen === 'generate') return <QRGeneratorScreen goBack={() => setScreen('home')} />;
    if (screen === 'scan') return <QRScannerScreen goBack={() => setScreen('home')} />;

    // 기본 홈 화면
    return (
      <View style={styles.container}>
        <View style={styles.buttonWrapper}>
          <Button title="QR 코드 생성" color="#DAA520" onPress={() => setScreen('generate')} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="QR 코드 스캔" onPress={() => setScreen('scan')} />
        </View>
      </View>
    );
  };

  return renderScreen();
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttonWrapper: { marginVertical: 10, width: '70%' }
});
