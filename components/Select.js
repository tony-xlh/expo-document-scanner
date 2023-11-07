import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Select({ label, onPress }) {
  return (
    <View
      style={[styles.container]}
      >
        <Pressable
          style={[styles.button]}
          onPress={onPress}
        >
          <Text style={[styles.label]}>{label}</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    borderWidth: 1, 
    borderColor: "white", 
    borderRadius: 10,
    height: 30,
    justifyContent:"center",
  },
  label:{
    marginLeft: 10,
    color: "white",
  }
});