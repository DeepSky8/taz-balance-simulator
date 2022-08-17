import { cardPicker, shuffle } from "./deckRandomizers"

const cardMatcher = (protoArray, returnArray = []) => {
    const matchedPairs = returnArray;
    const result = {
        finalProtoArray: [],
        finalMatchedPairs: []
    }
    const protoCardToMatch = protoArray.find(({ pairedWith }) =>
        pairedWith !== ''
    )

    if (protoCardToMatch !== undefined) {

        const matchedProtoCard = protoArray.find(({ pairedWith }) =>
            pairedWith === protoCardToMatch.cardKey
        )

        matchedPairs.push({ protoCardToMatch, matchedProtoCard })

        const updatedProtoArray = protoArray.filter(({ cardKey }) => {
            return (cardKey !== protoCardToMatch.cardKey && cardKey !== matchedProtoCard.cardKey)
        })

        const nextStage = cardMatcher(updatedProtoArray, matchedPairs)
        nextStage.finalProtoArray.forEach((element) => {
            result.finalProtoArray.push(element)
        })
        nextStage.finalMatchedPairs.forEach((pairedElement) => {
            result.finalMatchedPairs.push(pairedElement)
        })
    } else {
        protoArray.forEach((protoCard) => {
            result.finalProtoArray.push(protoCard)
        })
        matchedPairs.forEach((pair) => {
            result.finalMatchedPairs.push(pair)
        })
    }

    return result
}

const cardCombiner = (protoCardA, protoCardB) => {

    const sortedFaceUp = [protoCardA, protoCardB].sort((a, b) => {
        if (a.faceUp && b.faceUp) {
            return cardPicker()
        } else if (a.faceUp) {
            return -1
        } else if (b.faceUp) {
            return 1
        }
    })

    return {
        front: sortedFaceUp[0],
        back: sortedFaceUp[1]
    }
}

const cardCreator = (protoCard) => {
    const card = {
        challengeKey: '',
        completed: false,
        visible: 'front',
        front: protoCard.front,
        back: protoCard.back
    }
    return card
}

const extractFinalCard = (challengeArray) => {
    let front;
    let back;
    const restOfProtoCards = []
    challengeArray.forEach((protoCard) => {
        if (protoCard.boss) {
            front = protoCard
        } else if (protoCard.finale) {
            back = protoCard
        } else {
            restOfProtoCards.push(protoCard)
        }
    })

    const finalCard = {
        front,
        back
    }

    return { finalCard, restOfProtoCards }
}


const challengeDeck = (challengeCode, protoCardArray) => {
    const newDeck = [];
    const protoDeck = [];
    const numericalDecks = ['v0', 'v2', 'v3', 'v4', 'l0', 'l1', 'l2', 'l3']
    const randomDecks = ['v1', 'r0', 'r1', 'r2', 'r3']

    // Method finds the challenges marked Boss and Finale, pairs them in an object
    // and returns that object as well as the remaining challenges in an array
    const extract = extractFinalCard(protoCardArray)
    const workingArray = extract.restOfProtoCards;
    const finalCard = extract.finalCard

    // Two basic deck creation processes
    if (numericalDecks.includes(challengeCode)) {
        // If the decks proceed along sequential challenges 
        // (the only random element being which face of the challenge you encounter)
        // use this process
        const tempPairedProtoCards = [];

        // cardMatcher find the cards that are paired (via cardKey and pairedWith fields)
        // and places the paired protoCards in an array
        const results = cardMatcher(workingArray)

        results.finalMatchedPairs.forEach((pairedObject) => {
            tempPairedProtoCards.push(cardCombiner(pairedObject.protoCardToMatch, pairedObject.matchedProtoCard))
        })

        // After pairing up all the regular cards, put the final card on the end of the array
        tempPairedProtoCards.push(finalCard)
        console.log(tempPairedProtoCards)

        const tempSortedProtoCards = tempPairedProtoCards.sort((a, b) => (a.front.cardNumber - b.front.cardNumber))

        // Put all of these proto-cards into an array available outside the method
        tempSortedProtoCards.forEach((protoCard) => {
            protoDeck.push(protoCard)
        })

    } else if (randomDecks.includes(challengeCode)) {
        // If the decks are at least partially randomized, 
        // split them based on their 'randomize' field
        const tempPairedArray = [];
        const tempRandomArray = [];

        workingArray.forEach((protoCard) => {
            if (!protoCard.randomize) {
                tempPairedArray.push(protoCard)
            } else if (protoCard.randomize) {
                tempRandomArray.push(protoCard)
            }
        })

        const tempPairedProtoCards = [];

        // cardMatcher find the cards that are paired (via cardKey and pairedWith fields)
        // and places the paired protoCards in an array
        const results = cardMatcher(tempPairedArray)
        results.finalMatchedPairs.forEach((pairedObject) => {
            tempPairedProtoCards.push(cardCombiner(pairedObject.protoCardToMatch, pairedObject.matchedProtoCard))
        })

        // Shuffle the unpaired protoCards
        const tempShuffledArray = shuffle(tempRandomArray)
        const tempRandomProtoCards = []
        // Then combine them into cards with a front and back
        while (tempShuffledArray.length > 0) {
            tempRandomProtoCards.push(cardCombiner(tempShuffledArray.splice(0, 2)))
        }

        const almostFullProtoDeck = shuffle(tempPairedProtoCards.concat(tempRandomProtoCards))
        almostFullProtoDeck.forEach((protoCard) => {
            protoDeck.push(protoCard)
        })

        protoDeck.push(finalCard)

    }

    protoDeck.forEach((protoCard) => {
        newDeck.push(cardCreator(protoCard))
    })
    return newDeck
}

export default challengeDeck

// v0-The Lich - numerical order
// v1-The Cult - randomized, face up
// v2-The Dark Lord - numerical order
// v3-The Dragon - numerical order
// v4-The Band of Rogues - numerical order

// r0-The Ring - randomized, face up
// r1-The Idol - randomized, face up
// r2-The Hoard - randomized, face up
// r3-The Staff - randomized, face up

// l0-The Cave - numerical order
// l1-The Temple - numerical order
// l2-The Tomb - numerical order
// l3-The Train - numerical order

