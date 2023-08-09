import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Text, View } from "react-native"
import { theme } from "../styles";

interface Props {
    navigation: NavigationProp<ParamListBase>;
}

export const Settings: React.FC<Props> = ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.background,
                padding: 20
            }}
        >
            <Text
                style={{
                    color: theme.text
                }}
            >This is the settings screen</Text>
        </View>
    )
}