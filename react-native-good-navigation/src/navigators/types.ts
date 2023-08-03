import React from "react"

/**
 * This is for the starting configuration of the navigation.
 * Each tab object will be render as a seperate tab in the tab bar and drawer.
 */
export type tab = {
    landingScreen: React.FC,    
    label?: string,
    icon?: {
        focused: string,
        unfocused: string,
        size?: number,
        colour?: string
    },
    sidebar?: {
        title: string,
        component: React.FC
    }
}