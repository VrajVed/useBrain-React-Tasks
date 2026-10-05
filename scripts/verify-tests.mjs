import { createHash } from 'node:crypto'
import { readFileSync, existsSync } from 'node:fs'
import { protectedFiles } from './protected.mjs'

const expected = JSON.parse(readFileSync('.usebrain/test-hashes.json', 'utf8'))
const problems = []

for (const [file, hash] of Object.entries(expected)) {
  if (!existsSync(file)) problems.push(`missing: ${file}`)
  else if (createHash('sha256').update(readFileSync(file)).digest('hex') !== hash) problems.push(`changed: ${file}`)
}
for (const file of protectedFiles()) {
  if (!(file in expected)) problems.push(`new test file: ${file}`)
}

if (problems.length) {
  console.error(problems.join('\n'))
  console.error('\nTests are read only. Fix the component, not the test.')
  console.error('Undo with: git checkout upstream/main -- <file>  (or copy it back from the original repo)')
  process.exit(1)
}
console.log('All test files are untouched.')
