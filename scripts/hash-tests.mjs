// For the Web Dev Head: run this after changing any test, then commit the result.
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { protectedFiles } from './protected.mjs'

const hashes = {}
for (const file of protectedFiles()) {
  hashes[file] = createHash('sha256').update(readFileSync(file)).digest('hex')
}
mkdirSync('.hookslings', { recursive: true })
writeFileSync('.hookslings/test-hashes.json', JSON.stringify(hashes, null, 2) + '\n')
console.log(`hashed ${Object.keys(hashes).length} protected files`)
