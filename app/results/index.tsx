import { useEffect, useState } from "react";
import { GameResults, getLastGame } from "../../src/logic/gameManager";
import globalStyle from "../../src/styles";
import { View, Text, SafeAreaView, Button } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { analyseResults, calculateDiffs } from "../../src/logic/analyseResults";
import TimeBetweenClicks from "../../src/graphs/TimeBetweenClicks";
import { getStats } from "../../src/logic/statsManager";
import ResultsTable from "../../src/resultsTable";
import { StatusBar } from "expo-status-bar";

function ResultsPage() {
    const localParams = useLocalSearchParams()
    const [diffs, setDiffs] = useState<number[]>([])
    const [analysedResults, setAnalysedResults] = useState<GameResults>()

    useEffect(() => {
        console.log(localParams.results)
        const resultsString = localParams.results as string
        const resultsNumbers = resultsString.split(",").map((x: string) => parseFloat(x))

        setDiffs(calculateDiffs(resultsNumbers))
        setAnalysedResults(analyseResults(resultsNumbers))
    }, [])

    return (<>
        <View style={{ backgroundColor: "#050505", flex: 1 }}>
            <Stack.Screen options={{
                title: "Results",
            }} />
            <SafeAreaView>
                <View style={{ padding: 20 }}>
                    <ResultsTable results={analysedResults} />
                    <Text style={globalStyle.h3}>Time Between Taps (ms)</Text>
                    <View style={{ flex: 1, justifyContent: "center", paddingTop: 20 }}>
                        <TimeBetweenClicks diffs={diffs} />
                    </View>
                    <View style={{ height: 210 }} />
                    <Link href="/history">
                        <Text style={{ ...globalStyle.text, color: "yellow" }}>View History</Text>
                    </Link>
                </View>
            </SafeAreaView>
        </View>

    </>);
}

export default ResultsPage;