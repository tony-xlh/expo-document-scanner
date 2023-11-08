import { StyleSheet, View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { useEffect,useState } from 'react';
import { WebView } from 'react-native-webview';

export default function DocumentScanner(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const getURI = () => {
    let URI = 'https://tony-xlh.github.io/Vanilla-JS-Document-Scanner-Demos/react-native/?autoStart=true';
    if (props.colorMode == "Black&White") {
      URI = URI + "&colorMode="+0;
    }else if (props.colorMode == "Gray"){
      URI = URI + "&colorMode="+1;
    }else{
      URI = URI + "&colorMode="+2;
    }
    return URI;
  }
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission) {
    return (
      <WebView
        style={styles.webview}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onMessage={(event) => {
          console.log(event);
          if (!event.nativeEvent.data) {
            if (props.onClosed) {
              props.onClosed();
            }
          }else{
            if (props.onScanned) {
              const dataURL = event.nativeEvent.data;
              props.onScanned(dataURL);
            }
          }
        }}
        source={{ uri: getURI() }}
      />
    );
  }else{
    return <Text>No permission.</Text>
  }
}

const styles = StyleSheet.create({
  webview:{
    flex: 1,
  }
});