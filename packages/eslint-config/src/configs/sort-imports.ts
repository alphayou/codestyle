import type { Options } from '@/types/options'
import type { TypedImports } from '@/types/specific'
import { interop } from '@/utils'

export async function imports(
  options: Options = {},
): Promise<TypedImports[]> {
  const { style = true } = options

  const pluginSortImports = await interop(import('eslint-plugin-import-x'))

  return [
    {
      name: 'alphayou/imports/rules',
      plugins: {
        import: pluginSortImports,
      },
      rules: {
        'import/export': 'error',
        'import/no-empty-named-blocks': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-import-module-exports': 'error',
        'import/default': 'error',
        'import/named': 'error',
        'import/namespace': 'error',
        'import/no-cycle': 'error',
        'import/first': 'error',

        ...style
          ? { 'import/newline-after-import': 'error' }
          : {},

        'import/no-duplicates': 'error',

        'import/order': 'warn',
      },
    },
  ]
}
