import type { Payload } from './lib'
import { writeFile } from 'fs/promises'
import { typegen } from './lib'
import { style } from '@/configs/style'

const ConfigsMaps: Payload = [
  {
    typeName: 'StyleRules',
    configConstructor: style,
  }
]

const startedTime = performance.now()

console.log('\x1b[32m%s\x1b[0m', 'Generating rules types...')

const dts = await typegen(ConfigsMaps)

await writeFile('./src/types/rules.d.ts', dts)

const finishedTime = performance.now() 

console.log('\x1b[32m%s\x1b[0m', `Types generated in ${(finishedTime - startedTime).toFixed(2)}ms \n`)
