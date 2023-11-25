import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from "react-native";

export default function App() {
  const [clickTimes, setClickTimes] = useState<number[]>([]);

  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff", fontSize: 16 }}>Tap with a consistent rhythm.</Text>
      <TouchableOpacity style={{
        backgroundColor: "yellow",
        borderRadius: 100,
        width: 200,
        height:200
      }}
      onPress={() => { setClickTimes(v => [...v, performance.now()]) }}
      ></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    backgroundColor: "#000",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});
