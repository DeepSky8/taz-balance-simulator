
const diceRoll = (type = 'strength') => {
    /// <summary>
    /// Enter text to enable d6 behavior
    /// Otherwise function will generate d20 with 15% weights on all elements 1-18, 5% weight on crit success and crit failure
    /// positively modified 2%
    /// </summary

    if (type === 'strength') {
        const table = Object.entries({ 1: 15, 2: 15, 3: 15, 4: 15, 5: 15, 6: 15, '-100': 5, '100': 5 })
        const randomNumber = Math.floor(Math.random() * 102)
        let r = randomNumber
        for (let index = 0; index < table.length; index++) {
            const element = table[index];
            r = r - element[1]
            if (r <= 0) {
                return parseInt(element[0]);
            }
        }
    } else if (type === 'chance') {
        return Math.floor((Math.random() * 5) + 1)
    }

}

export default diceRoll


// let table = Object.entries({ 1: 15, 2: 15, 3: 15, 4: 15, 5: 15, 6: 15, 0: 5, 100: 5 })
// .flatMap(([item, weight]) => Array(weight).fill(item));
// const result = Math.floor(Math.random() * table.length)
// const output = table[result]