import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

export default function ItemsPicker({ items,onPress }) {
  return (
    <View style={styles.container}>
      <Text style={{color: "white"}}>Select an item:</Text>
      {items.map((item, idx) => (
        <Pressable key={idx} onPress={()=>onPress(item)}>
          <Text style={styles.item}>{item}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 20,
    width: "100%",
    height: "100%",
    alignItems: 'flex-start',
    backgroundColor: 'black',
  },
  item: {
    color: "white",
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});