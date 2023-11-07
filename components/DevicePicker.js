import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

export default function DevicePicker({ devices,onPress }) {
  return (
    <View style={styles.container}>
      <Text style={{color: "white"}}>Select a device:</Text>
      {devices.map((device, idx) => (
        <Pressable key={idx} onPress={()=>onPress(device)}>
          <Text style={styles.item}>{device}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingLeft: 20,
    width: "100%",
    height: "100%",
    alignItems: 'flex-start',
  },
  item: {
    color: "white",
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});