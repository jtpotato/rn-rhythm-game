import { View, Text } from "react-native";
import globalStyle from "../styles";
import { LineChart } from "react-native-gifted-charts";
import { useEffect, useState } from "react";
import DataCircle from "./DataCircle";

function TimeBetweenClicks({ diffs }: { diffs: number[] }) {
    function createDataObjFromArray(arr: number[]) {
        let dataObj: { value: number, customDataPoint?: Function }[] = []
        arr.forEach((value: number, index: number) => {
            dataObj.push({ value: value })
        })

        return dataObj
    }

    const [data, setData] = useState<{ value: number }[]>([])

    useEffect(() => {
        let newData = createDataObjFromArray(diffs)
        console.log("New Data: ", newData)
        setData(newData)
    }, [diffs])

    return (<>
        <View>
            {data.length > 0 ? <LineChart
                data={data}
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
                yAxisOffset={Math.round(Math.min(...diffs)) - 5}
                customDataPoint={DataCircle}
                spacing={300 / diffs.length}
                height={150}
            /> : <Text style={globalStyle.text}>Loading...</Text>}
        </View>

    </>);
}

export default TimeBetweenClicks;