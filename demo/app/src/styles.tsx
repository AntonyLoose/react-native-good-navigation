type theme_name = "DARK_GREEN" | "LIGHT_GREEN" | "PASTEL_RED" | "AMERICA" | "MAROON" | "OCEAN";

export const DARK_GREEN = {
    primary: "#317734",
    secondary: "#A2F490",
    background: "#272c27",
    tabFocused: "#636363",
    text: "white",
    border: "#636363"
}

export const LIGHT_GREEN = {
    primary: "#317734",
    secondary: "#bae3bc",
    background: "#f8fcf8",
    tabFocused: "#bae3bc",
    text: "#060e06",
    border: "#e8e8e8"
}

export const AMERICA = {
    primary: "red",
    secondary: "blue",
    background: "white",
    tabFocused: "white",
    text: "black",
    border: "#e8e8e8"
}

export const PASTEL_RED = {
    primary: "#c95e6d",
    secondary: "#e7e0b6",
    background: "#ecf9f7",
    tabFocused: "#d3dfdd",
    text: "#040b0a",
    border: "#e8e8e8"
}

export const MAROON = {
    primary: "#590d37",
    secondary: "#f4b8bb",
    background: "#fbe9fc",
    tabFocused: "#f4b8bb",
    text: "#1e051f",
    border: "#f4b8bb"
}

export const OCEAN = {
    primary: "#0489dc",
    secondary: "#9ba6fd",
    background: "#cdfef8",
    tabFocused: "#afb6e0",
    text: "#000000",
    border: "#e8e8e8"
}

function getTheme(name: theme_name): {
    primary: string,
    secondary: string,
    background: string,
    tabFocused: string,
    text: string,
    border: string
}{
    switch(name){
        case "DARK_GREEN":
            return DARK_GREEN;
        case "PASTEL_RED":
            return PASTEL_RED;
        case "AMERICA":
            return AMERICA;
        case "MAROON":
            return MAROON;
        case "LIGHT_GREEN":
            return LIGHT_GREEN;
        case "OCEAN":
            return OCEAN;
        default:
            return DARK_GREEN;
    };
}

export const theme = getTheme("DARK_GREEN");