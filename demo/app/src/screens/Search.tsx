import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Text, View } from "react-native"

interface Props {
    navigation: NavigationProp<ParamListBase>;
}

export const Search: React.FC<Props> = ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                padding: 20
            }}
        >
            <Text>This is the search screen</Text>
        </View>
    )
}