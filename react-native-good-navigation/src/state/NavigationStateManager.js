"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationStateManager = void 0;
var NavigationPublisher_1 = require("./impl/NavigationPublisher");
var NavigationStateManager = /** @class */ (function () {
    function NavigationStateManager() {
    }
    NavigationStateManager.screenStackUpdated = new NavigationPublisher_1.default();
    NavigationStateManager.activeTabUpdated = new NavigationPublisher_1.default();
    return NavigationStateManager;
}());
exports.NavigationStateManager = NavigationStateManager;
