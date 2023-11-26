import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyle from "../src/styles";
import { saveGame } from "../src/logic/gameManager";
import { analyseResults } from "../src/logic/analyseResults";
import { saveStats } from "../src/logic/statsManager";
import { Link, Stack, router } from "expo-router";
import * as Haptics from 'expo-haptics';

export default function App() {
  const [clickTimes, setClickTimes] = useState<number[]>([]);

  function addClick() {
    setClickTimes([...clickTimes, performance.now()]);

    if (8 - clickTimes.length == 1) {
      // saveGame([...clickTimes, performance.now()])
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      )
      saveStats([...clickTimes, performance.now()])
      setClickTimes([])
      router.push({ pathname: "/results", params: { results: [...clickTimes, performance.now()] } })
    }
  }

  return (
    <View style={{ ...globalStyle.container, backgroundColor: "#050505" }}>
      <Stack.Screen options={{
        title: "Home",
        headerShown: false,
      }} />
      <Text style={globalStyle.text}>Maintain a consistent rhythm.</Text>
      <Text style={globalStyle.text}>Tap {8 - clickTimes.length} times.</Text>
      <TouchableOpacity style={{
        backgroundColor: "yellow",
        borderRadius: 100,
        width: 200,
        height: 200,
      }}
        onPress={() => { addClick() }}
      ></TouchableOpacity>
      <View style={{ height: 50 }} />
      <Link href="/history">
        <Text style={{ ...globalStyle.text, color: "yellow" }}>View History</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({

});
