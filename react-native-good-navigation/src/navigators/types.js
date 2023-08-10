"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScreenType = void 0;
const react_native_1 = require("react-native");
const getScreenType = () => {
    const { width } = react_native_1.Dimensions.get("window");
    return width > 750 ? "wide" : "narrow";
};
exports.getScreenType = getScreenType;
