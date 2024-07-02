import { writeFile } from 'fs/promises'
import { typegen } from './lib'
import { configMap } from '@/configs'

const startedTime = performance.now()

console.log('\x1b[32m%s\x1b[0m', 'Generating rules types...')

const dts = await typegen(Object.values(configMap))

await writeFile('./src/types/rules.d.ts', dts)

const finishedTime = performance.now()

console.log('\x1b[32m%s\x1b[0m', `Types generated in ${(finishedTime - startedTime).toFixed(2)}ms \n`)
