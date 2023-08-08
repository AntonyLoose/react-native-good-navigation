import { Text, View } from "react-native"
import { colours } from "../../styles"

export const HomeSidebar: React.FC= () => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colours.background,
                padding: 20,
            }}
        >
            <Text
                style={{
                    color: colours.text
                }}
            >This is the home sidebar</Text>
        </View>
    )
}