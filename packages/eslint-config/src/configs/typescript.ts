import process from 'node:process'
import type { Linter } from 'eslint'
import type { Ext, Options, TSConfigItem } from '@/types'
import { isPackageExists } from 'local-pkg'
import { interopDefault, renameRules, toArray } from '@/utils'
import { GLOB_MARKDOWN, GLOB_TS, GLOB_TSX } from '@/globs'

export async function typescript(
  options: Options['typescript'] & Ext = {},
): Promise<TSConfigItem[]> {
  // parse options
  const tsOptions = options === false
    ? false
    : isPackageExists('typescript')
      ? typeof options === 'object'
        ? options
        : {}
      : false

  // set options to false to disable config
  if (tsOptions === false) {
    return []
  }

  const {
    overrides = {},
    exts = [],
    parserOptions = {},
  } = tsOptions

  const files = [
    GLOB_TS,
    GLOB_TSX,
    ...exts.map(ext => `**/*.${ext}`),
  ]

  const tsconfigPath = tsOptions?.tsconfig
    ? toArray(tsOptions.tsconfig)
    : undefined

  const isTa = !!tsconfigPath

  const taIncludes = tsOptions.ta?.include ?? [GLOB_TS, GLOB_TSX]
  const taExcludes = tsOptions.ta?.exclude ?? [
    `${GLOB_MARKDOWN}/**`,
  ]

  const [
    pluginTs,
    parserTs,
  ] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const)

  function getParser(ta: boolean, includes: string[], excludes?: string[]): TSConfigItem {
    return {
      name: `alphayou/typescript/${ta ? 'type-aware-parser' : 'parser'}`,
      files: includes,
      ignores: excludes ?? [],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          sourceType: 'module',
          extraFileExtensions: exts.map(ext => `.${ext}`),
          ...ta
            ? {
                project: tsconfigPath,
                tsconfigRootDir: process.cwd(),
              }
            : {},
          ...parserOptions as Linter.ParserOptions,
        },
      },
    }
  }

  return [
    {
      name: 'alphayou/typescript/setup',
      plugins: {
        ts: pluginTs,
      },
    },
    ...isTa
      ? [
          getParser(true, taIncludes, taExcludes),
          getParser(false, files, taIncludes),
        ]
      : [
          getParser(false, files),
        ],
    {
      name: 'alphayou/typescript/rules',
      files,
      rules: {
        ...(pluginTs.configs['eslint-recommended'].overrides
        && pluginTs.configs['eslint-recommended'].overrides[0].rules
          ? renameRules(
            pluginTs.configs['eslint-recommended'].overrides[0].rules,
            { '@typescript-eslint': 'ts' },
          )
          : {}),
        ...(pluginTs.configs.strict
        && pluginTs.configs.strict.rules
          ? renameRules(
            pluginTs.configs.strict.rules,
            { '@typescript-eslint': 'ts' },
          )
          : {}),

        'no-dupe-class-members': 'off',
        'no-loss-of-precision': 'off',
        'no-redeclare': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',

        'ts/no-unused-vars': 'off',

        ...overrides,
      },
    },
    {
      files: ['**/*.d.?([cm])ts'],
      name: 'alphayou/typescript/disables/dts',
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'import/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
  ]
}
