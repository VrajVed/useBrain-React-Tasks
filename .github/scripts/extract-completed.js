import { readFileSync, appendFileSync } from 'fs'

const resultsPath = '.hookslings/results.json'
const outputPath = process.env.GITHUB_OUTPUT

const passed = new Set()

if (readFileSync) {
  try {
    const results = JSON.parse(readFileSync(resultsPath, 'utf8'))
    for (const suite of results.testResults || []) {
      const allPassed = suite.status === 'passed'
      const file = suite.name
      const match = file.match(/exercises\/([^/]+)\//)
      if (match && allPassed) passed.add(match[1])
    }
  } catch (err) {
    console.error('Could not read test results:', err.message)
  }
}

const list = Array.from(passed).join(',')
if (outputPath) {
  appendFileSync(outputPath, `exercises=${list}\n`)
}
console.log('Completed:', list)
