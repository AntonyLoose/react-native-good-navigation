import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Text, View } from "react-native"

interface Props {
    navigation: NavigationProp<ParamListBase>;
}

export const Settings: React.FC<Props> = ({ navigation }) => {
    return (
        <View>
            <Text>This is the settings screen</Text>
        </View>
    )
}