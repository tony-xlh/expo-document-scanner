import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Text } from 'react-native';
import Button from './components/Button';
import { useState } from 'react';
import DevicePicker from './components/DevicePicker';
import Select from './components/Select';

const PlaceholderImage = require('./assets/thumbnail.png');

export default function App() {
  const [showDevicePicker,setShowDevicePicker] = useState(false);
  const [devices,setDevices] = useState(["Camera","Scanner"]);
  const [selectedDevice,setSelectedDevice] = useState("Camera");

  return (
    <View style={styles.container}>
      {showDevicePicker && (
        <DevicePicker devices={devices} onPress={(device) => {
          console.log(device);
          setSelectedDevice(device);
          setShowDevicePicker(false);
        }}></DevicePicker>
      )}
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.scanner}>
          <Text style={styles.label}>Device:</Text>
          <Select label={selectedDevice} onPress={()=>setShowDevicePicker(true)}></Select>
        </View>
        <Button label="Scan" />
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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