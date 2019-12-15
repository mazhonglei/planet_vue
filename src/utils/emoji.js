import data from '../data/emoji-data.js'

let emojiData = {}
Object.values(data).forEach(item => {
    emojiData = {...emojiData, ...item}
})

/**
 *
 *
 * @export
 * @param {string} value
 * @returns {string}
 */

export function emoji(value) {
    if (!value) return
    Object.keys(emojiData).forEach(item => {
        value = value.replace(new RegExp(item, 'g'), createIcon(item))
    })
    return value
}

function createIcon(item) {
    let srcPath = require('../static/emoji/' + emojiData[item]);
    return `<img src="${srcPath}" width="20px" height="20px">`
}
