import { consola } from 'consola'

export async function genTypedConfigs(exportTypeNames: string[]): Promise<string> {
  // construct specific TypedConfigs
  let typingList = '// Alpha You\'s ESLint Typed Configs - autogen\n'
  typingList += 'import type { TypedConfigItem } from \'@/types/configs\'\n\n'

  for (const typeName of exportTypeNames) {
    typingList += `import type { ${typeName}Rules } from '@/types/rules'\n`
    typingList += `export type ${'Typed' + typeName} = TypedConfigItem<${typeName}Rules>\n\n`
  }

  return typingList
}
