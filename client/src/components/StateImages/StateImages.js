const stateImages = {
    // alabama: require('./assets/states/alabama.png)
}

export const statesData = Object.keys(stateImages).map((key) => ({
    state: key.charAt(0).toUpperCase() + key.slice(1),
    image: stateImages[key]
}));