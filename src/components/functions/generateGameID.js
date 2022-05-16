// Function to produce random 4-digit number for game ID
const generateNumber = () => {
    return Math.floor(1000 + Math.random() * 9000)
}

const checkID = (gameIDArray) => {
    const testGameID = generateNumber()
    const index = gameIDArray.indexOf(testGameID)
    if (index === -1) {
        return testGameID
    } else {
        checkID(gameIDArray)
    }
}

const generateGameID = (gameIDArray) => {
    // Function to check game code against current game codes
    // Returns a game code not currently in the game code list
    if (gameIDArray !== undefined) {
        return checkID(gameIDArray)
    } else {
        // If no array of active game codes exists, any number will do
        return generateNumber()
    }


}

// export { generateGameID as default }
