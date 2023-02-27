import React, { useState } from 'react';
import type { Node } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import Logo from './src/assets/images/logo.jpeg';

const App: () => Node = () => {
  const [loading, setLoading] = useState(false);
  const [connection, setConnection] = useState(true);

  NetInfo.addEventListener(state => {
    if (state.isConnected !== connection) {
      setConnection(state.isConnected);
    }
   });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {connection && (
        <WebView
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
          source={{
            uri: 'http://172.74.76.218:44369/',
          }}
          style={styles.webView}
        />
      )}
      {loading && connection && (
        <View style={styles.loader}>
          <Image source={Logo} resizeMode="contain" style={styles.logo} />
          <ActivityIndicator
            size="large"
            color={'rgb(254, 18, 81)'}
          />
        </View>
      )}
      {!connection && !loading && (
           <View style={styles.loader}>
           <Image source={Logo} resizeMode="contain" style={styles.logo} />
           <Text>Lütfen İnternet Bağlantınızı Kontrol Ediniz.</Text>
         </View>
      )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'relative', width: '100%', height: '100%' },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  webView: {
    flex: 1,
  },
  loader: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default App;
