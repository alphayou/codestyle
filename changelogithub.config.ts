import { defineConfig } from 'changelogithub'

export default defineConfig({
  titles: {
    breakingChanges: 'Breaking Changes',
  },
  types: {
    feat: { title: 'Features' },
    fix: { title: 'Bug Fixes' },
    perf: { title: 'Performance' },
  },
})
