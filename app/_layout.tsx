
import { Slot } from "expo-router";
import { View } from "react-native";

function RootLayout() {
    return (<>
        <View style={{
            flex: 1,
            backgroundColor: "#000"
        }}>
            <Slot />
        </View>

    </>);
}

export default RootLayout;