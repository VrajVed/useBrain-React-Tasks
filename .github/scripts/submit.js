const exercises = (process.env.EXERCISES || '').split(',').filter(Boolean)
const url = process.env.TRACKER_URL
const token = process.env.TRACKER_TOKEN
const actor = process.env.GITHUB_ACTOR
const commit = process.env.COMMIT_SHA

if (!url || !token) {
  console.log('Tracker not configured. Skipping submission.')
  process.exit(0)
}

async function submit(exercise) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hookslings-Token': token,
    },
    body: JSON.stringify({
      name: actor,
      exercise,
      timestamp: new Date().toISOString(),
      commit,
      status: 'passed',
    }),
  })
  if (!res.ok) throw new Error(`Failed to submit ${exercise}: ${res.status}`)
  console.log('Submitted:', exercise)
}

Promise.all(exercises.map(submit)).catch(err => {
  console.error(err)
  process.exit(1)
})
