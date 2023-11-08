import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Text } from 'react-native';
import Button from './components/Button';
import { useState,useEffect } from 'react';
import ItemsPicker from './components/ItemsPicker';
import Select from './components/Select';
import DocumentScanner from './components/DocumentScanner';
import { SafeAreaView, SafeAreaProvider  } from 'react-native-safe-area-context';

const PlaceholderImage = require('./assets/thumbnail.png');

export default function App() {
  const [showDevicePicker,setShowDevicePicker] = useState(false);
  const [showColorModePicker,setShowColorModePicker] = useState(false);
  const [showScanner,setShowScanner] = useState(false);
  const [devices,setDevices] = useState(["Camera"]);
  const [selectedDevice,setSelectedDevice] = useState("Camera");
  const [selectedColorMode,setSelectedColorMode] = useState("Color");
  const [image,setImage] = useState(PlaceholderImage);
  useEffect(() => {
    
  }, []);

  const onScanned = (dataURL) => {
    setShowScanner(false);
    setImage({uri: dataURL});
  }

  const renderBody = () => {
    if (showDevicePicker) {
      return (
        <ItemsPicker items={devices} onPress={(device) => {
          console.log(device);
          setSelectedDevice(device);
          setShowDevicePicker(false);
        }}></ItemsPicker>
      )
    }
    if (showColorModePicker) {
      return (
        <ItemsPicker items={["Black&White","Gray","Color"]} onPress={(mode) => {
          setSelectedColorMode(mode);
          setShowColorModePicker(false);
        }}></ItemsPicker>
      )
    }
    if (showScanner) {
      return (
        <DocumentScanner colorMode={selectedColorMode} onScanned={(dataURL)=>onScanned(dataURL)}></DocumentScanner>
      )
    }
    return (
      <View style={styles.home}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.option}>
            <Text style={styles.label}>Device:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
            <Select label={selectedDevice} onPress={()=>setShowDevicePicker(true)}></Select>
          </View>
          <View style={styles.option}>
            <Text style={styles.label}>Color Mode:</Text>
            <Select label={selectedColorMode} onPress={()=>setShowColorModePicker(true)}></Select>
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
    flex: 3 / 5,
  },
  option:{
    flexDirection:"row",
    alignItems:"center",
    marginHorizontal: 20,
    height: 40,
  },
  label:{
    color: 'white', 
    marginRight: 10,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 20,
  },
  image: {
    width: 320,
    height: 320,
    borderRadius: 18,
    resizeMode: "contain",
  },
});