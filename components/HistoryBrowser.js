import { StyleSheet, View, Text, FlatList, Image,Button } from 'react-native';
import { useEffect,useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function HistoryBrowser(props) {
  const [images,setImages] = useState([]);
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
    console.log(newImages);
    setImages(newImages);
  }

  const getURI = (filename) => {
    const uri = FileSystem.documentDirectory + filename;
    console.log(uri);
    return uri;
  }

  const goBack = () => {
    if (props.onBack) {
      props.onBack();
    }
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
        renderItem={({item}) => <Image style={styles.image} source={{
          uri: getURI(item),
        }}/>}
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