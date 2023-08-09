import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Text, View } from "react-native"
import { colours } from "../styles";

interface Props {
    navigation: NavigationProp<ParamListBase>;
}

export const Search: React.FC<Props> = ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colours.background,
                padding: 20
            }}
        >
            <Text>This is the search screen</Text>
        </View>
    )
}