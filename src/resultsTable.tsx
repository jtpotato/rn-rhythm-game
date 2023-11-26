import { View, Text } from "react-native";
import { GameResults } from "./logic/gameManager";
import globalStyle from "./styles";

function ResultsTable({ results }: { results: GameResults }) {
    return (<>
        <View style={{}}>
            <Text style={{ ...globalStyle.text, fontWeight: "bold", flex: 2 }}>Consistency (Accuracy)</Text>
            <Text style={{ ...globalStyle.text, flex: 1 }}>{results ? Math.round(results.accuracyPercent * 10000) / 100 + "%" : ""}</Text>
            {/* <View style={{ flexDirection: "column" }}>
                <Text style={{ ...globalStyle.text, fontWeight: "bold", flex: 2 }}>Standard Deviation</Text>
                <Text style={{ ...globalStyle.text, flex: 1 }}>{results ? Math.round(results.stdDev * 100) / 100 + "ms" : ""}</Text>
            </View>
            <View style={{ flexDirection: "column", gap: 10 }}>
                <Text style={{ ...globalStyle.text, fontWeight: "bold", flex: 2 }}>BPM</Text>
                <Text style={{ ...globalStyle.text, flex: 1 }}>{results ? Math.round(results.bpm * 100) / 100 + "bpm" : ""}</Text>
            </View>
            <View style={{ flexDirection: "column", gap: 10 }}>
                <Text style={{ ...globalStyle.text, fontWeight: "bold", flex: 2 }}>Consistency (Accuracy)</Text>
                <Text style={{ ...globalStyle.text, flex: 1 }}>{results ? Math.round(results.accuracyPercent * 10000) / 100 + "%" : ""}</Text>
            </View> */}
        </View>

    </>
    )
}

export default ResultsTable;