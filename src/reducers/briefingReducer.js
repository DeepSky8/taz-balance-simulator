const defaultBriefingState = {
    villainOne: null,
    villainTwo: null,
    relicOne: null,
    relicTwo: null,
    locationOne: null,
    locationTwo: null,
}

const briefingReducer = (state, action) => {
    switch (action.type) {
        default:
            return {
                ...state
            }
    }
}

export { defaultBriefingState, briefingReducer }