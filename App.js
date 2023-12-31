import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Text, Modal } from 'react-native';
import Button from './components/Button';
import { useState,useEffect, useRef } from 'react';
import ItemsPicker from './components/ItemsPicker';
import Select from './components/Select';
import DocumentScanner from './components/DocumentScanner';
import HistoryBrowser from './components/HistoryBrowser';
import { SafeAreaView, SafeAreaProvider  } from 'react-native-safe-area-context';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { DynamsoftService } from './DynamsoftService.js';

const PlaceholderImage = require('./assets/thumbnail.png');
const colorModes = ["Black&White","Gray","Color"];

export default function App() {
  const service = useRef();
  const scanners = useRef();
  const path = useRef("");
  const [showDevicePicker,setShowDevicePicker] = useState(false);
  const [showColorModePicker,setShowColorModePicker] = useState(false);
  const [showHistoryBrowser,setShowHistoryBrowser] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showScanner,setShowScanner] = useState(false);
  const [devices,setDevices] = useState(["Camera"]);
  const [selectedDeviceIndex,setSelectedDeviceIndex] = useState(0);
  const [selectedColorMode,setSelectedColorMode] = useState("Color");
  const [image,setImage] = useState(PlaceholderImage);
  useEffect(() => {
    service.current = new DynamsoftService("http://192.168.8.65:18622","t0196AgYAAEfllzdl2BHsMwY6jmomdcI78bkOy2qg8djI/bR/16WoyO8qBYMafK1pxFp2czGwZQYmzkFrLn7QGWIwAUFh52R5uO7ZPc600karTbSKJlq20cpVLRCn21f5/u4/Nc+RDLwnQJcNsgCsgVLOBhj6uTxagFiAGoBaNdACDleR+u/qBgq2kanfGv3HqVMaOPV+Z52Ue5xs4JRLzhQQn0LxSasdC8B656wAsQA9BDj/1HYBwRYQC9AdEKMKfXRfpBk0PA==");
    fetchDevicesList();
  }, []);

  const fetchDevicesList = async () =>{
    scanners.current = await service.current.getDevices();
    let newDevices = ["Camera"];
    for (let index = 0; index < scanners.current.length; index++) {
      const scanner = scanners.current[index];
      newDevices.push(scanner.name);
    }
    setDevices(newDevices);
  }

  const onScanned = async (dataURL) => {
    const timestamp = new Date().getTime();
    path.current = FileSystem.documentDirectory + timestamp + ".png";
    const base64Code = removeDataURLHead(dataURL);
    await FileSystem.writeAsStringAsync(path.current, base64Code, {
      encoding: FileSystem.EncodingType.Base64,
    });
    setImage({uri: path.current});
    setShowScanner(false);
  }

  const scan = async () => {
    if (selectedDeviceIndex == 0) {
      setShowScanner(true);
    }else{
      setModalVisible(true);
      const selectedScanner = scanners.current[selectedDeviceIndex - 1];
      const pixelType = colorModes.indexOf(selectedColorMode);
      const image = await service.current.acquireImage(selectedScanner.device,pixelType);
      onScanned(image);
      setModalVisible(false);
    }
  }

  const removeDataURLHead = (dataURL) => {
    return dataURL.substring(dataURL.indexOf(",")+1,dataURL.length);
  }

  const share = async () => {
    if (path.current) {
      Sharing.shareAsync(path.current);
    }
  }

  const renderBody = () => {
    if (showHistoryBrowser) {
      return (
        <HistoryBrowser onBack={()=>setShowHistoryBrowser(false)}></HistoryBrowser>
      )
    }
    if (showDevicePicker) {
      return (
        <ItemsPicker items={devices} onPress={(device,idx) => {
          console.log(device);
          setSelectedDeviceIndex(idx);
          setShowDevicePicker(false);
        }}></ItemsPicker>
      )
    }
    if (showColorModePicker) {
      return (
        <ItemsPicker items={colorModes} onPress={(mode) => {
          setSelectedColorMode(mode);
          setShowColorModePicker(false);
        }}></ItemsPicker>
      )
    }
    if (showScanner) {
      return (
        <DocumentScanner 
          license="DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAwMjI3NzYzLVRYbFhaV0pRY205cSIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21sdHMuZHluYW1zb2Z0LmNvbSIsIm9yZ2FuaXphdGlvbklEIjoiMTAwMjI3NzYzIiwic3RhbmRieVNlcnZlclVSTCI6Imh0dHBzOi8vc2x0cy5keW5hbXNvZnQuY29tIiwiY2hlY2tDb2RlIjotMzg1NjA5MTcyfQ=="
          colorMode={selectedColorMode} 
          onScanned={(dataURL)=>onScanned(dataURL)}
        ></DocumentScanner>
      )
    }
    return (
      <View style={styles.home}>
        <Modal
          transparent={true}
          visible={modalVisible}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Scanning...</Text>
            </View>
          </View>
        </Modal>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.option}>
            <Text style={styles.label}>Device:</Text>
            <Select style={styles.select} label={devices[selectedDeviceIndex]} onPress={()=>setShowDevicePicker(true)}></Select>
          </View>
          <View style={styles.option}>
            <Text style={styles.label}>Color Mode:</Text>
            <Select style={styles.select} label={selectedColorMode} onPress={()=>setShowColorModePicker(true)}></Select>
          </View>
          <View style={styles.buttons}>
            <View style={styles.buttonContainer}>
              <Button label="Scan" onPress={()=>scan()} />
            </View>
            <View style={styles.buttonContainer}>
              <Button style={styles.button} label="Share" onPress={()=>share()} />
            </View>
          </View>
          <View>
            <Button style={styles.button} label="History" onPress={()=>{
              path.current = "";
              setImage(PlaceholderImage); //display the place holder image in case the scanned image is deleted
              setShowHistoryBrowser(true)
            }} />
          </View>
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
  button:{
    marginBottom: 5,
  },
  buttons: {
    flexDirection:"row",
  },
  buttonContainer:{
    width:"50%",
  },
  home: {
    flex: 1,
    width: "100%",
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 3 / 5,
    width: "100%",
  },
  option:{
    flexDirection:"row",
    alignItems:"center",
    marginHorizontal: 20,
    height: 40,
  },
  label:{
    flex: 3 / 7,
    color: 'white', 
    marginRight: 10,
  },
  select:{
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems:"center",
  },
  image: {
    width: 320,
    height: "95%",
    borderRadius: 18,
    resizeMode: "contain",
    overlayColor:"#25292e"
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    top: "30%",
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});