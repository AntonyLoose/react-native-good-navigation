"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationStateManager = void 0;
const NavigationPublisher_1 = __importDefault(require("./impl/NavigationPublisher"));
class NavigationStateManager {
}
exports.NavigationStateManager = NavigationStateManager;
NavigationStateManager.screenStackUpdated = new NavigationPublisher_1.default();
NavigationStateManager.activeTabUpdated = new NavigationPublisher_1.default();
