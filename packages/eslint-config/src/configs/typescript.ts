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

        'ts/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
        'ts/consistent-type-definitions': ['error', 'interface'],
        'ts/consistent-type-imports': ['error', { disallowTypeAnnotations: false, prefer: 'type-imports' }],
        'ts/method-signature-style': ['error', 'property'],
        'ts/no-dupe-class-members': 'error',
        'ts/no-dynamic-delete': 'off',
        'ts/no-empty-object-type': 'error',
        'ts/no-explicit-any': 'off',
        'ts/no-extraneous-class': 'off',
        'ts/no-import-type-side-effects': 'error',
        'ts/no-invalid-void-type': 'off',
        'ts/no-loss-of-precision': 'error',
        'ts/no-non-null-assertion': 'off',
        'ts/no-redeclare': 'error',
        'ts/no-require-imports': 'error',
        'ts/no-unused-vars': 'off',
        'ts/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        'ts/no-useless-constructor': 'off',
        'ts/no-wrapper-object-types': 'error',
        'ts/prefer-ts-expect-error': 'error',
        'ts/triple-slash-reference': 'off',
        'ts/unified-signatures': 'off',

        ...overrides,
      },
    },
    isTa
      ? {
          name: 'alphayou/typescript/rules-type-aware',
          files: taIncludes,
          ignores: taExcludes,
          rules: {
            'dot-notation': 'off',
            'no-implied-eval': 'off',

            'ts/await-thenable': 'error',
            'ts/dot-notation': ['error', { allowKeywords: true }],
            'ts/no-floating-promises': 'error',
            'ts/no-for-in-array': 'error',
            'ts/no-implied-eval': 'error',
            'ts/no-misused-promises': 'error',
            'ts/no-unnecessary-type-assertion': 'error',
            'ts/no-unsafe-argument': 'error',
            'ts/no-unsafe-assignment': 'error',
            'ts/no-unsafe-call': 'error',
            'ts/no-unsafe-member-access': 'error',
            'ts/no-unsafe-return': 'error',
            'ts/promise-function-async': 'error',
            'ts/restrict-plus-operands': 'error',
            'ts/restrict-template-expressions': 'error',
            'ts/return-await': ['error', 'in-try-catch'],
            'ts/strict-boolean-expressions': ['error', { allowNullableBoolean: true, allowNullableObject: true }],
            'ts/switch-exhaustiveness-check': 'error',
            'ts/unbound-method': 'error',
          },
        }
      : {},
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
    {
      files: ['**/*.{test,spec}.ts?(x)'],
      name: 'alphayou/typescript/disables/test',
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['**/*.js', '**/*.cjs'],
      name: 'alphayou/typescript/disables/cjs',
      rules: {
        'ts/no-require-imports': 'off',
        'ts/no-var-requires': 'off',
      },
    },
  ]
}
