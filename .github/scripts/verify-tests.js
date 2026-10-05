import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import hashes from '../../.hookslings/test-hashes.json' assert { type: 'json' }

let ok = true
for (const [file, expected] of Object.entries(hashes)) {
  const actual = createHash('sha256').update(readFileSync(file, 'utf8')).digest('hex')
  if (actual !== expected) {
    console.error(`Test file changed: ${file}`)
    ok = false
  }
}

if (!ok) {
  console.error('Do not modify test files. Fix the component instead.')
  process.exit(1)
}

console.log('All test files are unchanged.')
