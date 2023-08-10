"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
/**
 * A redux wrapper for managing application-wide state using the publisher-subscriber pattern.
 * To only be initialised within StateManager.
 */
class NavigationPublisher {
    constructor() {
        this.slice = (0, toolkit_1.createSlice)({
            name: "NavigationPublisher",
            initialState: {
                value: 0,
            },
            reducers: {
                newForm: (state) => {
                    state.value = (state.value + 1) % 10;
                },
            },
        });
        this.publisher = (0, toolkit_1.configureStore)({
            reducer: this.slice.reducer,
        });
    }
    subscribe(callback) {
        this.publisher.subscribe(callback);
    }
    publish() {
        this.publisher.dispatch(this.slice.actions.newForm());
    }
}
exports.default = NavigationPublisher;
