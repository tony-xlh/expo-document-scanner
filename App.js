import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Text } from 'react-native';
import Button from './components/Button';
import { useState,useEffect } from 'react';
import DevicePicker from './components/DevicePicker';
import Select from './components/Select';
import DocumentScanner from './components/DocumentScanner';
import { SafeAreaView, SafeAreaProvider  } from 'react-native-safe-area-context';

const PlaceholderImage = require('./assets/thumbnail.png');

export default function App() {
  const [showDevicePicker,setShowDevicePicker] = useState(false);
  const [showScanner,setShowScanner] = useState(false);
  const [devices,setDevices] = useState(["Camera"]);
  const [selectedDevice,setSelectedDevice] = useState("Camera");
  const [image,setImage] = useState(PlaceholderImage);
  useEffect(() => {
    
  }, []);

  const onScanned = (dataURL) => {
    setImage(dataURL);
  }

  const renderBody = () => {
    if (showDevicePicker) {
      return (
        <DevicePicker devices={devices} onPress={(device) => {
          console.log(device);
          setSelectedDevice(device);
          setShowDevicePicker(false);
        }}></DevicePicker>
      )
    }
    if (showScanner) {
      return (
        <DocumentScanner onScanned={(dataURL)=>onScanned(dataURL)}></DocumentScanner>
      )
    }
    return (
      <View style={styles.home}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.scanner}>
            <Text style={styles.label}>Device:</Text>
            <Select label={selectedDevice} onPress={()=>setShowDevicePicker(true)}></Select>
          </View>
          <Button label="Scan" onPress={()=>setShowScanner(true)} />
        </View>
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {renderBody()}
        <StatusBar style="auto"/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  home: {
    flex: 1,
    width: "100%",
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1 / 3,
  },
  scanner:{
    flexDirection:"row",
    alignItems:"center",
    marginHorizontal: 20,
    height: 50,
  },
  label:{
    color: 'white', 
    marginRight: 10,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
    resizeMode: "contain",
  },
});