"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PressableIcon = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const MaterialCommunityIcons_1 = __importDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
const PressableIcon = ({ icon, size, color, onPress }) => {
    return (react_1.default.createElement(react_native_1.Pressable, { onPress: onPress },
        react_1.default.createElement(MaterialCommunityIcons_1.default, { name: icon, size: size, color: color })));
};
exports.PressableIcon = PressableIcon;
