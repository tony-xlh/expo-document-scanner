import { Alert, StyleSheet, View, Text, FlatList, Image,Button,Pressable,Dimensions } from 'react-native';
import { useEffect,useState,useRef } from 'react';
import ItemsPicker from './ItemsPicker';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const actions = ["Delete","Share","Get info","Cancel"];

export default function HistoryBrowser(props) {
  const [images,setImages] = useState([]);
  const [showActionPicker,setShowActionPicker] = useState(false);
  const pressedImageName = useRef("");
  useEffect(() => {
    console.log(width);
    console.log(height);
    readImagesList();
  }, []);

  const readImagesList = async () => {
    let newImages = [];
    const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if (file.toLowerCase().endsWith(".png")) {
        newImages.push(file);
      }
    }
    setImages(newImages);
  }

  const getURI = (filename) => {
    const uri = FileSystem.documentDirectory + filename;
    return uri;
  }

  const goBack = () => {
    if (props.onBack) {
      props.onBack();
    }
  }

  const deleteFile = async () => {
    if (pressedImageName.current != "") {
      setImages([]);
      const path = FileSystem.documentDirectory + pressedImageName.current;
      await FileSystem.deleteAsync(path);
      pressedImageName.current = "";
      readImagesList();
    }
  }

  const share = () => {
    if (pressedImageName.current != "") {
      const path = FileSystem.documentDirectory + pressedImageName.current;
      Sharing.shareAsync(path);
    }
  }

  const getInfo = async () => {
    if (pressedImageName.current != "") {
      const path = FileSystem.documentDirectory + pressedImageName.current;
      const info = await FileSystem.getInfoAsync(path);
      const time = new Date(info.modificationTime*1000);
      let message = "Time: " + time.toUTCString() + "\n";
      message = message + "Size: " + info.size/1000 + "KB";
      Alert.alert(pressedImageName.current,message);

    }
    
  }

  if (showActionPicker) {
    return (
      <ItemsPicker items={actions} onPress={(action) => {
        console.log(action);
        setShowActionPicker(false);
        if (action === "Delete") {
          deleteFile();
        }else if (action === "Share"){
          share();
        }else if (action === "Get info"){
          getInfo();
        }
      }}></ItemsPicker>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer} >
        <Button title="< Back" onPress={goBack}></Button>  
      </View>
      <FlatList
        horizontal={true}
        style={styles.flat}
        data={images}
        renderItem={({item}) => 
          <Pressable onPress={()=>{
            pressedImageName.current = item;
            setShowActionPicker(true);
          }}>
            <Image style={styles.image} source={{
              uri: getURI(item),
            }}/>
          </Pressable>}
      />
      
    </View>
      
    
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#25292e",
    alignItems:"center",
  },
  image: {
    width: width*0.9,
    height: height*0.9,
    resizeMode: "contain",
  },
  backButtonContainer:{
    position:"absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  }
});