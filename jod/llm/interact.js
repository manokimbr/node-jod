import { modPhrases } from './mod/mod.js'
import { modAscii } from './mod/ascii.js'

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const phrase = pickRandom(modPhrases)
const art = pickRandom(modAscii)

console.log('\n🔊 Interact Mode Activated:')
console.log('\n' + phrase)
console.log('\n' + art + '\n')
