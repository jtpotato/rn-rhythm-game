import { Stack } from "expo-router";
import { View, Text } from "react-native";
import AccuracyHistory from "../../src/graphs/AccuracyHistory";
import { useEffect, useState } from "react";
import { GameResults } from "../../src/logic/gameManager";
import { getStats } from "../../src/logic/statsManager";
import globalStyle from "../../src/styles";
import BPMHistory from "../../src/graphs/BPMHistory";

function HistoryPage() {
    const [data, setData] = useState<GameResults[]>([]);

    useEffect(() => {
        (async () => {
            const stats = await getStats()
            console.log(stats.length)
            setData(stats)
        })()
    }, [])

    return (<>
        <Stack.Screen options={{
            title: "History",
        }} />
        <View style={{ backgroundColor: "#050505", flex: 1, padding: 20 }}>
            <Text style={{...globalStyle.h3, marginVertical: 10}}>Accuracy %</Text>
            <AccuracyHistory history={data} />
            <Text style={{...globalStyle.h3, marginVertical: 10}}>BPM</Text>
            <BPMHistory history={data} />
        </View>
    </>);
}

export default HistoryPage;