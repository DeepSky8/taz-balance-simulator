
const incrementStage = (stage) => {
    switch (stage) {
        case 'INTRO':
            return 'BRIEF';
        case 'BRIEF':
            return 'BACKSTORY';
        case 'BACKSTORY':
            return 'CHALLENGES';
        case 'CHALLENGES':
            return 'END';
        case 'END':
            return 'gameSetup';
        default:
            return 'INTRO';
    }
}

export default incrementStage