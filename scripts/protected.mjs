import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

// Files students must not change. Everything the tests depend on.
export function protectedFiles(root = '.') {
  const out = ['vite.config.ts']
  const walk = dir => {
    for (const name of readdirSync(join(root, dir))) {
      const rel = join(dir, name)
      if (statSync(join(root, rel)).isDirectory()) walk(rel)
      else if (dir.startsWith('tests') || /\.test\.tsx?$/.test(name)) out.push(rel)
    }
  }
  walk('exercises')
  walk('tests')
  return out.sort()
}
