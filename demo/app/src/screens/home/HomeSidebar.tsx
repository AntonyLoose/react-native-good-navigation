import { NavigationProp, ParamListBase } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"
import { ScreenProps } from "../../navigators/types"
import { NavigationSession } from "../../state/NavigationSession"
import { theme } from "../../styles"
import { Home } from "./Home"

export const HomeSidebar: React.FC<ScreenProps> = ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.background,
                padding: 20,
            }}
        >
            <Button navigation={navigation} onPress={() => NavigationSession.inst.navigateTo(Home, navigation, "Home 1")} label={"Home 1"}></Button>
            <View style={{ height: 20 }}/>
            <Button navigation={navigation} onPress={() => NavigationSession.inst.navigateTo(Home, navigation, "Home 2")} label={"Home 2"}></Button>
            <View style={{ height: 20 }}/>
            <Button navigation={navigation} onPress={() => NavigationSession.inst.navigateTo(Home, navigation, "Home 3")} label={"Home 3"}></Button>
            <View style={{ height: 20 }}/>
            <Button navigation={navigation} onPress={() => NavigationSession.inst.navigateTo(Home, navigation, "Home 4")} label={"Home 4"}></Button>
            <View style={{ height: 20 }}/>
        </View>
    )
}

interface ButtonProps {
    navigation: NavigationProp<ParamListBase>;
    onPress: () => void;
    label: string;
}

const Button: React.FC<ButtonProps> = ({ navigation, onPress, label }) => {
    return (
        <TouchableOpacity
            style={{
                height: "10%",
                borderRadius: 20,
                backgroundColor: theme.primary,
                justifyContent: "center",
                alignItems: "center"
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 20
                }}
            >{label}</Text>
        </TouchableOpacity>
    )
}