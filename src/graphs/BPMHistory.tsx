import { View, Text } from "react-native";
import { GameResults } from "../logic/gameManager";
import { LineChart } from "react-native-gifted-charts";
import DataCircle from "./DataCircle";
import globalStyle from "../styles";
import { useEffect, useState } from "react";

function BPMHistory({ history }: { history: GameResults[] }) {
    const [bpmHistory, setBpmHistory] = useState<{ value: number }[]>([])

    function createDataObjFromHistory(data: GameResults[]) {
        let dataObj: { value: number, customDataPoint?: Function }[] = []
        data.forEach((result: GameResults, index: number) => {
            dataObj.push({ value: result.bpm })
        })

        return dataObj
    }

    useEffect(() => {
        if (history.length > 0) {
            const dataObj = createDataObjFromHistory(history)
            console.log("New Data: ", dataObj)
            setBpmHistory(dataObj)
        }
    }, [history])

    return (<>
        <View>
            {bpmHistory.length > 0 ? <LineChart
                data={bpmHistory}
                lineGradient
                lineGradientStartColor={'#ffff00'}
                lineGradientEndColor="#aaaa00"
                xAxisColor={'white'}
                yAxisColor={'white'}
                noOfSections={3}
                thickness={5}
                areaChart
                startFillColor="#444400"
                endFillColor="#000000"
                yAxisTextStyle={{ color: 'white' }}
                xAxisLabelTextStyle={{ color: 'white' }}
                yAxisOffset={Math.round(Math.min(...bpmHistory.map((data) => data.value))) - 5}
                customDataPoint={DataCircle}
                spacing={300 / bpmHistory.length}
                height={150}
            /> : <Text style={globalStyle.text}>Loading...</Text>}
        </View>
    </>);
}

export default BPMHistory;