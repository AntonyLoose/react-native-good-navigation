import { Text, View } from "react-native"
import { theme } from "../../styles"

export const HomeSidebar: React.FC= () => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.background,
                padding: 20,
            }}
        >
            <Text
                style={{
                    color: theme.text
                }}
            >This is the home sidebar</Text>
        </View>
    )
}