import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Button, Text, TouchableOpacity, View } from "react-native"
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

            <View style={{ paddingBottom: 20 }}/>

            <TouchableOpacity
                style={{
                    height: "10%",
                    borderRadius: 20,
                    backgroundColor: theme.primary,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onPress={() => NavigationSession.inst.navigateTo(Account, navigation, "Account")}
            >
                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 20
                    }}
                >Navigate</Text>
            </TouchableOpacity>
        </View>
    )
}