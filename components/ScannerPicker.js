import { View, Text, FlatList,StyleSheet } from 'react-native';

export default function ScannerPicker({ label, onPress }) {
  return (
    <View style={styles.container}>
       <Text style={{color: "white"}}>Select a scanner:</Text>
       <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
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