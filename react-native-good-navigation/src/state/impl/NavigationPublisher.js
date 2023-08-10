"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = require("@reduxjs/toolkit");
/**
 * A redux wrapper for managing application-wide state using the publisher-subscriber pattern.
 * To only be initialised within StateManager.
 */
var NavigationPublisher = /** @class */ (function () {
    function NavigationPublisher() {
        this.slice = (0, toolkit_1.createSlice)({
            name: "NavigationPublisher",
            initialState: {
                value: 0,
            },
            reducers: {
                newForm: function (state) {
                    state.value = (state.value + 1) % 10;
                },
            },
        });
        this.publisher = (0, toolkit_1.configureStore)({
            reducer: this.slice.reducer,
        });
    }
    NavigationPublisher.prototype.subscribe = function (callback) {
        this.publisher.subscribe(callback);
    };
    NavigationPublisher.prototype.publish = function () {
        this.publisher.dispatch(this.slice.actions.newForm());
    };
    return NavigationPublisher;
}());
exports.default = NavigationPublisher;
