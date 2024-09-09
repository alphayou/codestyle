import { writeFile } from 'fs/promises'
import { consola } from 'consola'
import { genRulesTyping } from './gen-rules-typing'
import { genTypedConfigs } from './gen-typed-configs'
import { configurations } from '@/configs'

const startTime = performance.now()

consola.info('ESLint typings generation started...')

// generate Rules Typing
consola.start('Generating Rules Typing...')
const payload = await genRulesTyping(configurations)
const rt = payload.data
consola.success('Generated Rules Typing')

// generate TypedConfigs
consola.start('Generating Typed Configs...')
const tc = await genTypedConfigs(payload.exportTypeNames)
consola.success('Generated Typed Configs')

// write to file
consola.start('Writing to file...')
await writeFile('src/types/rules.d.ts', rt)
await writeFile('src/types/specific.d.ts', tc)
consola.success('Written to file')

const endTime = performance.now()
const diff = (endTime - startTime).toFixed(2)
consola.success(`ESLint typings generation completed in ${diff}ms`)
