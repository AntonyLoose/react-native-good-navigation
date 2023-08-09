import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Text, View } from "react-native"
import { colours } from "../styles";

interface Props {
    navigation: NavigationProp<ParamListBase>;
}

export const Settings: React.FC<Props> = ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colours.background
            }}
        >
            <Text>This is the settings screen</Text>
        </View>
    )
}