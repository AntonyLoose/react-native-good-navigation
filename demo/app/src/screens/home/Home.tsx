import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Button, Text, View } from "react-native"
import { NavigationSession } from "../../state/NavigationSession";
import { theme } from "../../styles";
import { Account } from "../Account";

interface Props {
    navigation: NavigationProp<ParamListBase>;
}

export const Home: React.FC<Props> = ({ navigation }) => {
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
            >This is the home screen</Text>
            <Button title={"Navigate"} onPress={() => NavigationSession.inst.navigateTo(Account, navigation, "Penis")}/>
        </View>
    )
}