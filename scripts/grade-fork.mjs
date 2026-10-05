// Usage: node scripts/grade-fork.mjs <owner/repo> <outDir> [--from <localDir>]
// Copies ONLY the student's implementation files and NOTES.md into this checkout,
// leaving the original tests in place, runs the tests, and writes one JSON result.
import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const args = process.argv.slice(2)
const fork = args[0]
const outDir = args[1] ?? 'grade-out'
const fromIdx = args.indexOf('--from')
const localFrom = fromIdx >= 0 ? args[fromIdx + 1] : null

if (!/^[\w.-]+\/[\w.-]+$/.test(fork ?? '')) {
  console.error('usage: grade-fork.mjs <owner/repo> <outDir> [--from <dir>]')
  process.exit(2)
}

const work = mkdtempSync(join(tmpdir(), 'usebrain-'))
const [owner, repo] = fork.split('/')
const exercises = readdirSync('exercises').filter(d => /^\d{2}-/.test(d)).sort()

function writeResult(result, extra = {}) {
  mkdirSync(outDir, { recursive: true })
  writeFileSync(
    join(outDir, `${owner}__${repo}.json`),
    JSON.stringify({ github: owner, repo: fork, sha, checkedAt: new Date().toISOString(), exercises: result, ...extra }, null, 2),
  )
}

let src = localFrom
let sha = localFrom ? 'local' : ''
if (!src) {
  src = join(work, 'fork')
  try {
    execFileSync('git', ['clone', '--depth', '1', '--quiet', `https://github.com/${fork}.git`, src], {
      stdio: 'inherit',
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
    })
    sha = execFileSync('git', ['-C', src, 'rev-parse', 'HEAD']).toString().trim()
  } catch {
    // Fork deleted or made private: keep the student on the sheet with nothing passed.
    console.error(`${fork}: could not clone`)
    writeResult(Object.fromEntries(exercises.map(ex => [ex, { passed: false, notes: false }])), { error: 'clone failed' })
    process.exit(0)
  }
}
if (resolve(src) === resolve('.')) {
  console.error('--from must point at a different folder than this checkout')
  process.exit(2)
}

const isTest = name => /\.(test|spec)\.[cm]?[jt]sx?$/.test(name)
const allowed = name => /\.(tsx?|md|json|css)$/.test(name) && !isTest(name)

// How much the student wrote in NOTES.md, ignoring the lines that were already there.
function notesWritten(original, mine) {
  const given = new Set(original.split('\n').map(l => l.trim()))
  return mine
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !given.has(l))
    .join(' ')
    .replace(/\s+/g, '').length
}

const notes = {}
for (const ex of exercises) {
  const theirs = join(src, 'exercises', ex)
  const original = existsSync(join('exercises', ex, 'NOTES.md')) ? readFileSync(join('exercises', ex, 'NOTES.md'), 'utf8') : ''
  notes[ex] = false
  if (!existsSync(theirs)) continue
  for (const name of readdirSync(theirs)) {
    const from = join(theirs, name)
    const st = lstatSync(from)
    if (!st.isFile() || !allowed(name) || st.size > 200_000) continue
    if (name === 'NOTES.md') notes[ex] = notesWritten(original, readFileSync(from, 'utf8')) >= 60
    cpSync(from, join('exercises', ex, name))
  }
}

const report = join(work, 'vitest.json')
try {
  execFileSync('npx', ['vitest', 'run', 'exercises', '--reporter=json', `--outputFile=${report}`, '--testTimeout=10000'], {
    stdio: 'inherit',
    timeout: 5 * 60 * 1000,
  })
} catch {
  // failing tests exit non zero, that is expected
}

const suites = existsSync(report) ? JSON.parse(readFileSync(report, 'utf8')).testResults ?? [] : []
const result = {}
for (const ex of exercises) {
  const mine = suites.filter(s => s.name.includes(`/exercises/${ex}/`))
  result[ex] = { passed: mine.length > 0 && mine.every(s => s.status === 'passed'), notes: notes[ex] }
}

writeResult(result)
const done = Object.values(result).filter(r => r.passed).length
console.log(`${fork}: ${done}/${exercises.length} passed`)
