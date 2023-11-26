import { Slot, Stack } from "expo-router";
import { View } from "react-native";

export const unstable_settings = {
    initialRouteName: "index"
}

function RootLayout() {
    return (<>
        <Stack screenOptions={{
            headerStyle: { backgroundColor: "#050505" },
            headerTintColor: "yellow",
            headerBackTitleVisible: true,
            headerTitleStyle: { fontWeight: "bold" },
        }} />
    </>);
}

export default RootLayout;