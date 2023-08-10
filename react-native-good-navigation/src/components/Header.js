"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const types_1 = require("../navigators/types");
const NavigationSession_1 = require("../state/NavigationSession");
const PressableIcon_1 = require("./PressableIcon");
const Header = ({ title, isNotFirstScreen, navigation, titleStyle, style, backIcon, backIconColor, backIconSize }) => {
    return (react_1.default.createElement(react_native_1.View, { style: [
            {
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: isNotFirstScreen ? 5 : 20,
                backgroundColor: (style === null || style === void 0 ? void 0 : style.backgroundColor) || "#FFFFFF",
                paddingTop: (0, types_1.getScreenType)() == "wide" ? (react_native_1.Platform.OS == "web" ? 10 : 20) : 0
            },
            style
        ] },
        isNotFirstScreen ? react_1.default.createElement(PressableIcon_1.PressableIcon, { onPress: () => NavigationSession_1.NavigationSession.inst.navigateBack(navigation), icon: backIcon || "chevron-left", size: backIconSize || 60, color: backIconColor || "black" }) : null,
        react_1.default.createElement(react_native_1.Text, { style: [
                {
                    fontWeight: (titleStyle === null || titleStyle === void 0 ? void 0 : titleStyle.fontWeight) || "bold",
                    fontSize: (titleStyle === null || titleStyle === void 0 ? void 0 : titleStyle.fontSize) || 55,
                },
                titleStyle
            ] }, title)));
};
exports.Header = Header;
