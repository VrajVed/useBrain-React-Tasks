// Usage: node scripts/report.mjs <dirWithResults>
// Sends one snapshot of every student to the Google Apps Script web app.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = process.argv[2] ?? 'results'
const url = process.env.TRACKER_URL
const token = process.env.TRACKER_TOKEN

const exercises = readdirSync('exercises').filter(d => /^\d{2}-/.test(d)).sort()
const students = existsSync(dir)
  ? readdirSync(dir).filter(f => f.endsWith('.json')).map(f => JSON.parse(readFileSync(join(dir, f), 'utf8')))
  : []

console.log(`${students.length} students graded`)
if (!url || !token) {
  console.log('TRACKER_URL or TRACKER_TOKEN missing, not sending.')
  process.exit(0)
}

const res = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain' },
  body: JSON.stringify({ token, generatedAt: new Date().toISOString(), exercises, students }),
  redirect: 'follow',
})
const text = await res.text()
let body
try {
  body = JSON.parse(text)
} catch {
  console.error(`Tracker did not answer with JSON (HTTP ${res.status}):\n${text.slice(0, 300)}`)
  process.exit(1)
}
if (!body.ok) {
  console.error('Tracker refused the update:', body.error)
  process.exit(1)
}
console.log('Sheet updated:', body)
